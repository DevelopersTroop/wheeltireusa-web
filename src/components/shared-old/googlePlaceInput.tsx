'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import debounce from 'debounce';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, MapPin } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type Suggestion = {
  description: string;
  place_id: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  addressLines: string[];
};

type GooglePlacesInputProps = {
  onSelect: (address: Suggestion) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  value?: string;
  className?: string;
};

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
    className,
    ...props
  }) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[] | null>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
    const placesService = useRef<google.maps.places.PlacesService | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const cache = useRef<Cache>({
      predictions: {},
      details: {},
    });

    useEffect(() => {
      if (!autocompleteService.current) {
        autocompleteService.current = new google.maps.places.AutocompleteService();
        placesService.current = new google.maps.places.PlacesService(document.createElement('div'));
      }
    }, []);

    const fetchSuggestions = useMemo(
      () =>
        debounce(async (inputValue: string) => {
          if (!autocompleteService.current || !isEditing) return;

          setIsFetching(true);

          try {
            if (cache.current.predictions[inputValue]) {
              const cachedPredictions = cache.current.predictions[inputValue];
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

            const predictions: google.maps.places.AutocompletePrediction[] | null = await new Promise((resolve, reject) => {
              autocompleteService.current?.getPlacePredictions(
                {
                  input: inputValue,
                  componentRestrictions: { country: 'US' },
                },
                (predictions, status) => {
                  if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
                    return reject(status);
                  }
                  resolve(predictions);
                }
              );
            });

            if (predictions) {
              cache.current.predictions[inputValue] = predictions;
            }

            const detailedSuggestions = predictions && (await Promise.all(
              predictions.map(async (prediction) => {
                if (cache.current.details[prediction.place_id]) {
                  return cache.current.details[prediction.place_id];
                }

                const details = await new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
                  placesService.current?.getDetails(
                    { placeId: prediction.place_id },
                    (place, status) => {
                      if (status !== google.maps.places.PlacesServiceStatus.OK || !place) {
                        return reject(status);
                      }
                      resolve(place);
                    }
                  );
                });

                const addressComponents = details.address_components || [];
                const country = addressComponents.find((c) => c.types.includes('country'))?.long_name || '';
                const zipcode = addressComponents.find((c) => c.types.includes('postal_code'))?.long_name || '';
                const state = addressComponents.find((c) => c.types.includes('administrative_area_level_1'))?.short_name || '';
                const streetNumber = addressComponents.find((c) => c.types.includes('street_number'))?.long_name || '';
                const route = addressComponents.find((c) => c.types.includes('route'))?.long_name || '';
                const locality = addressComponents.find((c) => c.types.includes('locality'))?.long_name || '';
                const city = addressComponents.find((c) => c.types.includes('locality') || c.types.includes('sublocality'))?.long_name || '';

                const suggestion = {
                  description: prediction.description,
                  place_id: prediction.place_id,
                  country,
                  zipcode,
                  state,
                  city,
                  addressLines: [`${streetNumber} ${route}`.trim(), locality].filter(Boolean),
                };

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

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setSuggestions([]);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const hasContent = input.length > 0;

    return (
      <div className="group relative flex flex-col w-full pb-2" ref={containerRef}>
        {/* Main Input Container */}
        <div
          className={cn(
            "relative h-14 w-full transition-all duration-500 rounded-xl overflow-hidden",
            "bg-slate-50 border border-slate-200 shadow-sm",
            isFocused && "border-primary ring-2 ring-primary/10 bg-white",
            error && "border-rose-500 ring-2 ring-rose-500/10 bg-rose-50/10",
            className
          )}
        >
          {/* State Indicator (Left Bar) */}
          <motion.div
            initial={false}
            animate={{
              height: isFocused ? "100%" : "0%",
              opacity: isFocused ? 1 : 0,
              backgroundColor: error ? "#f43f5e" : "#3b82f6"
            }}
            className="absolute left-0 top-0 w-1 z-10"
          />

          {/* Label / Acting as Placeholder */}
          <AnimatePresence>
            {!hasContent && (
              <motion.label
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none select-none z-20 font-black tracking-widest uppercase italic text-[13px] text-slate-400"
              >
                {label}
                {required && <span className="ml-1 text-primary">*</span>}
              </motion.label>
            )}
          </AnimatePresence>

          {/* Fetching Indicator */}
          <AnimatePresence>
            {isFetching && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary z-20"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actual Input Field */}
          <input
            {...props}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setIsEditing(true);
            }}
            onFocus={() => {
              setIsEditing(true);
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={cn(
              "w-full h-full py-4 px-4 pr-10 bg-transparent outline-none",
              "text-slate-900 font-bold text-[15px] tracking-tight italic relative z-10",
              "placeholder:text-slate-300 transition-all"
            )}
          />

          {/* Focus Background Overlay */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-linear-to-b from-primary/3 to-transparent pointer-events-none"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {suggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute z-50 w-full top-16"
            >
              <Card className="shadow-2xl rounded-2xl border-slate-100 overflow-hidden bg-white/90 backdrop-blur-xl">
                <CardContent className="p-1.5">
                  {suggestions.map((s, idx) => (
                    <motion.div
                      key={s.place_id}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="flex items-center gap-3 p-3 hover:bg-primary/5 cursor-pointer rounded-xl transition-all group"
                      onClick={() => handleSelect(s)}
                    >
                      <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-primary/10 transition-colors">
                        <MapPin className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-[13px] font-bold text-slate-700 group-hover:text-slate-900 transition-colors italic truncate">
                        {s.description}
                      </span>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute -bottom-4 left-2 text-[9px] font-black text-rose-500 uppercase tracking-widest italic wrap-break-word"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

GooglePlacesInput.displayName = 'GooglePlacesInput';
