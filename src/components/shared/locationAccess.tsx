'use client';
import { useLocationCoords } from '@/hooks/useLocationCoords';
import { useEffect, useRef } from 'react';

export const LocationAccess = () => {
  const { setLocation } = useLocationCoords();

  const hasRequestedLocation = useRef(false);

  useEffect(() => {
    if (hasRequestedLocation.current) return;
    hasRequestedLocation.current = true;

    if (!navigator.geolocation) {
      // alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.permissions?.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'denied') {
        // alert("Location access is denied. Please enable it for full functionalities");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation(latitude, longitude);
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            // alert("You denied the location request. Please allow it for full functionality.");
          } else {
            // alert(`Failed to get location: ${err.message}`);
          }
        }
      );
    });
  }, []);

  return null;
};
