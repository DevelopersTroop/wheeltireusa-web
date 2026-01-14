import { updateValidatedZipCode } from '@/redux/features/checkoutSlice';
import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

export type ZipAddress = {
  zipCode: string;
  locationName: string; // e.g., "Boynton Beach, FL, USA"
};

const useAddZipCode = () => {
  const [zipCode, setZipCode] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [shouldValidate, setShouldValidate] = useState(true);
  const [addresses, setAddresses] = useState<ZipAddress[]>([]);

  const dispatch = useDispatch();

  /**
   * Helper to update global Redux state.
   */
  const onChangeZipCode = useCallback(
    (zip: string, validated = false) => {
      dispatch(
        setMainFilter({
          zipCode: zip.trim().length === 5 ? zip : null,
        })
      );
      if (validated) {
        dispatch(updateValidatedZipCode(zip));
      }
    },
    [dispatch]
  );

  /**
   * Manual Error Handler.
   */
  const handleError = useCallback((zip: string) => {
    setLoading(false);
    setAddresses([]);
    toast.error('Invalid U.S. ZIP code', {
      description: `That doesn't look like a valid U.S. ZIP code: ${zip}`,
    });
  }, []);

  /**
   * Core Geocoding Logic.
   */
  const performGeocoding = useCallback(
    (inputZip: string, setCurrent = false): Promise<boolean> => {
      return new Promise((resolve) => {
        if (typeof google === 'undefined') {
          console.error('Google Maps API not loaded');
          resolve(false);
          return;
        }

        setLoading(true); // Start loading state
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode(
          { address: inputZip, region: 'US' },
          (results, status) => {
            if (status === 'OK' && results && results.length > 0) {
              const validResults = results.filter((result) =>
                result.address_components.some(
                  (comp) =>
                    comp.types.includes('postal_code') &&
                    comp.long_name === inputZip
                )
              );

              if (validResults.length > 0) {
                const mappedAddresses: ZipAddress[] = validResults.map(
                  (res) => ({
                    zipCode: inputZip,
                    locationName: res.formatted_address
                      .replace(`${inputZip},`, '')
                      .trim(),
                  })
                );

                setAddresses(mappedAddresses);
                setLoading(false); // Stop loading on success

                if (setCurrent) {
                  setShouldValidate(false);
                  onChangeZipCode(inputZip, true);
                }
                resolve(true);
              } else {
                handleError(inputZip);
                resolve(false);
              }
            } else {
              handleError(inputZip);
              resolve(false);
            }
          }
        );
      });
    },
    [onChangeZipCode, handleError]
  );

  /**
   * Manual Validation Trigger.
   */
  const validateZipCode = async (zip: string, setCurrent = false) => {
    if (zip.length !== 5) return false;
    return await performGeocoding(zip, setCurrent);
  };

  /**
   * SETS CURRENT LOCATION: Detects Lat/Lng and fetches the ZIP + City/State.
   */
  const handleDetectZipCode = () => {
    if (!navigator.geolocation) {
      toast.error('Please allow location access to detect automatically');
      return;
    }

    setLoading(true); // Start loading for location detection

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latLng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode(
          { location: latLng, region: 'US' },
          (results, status) => {
            if (status === 'OK' && results && results.length > 0) {
              const postalCodeObj = results[0].address_components.find((comp) =>
                comp.types.includes('postal_code')
              );

              if (postalCodeObj) {
                const zip = postalCodeObj.long_name;

                // Extract city, state for current location display
                const city = results[0].address_components.find((c) =>
                  c.types.includes('locality')
                )?.long_name;
                const state = results[0].address_components.find((c) =>
                  c.types.includes('administrative_area_level_1')
                )?.short_name;

                setZipCode(zip);
                setAddresses([
                  {
                    zipCode: zip,
                    locationName: `${city}, ${state}, USA`, // Set the detected current location
                  },
                ]);

                setShouldValidate(false);
                onChangeZipCode(zip, true);
                setLoading(false); // Stop loading
              } else {
                setLoading(false);
                toast.warning('Zip code is not available');
              }
            } else {
              setLoading(false);
            }
          }
        );
      },
      () => setLoading(false)
    );
  };

  /**
   * DEBOUNCE EFFECT: Automatic validation.
   */
  useEffect(() => {
    if (zipCode.length === 5) {
      if (shouldValidate) {
        const handler = setTimeout(() => {
          performGeocoding(zipCode);
        }, 500);
        return () => clearTimeout(handler);
      } else {
        onChangeZipCode(zipCode, true);
      }
    } else {
      setAddresses([]);
    }
  }, [zipCode, shouldValidate, performGeocoding, onChangeZipCode]);

  return {
    updateZipInput: (zip: string, validate: boolean = true) => {
      setZipCode(zip);
      setShouldValidate(validate);
    },
    zipCode,
    addresses, // List to map for your selection UI
    validateZipCode, // Manual trigger
    handleDetectZipCode, // Sets current location
    loading, // Use for your UI spinner
  };
};

export default useAddZipCode;
