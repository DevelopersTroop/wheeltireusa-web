'use client';

import { apiInstance } from '@/redux/apis/base';
import store from '@/redux/store';
import { openDB, IDBPDatabase } from 'idb';
import { v4 as uuidv4 } from 'uuid';

// Types for your specific event schema
type EventType =
  | 'page_view'
  | 'product_view'
  | 'add_to_cart'
  | 'search'
  | 'click'
  | 'checkout_complete'
  | 'remove_from_cart'
  | 'update_cart'
  | 'checkout_start'
  | 'ymm_submit';

interface TrackingMetadata {
  productId?: string;
  productName?: string;
  query?: string; // For search
  elementId?: string; // For click
  price?: number;
  [key: string]: any;
}

interface EventPayload {
  eventType: EventType;
  email?: string | null;
  phone?: string | null;
  sessionId: string;
  path: string;
  metadata?: TrackingMetadata;
  timestamp: string;
}

const DB_NAME = 'UserTrackerDB';
const IDENTITY_STORE = 'identity';
const QUEUE_STORE = 'event_queue';

// Initialize IndexedDB
const initDB = async (): Promise<IDBPDatabase> => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(IDENTITY_STORE))
        db.createObjectStore(IDENTITY_STORE);
      if (!db.objectStoreNames.contains(QUEUE_STORE))
        db.createObjectStore(QUEUE_STORE, { autoIncrement: true });
    },
  });
};

/**
 * Persists email for guest tracking
 */
export const setTrackingEmail = async (email: string) => {
  console.log('TCL: setTrackingEmail -> email', email);
  const db = await initDB();
  await db.put(IDENTITY_STORE, email, 'guest_email');
  await syncOfflineEvents();
};

/**
 * Persists phone for guest tracking
 */
export const setTrackingPhone = async (phone: string) => {
  console.log('TCL: setTrackingPhone -> phone', phone);
  const db = await initDB();
  await db.put(IDENTITY_STORE, phone, 'guest_phone');
  await syncOfflineEvents();
};

/**
 * Main Tracking Logic
 */
export const trackEvent = async (
  type: EventType,
  metadata?: TrackingMetadata
) => {
  const db = await initDB();

  // 1. Resolve Identity (Auth User > IndexedDB Guest Email/Phone)
  const authUser = store.getState().persisted.user.userDetails;
  const guestEmail = await db.get(IDENTITY_STORE, 'guest_email');
  const guestPhone = await db.get(IDENTITY_STORE, 'guest_phone');
  const activeEmail = authUser?.email || guestEmail;
  const activePhone = authUser?.phone || guestPhone;

  // 2. Resolve Session (spanning tabs explicitly with 30min timeout)
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  let sessionId = localStorage.getItem('track_sid');
  const lastActive = parseInt(
    localStorage.getItem('track_last_active') || '0',
    10
  );
  const now = Date.now();

  if (!sessionId || now - lastActive > SESSION_TIMEOUT) {
    sessionId = uuidv4() as string;
    localStorage.setItem('track_sid', sessionId);
  }
  localStorage.setItem('track_last_active', now.toString());

  // 3. Automatically append YMM Data
  let enhancedMetadata = { ...metadata };
  try {
    const ymm = store.getState().persisted.yearMakeModel;
    if (ymm && ymm.year) {
      enhancedMetadata.ymmData = ymm;
    }
  } catch (e) {
    console.warn('Could not read ymm state for tracker');
  }

  const payload: EventPayload = {
    eventType: type,
    email: activeEmail || null,
    phone: activePhone || null,
    sessionId,
    path: window.location.pathname,
    metadata: enhancedMetadata,
    timestamp: new Date().toISOString(),
  };

  // 4. Requirement: If no email/phone is present, queue the event for later (we don't drop anymore)
  if (!activeEmail && !activePhone) {
    await db.add(QUEUE_STORE, payload);
    return;
  }

  // 5. Attempt to send or Queue if offline
  try {
    const response = await apiInstance.post('/tracking', payload);

    if (!response) throw new Error('Network response was not ok');
  } catch (error) {
    // If request fails (offline), save to IndexedDB queue
    await db.add(QUEUE_STORE, payload);
    console.warn('Tracking queued (offline mode)');
  }
};

/**
 * Sync queued events when back online
 */
export const syncOfflineEvents = async () => {
  console.log(
    'TCL: syncOfflineEvents -> syncOfflineEvents',
    'Sending Offline activity'
  );
  const db = await initDB();

  const authUser = store.getState().persisted.user.userDetails;
  const guestEmail = await db.get(IDENTITY_STORE, 'guest_email');
  const guestPhone = await db.get(IDENTITY_STORE, 'guest_phone');
  const activeEmail = authUser?.email || guestEmail;
  const activePhone = authUser?.phone || guestPhone;

  // Only sync if we have a network identity/user identity payload ready
  if (!activeEmail && !activePhone) return;

  const eventsInfo = [];
  {
    const tx = db.transaction(QUEUE_STORE, 'readonly');
    const store = tx.objectStore(QUEUE_STORE);
    let cursor = await store.openCursor();
    while (cursor) {
      eventsInfo.push({ key: cursor.primaryKey, value: cursor.value });
      cursor = await cursor.continue();
    }
  }

  if (eventsInfo.length === 0) return;

  const successKeys = [];
  for (const info of eventsInfo) {
    try {
      const event = info.value;
      // Hydrate identity for queued events that lacked it
      if (!event.email && activeEmail) event.email = activeEmail;
      if (!event.phone && activePhone) event.phone = activePhone;

      await apiInstance.post('/tracking', event);
      successKeys.push(info.key);
    } catch (e) {
      break;
    }
  }

  // Delete synced events accurately without destroying un-synced queue
  if (successKeys.length > 0) {
    const tx = db.transaction(QUEUE_STORE, 'readwrite');
    const store = tx.objectStore(QUEUE_STORE);
    for (const key of successKeys) {
      await store.delete(key);
    }
  }
};

export const clearSession = async () => {
  const db = await initDB();
  localStorage.removeItem('track_sid');
  localStorage.removeItem('track_last_active');
  // We keep the email in IndexedDB usually,
  // but if you want total privacy on logout:
  await db.delete(IDENTITY_STORE, 'guest_email');
  await db.delete(IDENTITY_STORE, 'guest_phone');
};
