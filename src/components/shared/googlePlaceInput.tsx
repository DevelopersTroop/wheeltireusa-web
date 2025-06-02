'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import debounce from 'debounce';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type Suggestion = {
  description: string;
  place_id: string;
  country: string;
  zipcode: string;
  state: string;
  city: string; // Added city field
  addressLines: string[];
};

type GooglePlacesInputProps = {
  onSelect: (address: Suggestion) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  value?: string;
};

// Cache interface for storing place predictions and details
interface Cache {
  predictions: {
    [input: string]: google.maps.places.AutocompletePrediction[];
  };
  details: {
    [placeId: string]: Suggestion;
  };
}

export const GooglePlacesInput = React.memo<GooglePlacesInputProps>(
  ({
    onSelect,
    error,
    label,
    value,
    required = true,
    placeholder = 'Enter address',
    ...props
  }) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[] | null>([]);
    const [isFetching, setIsFetching] = useState(false);
    const autocompleteService =
      useRef<google.maps.places.AutocompleteService | null>(null);
    const placesService = useRef<google.maps.places.PlacesService | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Create a cache for suggestions and place details
    const cache = useRef<Cache>({
      predictions: {},
      details: {},
    });

    useEffect(() => {
      if (!autocompleteService.current) {
        autocompleteService.current =
          new google.maps.places.AutocompleteService();
        placesService.current = new google.maps.places.PlacesService(
          document.createElement('div')
        );
      }
    }, []);

    const fetchSuggestions = useMemo(
      () =>
        debounce(async (inputValue: string) => {
          if (!autocompleteService.current || !isEditing) return;

          setIsFetching(true);

          try {
            // Check if we have cached predictions for this input
            if (cache.current.predictions[inputValue]) {
              const cachedPredictions = cache.current.predictions[inputValue];

              // Check if we have all the details cached for these predictions
              const allDetailsInCache = cachedPredictions.every(
                (prediction) => !!cache.current.details[prediction.place_id]
              );

              if (allDetailsInCache) {
                const detailedSuggestions = cachedPredictions.map(
                  (prediction) => cache.current.details[prediction.place_id]
                );
                setSuggestions(detailedSuggestions);
                setIsFetching(false);
                return;
              }
            }

            const predictions:
              | google.maps.places.AutocompletePrediction[]
              | null = await new Promise((resolve, reject) => {
              autocompleteService.current?.getPlacePredictions(
                {
                  input: inputValue,
                  componentRestrictions: { country: 'US' }, // Restrict to the USA
                },
                (predictions, status) => {
                  if (
                    status !== google.maps.places.PlacesServiceStatus.OK ||
                    !predictions
                  ) {
                    return reject(status);
                  }
                  resolve(predictions);
                }
              );
            });

            // Cache the predictions
            if (predictions) {
              cache.current.predictions[inputValue] = predictions;
            }

            const detailedSuggestions =
              predictions &&
              (await Promise.all(
                predictions.map(async (prediction) => {
                  // Check if we already have details for this place ID
                  if (cache.current.details[prediction.place_id]) {
                    return cache.current.details[prediction.place_id];
                  }

                  const details =
                    await new Promise<google.maps.places.PlaceResult>(
                      (resolve, reject) => {
                        placesService.current?.getDetails(
                          { placeId: prediction.place_id },
                          (place, status) => {
                            if (
                              status !==
                                google.maps.places.PlacesServiceStatus.OK ||
                              !place
                            ) {
                              return reject(status);
                            }
                            resolve(place);
                          }
                        );
                      }
                    );

                  const addressComponents = details.address_components || [];
                  const country =
                    addressComponents.find((component) =>
                      component.types.includes('country')
                    )?.long_name || '';
                  const zipcode =
                    addressComponents.find((component) =>
                      component.types.includes('postal_code')
                    )?.long_name || '';
                  const state =
                    addressComponents.find((component) =>
                      component.types.includes('administrative_area_level_1')
                    )?.long_name || '';
                  const streetNumber =
                    addressComponents.find((component) =>
                      component.types.includes('street_number')
                    )?.long_name || '';
                  const route =
                    addressComponents.find((component) =>
                      component.types.includes('route')
                    )?.long_name || '';
                  const locality =
                    addressComponents.find((component) =>
                      component.types.includes('locality')
                    )?.long_name || '';

                  // Get city data from either locality or sublocality
                  const city =
                    addressComponents.find(
                      (component) =>
                        component.types.includes('locality') ||
                        component.types.includes('sublocality')
                    )?.long_name || '';

                  const suggestion = {
                    description: prediction.description,
                    place_id: prediction.place_id,
                    country,
                    zipcode,
                    state,
                    city, // Include city in the suggestion
                    addressLines: [
                      `${streetNumber} ${route}`.trim(),
                      locality,
                    ].filter(Boolean),
                  };

                  // Cache the detailed suggestion
                  cache.current.details[prediction.place_id] = suggestion;

                  return suggestion;
                })
              ));

            setSuggestions(detailedSuggestions);
          } catch (error) {
            console.error('Autocomplete error:', error);
            setSuggestions([]);
          } finally {
            setIsFetching(false);
          }
        }, 300),
      [isEditing]
    );

    useEffect(() => {
      if (input.length > 2 && isEditing) {
        fetchSuggestions(input);
      } else {
        setSuggestions([]);
      }
    }, [input, fetchSuggestions, isEditing]);

    const handleSelect = (suggestion: Suggestion) => {
      setInput(suggestion.description);
      setSuggestions([]);
      setIsEditing(false);
      onSelect(suggestion);
    };

    useEffect(() => {
      setInput(value || '');
    }, [value]);

    return (
      <div className="relative">
        <div className="relative">
          {label && (
            <label className="block text-lg mb-1 font-medium leading-[24px]">
              {label}
              {required && <span className="text-red-600 ml-1">*</span>}
            </label>
          )}
          <Input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setIsEditing(true);
            }}
            onFocus={() => setIsEditing(true)}
            placeholder={placeholder}
            className="w-full pr-10 h-14"
            required
            {...props}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          {isFetching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground animate-spin">
              <Loader2 className="w-4 h-4" />
            </div>
          )}
        </div>
        {suggestions && suggestions.length > 0 && (
          <Card className="absolute z-50 w-full mt-1 shadow-lg rounded-xl">
            <CardContent className="p-2 space-y-1">
              {suggestions.map((s, idx) => {
                return (
                  <div
                    key={idx}
                    className="p-2 hover:bg-muted cursor-pointer rounded-md transition"
                    onClick={() => handleSelect(s)}
                  >
                    {s.description}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
);

GooglePlacesInput.displayName = 'GooglePlaceInput';
