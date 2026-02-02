'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCheckout } from '@/context/checkoutContext';
import { cn } from '@/lib/utils';
import { AlertCircle, CircleCheck, Loader2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface Location {
  lat: string;
  lng: string;
}

interface ZipResponse {
  places: Array<{
    latitude: string;
    longitude: string;
  }>;
}

export const ZipCodeValidator: React.FC = () => {
  const {
    setValidatedZipCode,
    setIsValidZipCode,
    setZipCodeAddress,
    validatedZipCode,
  } = useCheckout();

  const [valid, setValid] = useState(false);
  const [code, setCode] = useState(validatedZipCode || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location>({
    lat: '',
    lng: '',
  });

  const handleCodeChange = (value: string) => {
    setCode(value.slice(0, 5));
  };

  const validateZipCode = useCallback(async (zipCode: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
      if (!response.ok) {
        throw new Error('Invalid ZIP code');
      }

      const data: ZipResponse = await response.json();

      if (data && data.places?.[0]) {
        const address = data.places[0];
        setLocation({
          lat: address.latitude,
          lng: address.longitude,
        });
        setValid(true);
      } else {
        setValid(false);
        setError('Invalid ZIP code');
      }
    } catch (error) {
      setValid(false);
      setError(
        error instanceof Error ? error.message : 'Failed to validate ZIP code'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAddress = useCallback(
    async (lat: string, lng: string) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch address');
        }

        const data = await response.json();
        if (data?.display_name) {
          setZipCodeAddress(data.display_name);
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    },
    [setZipCodeAddress]
  );

  useEffect(() => {
    if (validatedZipCode) {
      validateZipCode(validatedZipCode);
    }
  }, [validatedZipCode, validateZipCode]);

  useEffect(() => {
    if (code === '') {
      setValid(false);
      setError(null);
      return;
    }

    const timer = setTimeout(() => {
      if (/^\d{5}$/.test(code)) {
        validateZipCode(code);
      } else {
        setValid(false);
        setError('Please enter a valid 5-digit ZIP code');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [code, validateZipCode]);

  useEffect(() => {
    if (valid && location.lat && location.lng) {
      fetchAddress(location.lat, location.lng);
    }
  }, [location, valid, fetchAddress]);

  const handleSubmit = () => {
    if (valid) {
      setIsValidZipCode(true);
      setValidatedZipCode(code);
    }
  };

  return (
    <div className="grid grid-cols-10 max-w-4xl mx-auto gap-4">
      <div className="col-span-10 lg:col-span-4">
        <h2 className="font-bold text-2xl">Delivery & Installation</h2>
        <p className="font-medium text-gray-600 mt-2">
          Enter your ZIP Code to view your installation and delivery options.
        </p>
      </div>

      <div className="col-span-10 lg:col-span-6">
        <div className="flex flex-col gap-y-4">
          <Label htmlFor="zipcode" className="capitalize font-bold text-lg">
            Enter ZIP Code
          </Label>

          <div className="relative">
            <Input
              id="zipcode"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={5}
              placeholder="Enter 5-digit ZIP code"
              onChange={(e) => handleCodeChange(e.target.value)}
              value={code}
              className={cn(
                'h-12 rounded-sm border-slate-400 focus:outline-none focus:ring-0 focus:ring-offset-0 w-full text-lg pr-10',
                error && 'border-red-500 focus:border-red-500'
              )}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              ) : (
                <CircleCheck
                  size={32}
                  className={cn(
                    'text-white transition-colors',
                    valid ? 'fill-green-500' : 'fill-slate-300'
                  )}
                />
              )}
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            disabled={!valid || loading}
            onClick={handleSubmit}
            className={cn(
              'font-bold rounded-sm h-12 transition-all',
              !valid && 'opacity-50 cursor-not-allowed'
            )}
          >
            View Options
          </Button>
        </div>
      </div>
    </div>
  );
};
