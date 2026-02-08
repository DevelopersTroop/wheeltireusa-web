// hooks/useRestrictedLocationNotice.ts
'use client';

import { US_STATES } from '@/states';
import { useTypedSelector } from '@/redux/store';
import { useEffect, useState } from 'react';

const RESTRICTED_REGIONS = ['Hawaii', 'Alaska', 'Puerto Rico', 'Hawaii County'];

type GeocodeResult = { regionName: string } | null;

export function useShippingRestrictionLocationNotice() {
  const { shippingAddress, billingAddress } = useTypedSelector(
    (state) => state.persisted.checkout
  );

  const [showNotice, setShowNotice] = useState(false);
  const [locationChecked, setLocationChecked] = useState(false);
  const [location, setLocation] = useState<string | null>(null);

  const zipCode = shippingAddress?.zipCode || billingAddress?.zipCode;

  const state = shippingAddress.cityState || billingAddress.cityState;

  // forward geocode zip
  const geocodeZip = async (zip: string): Promise<GeocodeResult> => {
    try {
      const geocoder = new google.maps.Geocoder();
      return new Promise((resolve) => {
        geocoder.geocode({ address: zip }, (results, status) => {
          if (status === 'OK' && results?.length) {
            const comp = results[0].address_components;
            const regionComp = comp.find((c) =>
              [
                'administrative_area_level_1',
                'administrative_area_level_2',
                'country',
              ].some((t) => c.types.includes(t))
            );
            resolve(regionComp ? { regionName: regionComp.long_name } : null);
          } else {
            resolve(null);
          }
        });
      });
    } catch (err) {
      console.error('Error geocoding zip:', err);
      return null;
    }
  };

  // reverse geocode lat/lng
  const geocodeLatLng = async (
    lat: number,
    lng: number
  ): Promise<GeocodeResult> => {
    try {
      const geocoder = new google.maps.Geocoder();
      return new Promise((resolve) => {
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === 'OK' && results?.length) {
            const comp = results[0].address_components;
            const regionComp = comp.find((c) =>
              [
                'administrative_area_level_1',
                'administrative_area_level_2',
                'country',
              ].some((t) => c.types.includes(t))
            );
            resolve(regionComp ? { regionName: regionComp.long_name } : null);
          } else {
            resolve(null);
          }
        });
      });
    } catch (err) {
      console.error('Error reverse geocoding:', err);
      return null;
    }
  };

  useEffect(() => {
    if (zipCode.length < 5) return;
    if (typeof window === 'undefined') {
      setLocationChecked(true);
      return;
    }

    const handler = setTimeout(async () => {
      // --- 1. Try ZIP first ---
      if (zipCode && /^\d{5}$/.test(zipCode)) {
        const result = await geocodeZip(zipCode);
        if (result && RESTRICTED_REGIONS.includes(result.regionName)) {
          setShowNotice(true);
          setLocation(result.regionName);
          setLocationChecked(true);
          return; // success → stop here
        }
      }

      // --- 2. Fallback to Geolocation ---
      if (!navigator.geolocation) {
        setLocationChecked(true);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const result = await geocodeLatLng(latitude, longitude);
          if (result && RESTRICTED_REGIONS.includes(result.regionName)) {
            setShowNotice(true);
            setLocation(result.regionName);
          } else if (
            state &&
            RESTRICTED_REGIONS.includes(
              US_STATES.find((s) => s.abbreviation === state)?.name || ''
            )
          ) {
            setShowNotice(true);
            setLocation(state);
          } else {
            setShowNotice(false);
          }
          setLocationChecked(true);
        },
        (err) => {
          console.warn('Geolocation error:', err);
          setLocationChecked(true);
        }
      );
    }, 600); // debounce 600ms

    return () => clearTimeout(handler);
  }, [zipCode, state]);

  return { showNotice, locationChecked, location };
}
