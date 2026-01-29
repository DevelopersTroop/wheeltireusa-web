"use client";

import { apiInstance } from "@/redux/apis/base";
import { openDB, IDBPDatabase } from "idb";
import { v4 as uuidv4 } from "uuid";

// Types for your specific event schema
type EventType =
  | "page_view"
  | "product_view"
  | "add_to_cart"
  | "search"
  | "click"
  | "checkout_complete"
  | "remove_from_cart"
  | "update_cart";

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
  email: string | null;
  sessionId: string;
  path: string;
  metadata?: TrackingMetadata;
  timestamp: string;
}

const DB_NAME = "UserTrackerDB";
const IDENTITY_STORE = "identity";
const QUEUE_STORE = "event_queue";

// Initialize IndexedDB
const initDB = async (): Promise<IDBPDatabase> => {
  return openDB(DB_NAME, 1, {
    upgrade(db: IDBPDatabase) {
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
  console.log("TCL: setTrackingEmail -> email", email);
  const db = await initDB();
  await db.put(IDENTITY_STORE, email, "guest_email");
};

/**
 * Main Tracking Logic
 */
export const trackEvent = async (
  type: EventType,
  metadata?: TrackingMetadata
) => {
  const db = await initDB();

  // 1. Resolve Identity (Auth User > IndexedDB Guest Email)
  const authUser = JSON.parse(
    localStorage.getItem("ktc-audio-store.user") || "null"
  );
  const guestEmail = await db.get(IDENTITY_STORE, "guest_email");
  const activeEmail = authUser?.email || guestEmail;

  // Requirement: Do not track if no email/identity is present
  if (!activeEmail) return;

  // 2. Resolve Session
  let sessionId = sessionStorage.getItem("track_sid");
  if (!sessionId) {
    sessionId = uuidv4() as string;
    sessionStorage.setItem("track_sid", sessionId);
  }

  const payload: EventPayload = {
    eventType: type,
    email: activeEmail,
    sessionId,
    path: window.location.pathname,
    metadata,
    timestamp: new Date().toISOString(),
  };

  // 3. Attempt to send or Queue if offline
  try {
    const response = await apiInstance.post("/tracking", payload);

    if (!response.data) throw new Error("Network response was not ok");
  } catch (error) {
    // If request fails (offline), save to IndexedDB queue
    await db.add(QUEUE_STORE, payload);
    console.warn("Tracking queued (offline mode)");
  }
};

/**
 * Sync queued events when back online
 */
export const syncOfflineEvents = async () => {
  console.log(
    "TCL: syncOfflineEvents -> syncOfflineEvents",
    "Sending Offline activity"
  );
  const db = await initDB();
  const tx = db.transaction(QUEUE_STORE, "readwrite");
  const store = tx.objectStore(QUEUE_STORE);
  const events = await store.getAll();

  for (const event of events) {
    try {
      await apiInstance.post("/tracking", event);
    } catch (e) {
      break;
    }
  }
  await store.clear();
};

export const clearSession = async () => {
  const db = await initDB();
  sessionStorage.removeItem("track_sid");
  // We keep the email in IndexedDB usually,
  // but if you want total privacy on logout:
  await db.delete(IDENTITY_STORE, "guest_email");
};
