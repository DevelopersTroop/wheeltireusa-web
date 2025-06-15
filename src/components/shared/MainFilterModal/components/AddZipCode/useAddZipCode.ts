import { updateValidatedZipCode } from '@/redux/features/checkoutSlice';
import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const useAddZipCode = () => {
  const [zipCode, setZipCode] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [shouldValidate, setShoudlValidate] = useState(true);
  const dispatch = useDispatch();

  const handleDetectZipCode = () => {
    if (!navigator.geolocation) {
      toast.error('Please allow location access to detect automatic');
      return;
    }
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latLng = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode(
          {
            location: latLng,
            region: 'US',
          },
          (results, status) => {
            if (status === 'OK' && results && results.length > 0) {
              const addressComponents = results[0].address_components;

              const postalCodeObj = addressComponents.find((comp) =>
                comp.types.includes('postal_code')
              );
              if (postalCodeObj) {
                const zipCode = postalCodeObj.long_name;
                setLoading(false);
                setShoudlValidate(false);
                setZipCode(zipCode);
                onChangeZipCode(zipCode, true);
                // You can use the zipCode here (e.g., set state, call API, etc.)
              } else {
                setLoading(false);
                toast.warning('Zip code is not available', {
                  description: `We couldn't detect a valid U.S. ZIP code from your location. Please enter it manually.`,
                });
              }
            } else {
              setLoading(false);
              console.error('Geocoding failed:', status);
            }
          }
        );
      },
      (err) => {
        console.error('Geolocation error:', err);
      }
    );
  };

  const validateZipCode = (zipCode: string, setCurrent = false) => {
    let isValid = false;
    setLoading(true);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: zipCode, region: 'US' }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const isZipValid = results.some((result) =>
          result.address_components.some(
            (comp) =>
              comp.types.includes('postal_code') && comp.long_name === zipCode
          )
        );

        if (isZipValid) {
          isValid = true;
          setLoading(false);
          if (setCurrent) {
            setShoudlValidate(false);
            onChangeZipCode(zipCode, true);
          }
          // do something with valid ZIP
        } else {
          isValid = false;
          toast.error(
            `That doesn't look like a valid U.S. ZIP code. Please check and try again.`,
            {
              description: `ZIP code is not valid: ${zipCode}`,
            }
          );
          setLoading(false);
          // handle invalid ZIP
        }
      } else {
        isValid = false;
        setLoading(false);
        toast.error(
          `That doesn't look like a valid U.S. ZIP code. Please check and try again.`,
          {
            description: `ZIP code is not valid: ${zipCode}`,
          }
        );
        // handle invalid ZIP or network issue
      }
    });

    return isValid;
  };

  const onChangeZipCode = (zipCode: string, validated = false) => {
    dispatch(
      setMainFilter({
        zipCode: zipCode.trim().length === 5 ? zipCode : null,
      })
    );
    if (validated) {
      dispatch(updateValidatedZipCode(zipCode));
    }
  };

  useEffect(() => {
    if (zipCode.length === 5) {
      const isValid = shouldValidate ? validateZipCode(zipCode) : true;

      if (isValid) {
        onChangeZipCode(zipCode, true);
      }
    }
    onChangeZipCode(zipCode);
  }, [zipCode, shouldValidate]);

  return {
    onChangeZipCode: (zip: string, shouldValidate: boolean) => {
      setZipCode(zip);
      setShoudlValidate(shouldValidate);
    },
    zipCode,
    validateZipCode,
    handleDetectZipCode,
    loading,
  };
};
export default useAddZipCode;
