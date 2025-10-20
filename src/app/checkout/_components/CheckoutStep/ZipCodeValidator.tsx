"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCheckout } from "@/context/checkoutContext";
import { cn } from "@/lib/utils";
import { AlertCircle, CircleCheck, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// Interfaces for location and ZIP code response
interface Location {
  lat: string; // Latitude of the location
  lng: string; // Longitude of the location
}

// Main component for ZIP code validation
export interface ZipResponse {
  places: Array<{
    latitude: string; // Latitude of the place
    longitude: string; // Longitude of the place
    "place name": string
    "state abbreviation": string
  }>;
  "country abbreviation": string; // Abbreviation of the country
  "post code": string
}


// Main component for ZIP code validation
export const ZipCodeValidator: React.FC = () => {
  const { setValidatedZipCode, setIsValidZipCode, setZipCodeAddress, validatedZipCode } = useCheckout();
  // Component state
  const [valid, setValid] = useState(false); // State to track if the ZIP code is valid
  const [code, setCode] = useState(validatedZipCode || ""); // State to store the ZIP code input
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to store error messages
  // Handle ZIP code input changes
  const handleCodeChange = (value: string) => {
    setCode(value.slice(0, 5)); // Limit input to 5 characters
  };

  // Function to validate the ZIP code

  const validateZipCode = useCallback(async (zipCode: string) => {
    setLoading(true);
    setError(null);

    try {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode(
        {
          address: zipCode,
          componentRestrictions: { country: "US" },
        },
        (results, status) => {
          if (status !== "OK" || !results || results.length === 0) {
            setValid(false);
            setError("Invalid ZIP code");
            setLoading(false);
            return;
          }

          const addressComponents = results[0].address_components;

          const getComponent = (type: string) =>
            addressComponents.find((comp) => comp.types.includes(type))?.short_name || "";

          const city =
            getComponent("locality") ||
            getComponent("sublocality") ||
            getComponent("neighborhood");
          const state = getComponent("administrative_area_level_1");
          const country = getComponent("country");
          const postalCode = getComponent("postal_code");

          if (postalCode && state && country) {
            setValid(true);
            setZipCodeAddress({
              country,
              state,
              city,
              zipCode: postalCode,
            });
            console.log(postalCode, state, country, zipCode)
            setValidatedZipCode(postalCode);
          } else {
            setValid(false);
            setError("Incomplete address information");
          }

          setLoading(false);
        }
      );
    } catch (error: any) {
      setValid(false);
      setError(error.message || "ZIP code validation failed");
      setLoading(false);
    }
  }, []);



  // Validate the ZIP code when the input changes
  useEffect(() => {
    if (code === "") {
      setValid(false); // Reset validity
      setError(null); // Reset error
      return;
    }

    const timer = setTimeout(() => {
      if (/^\d{5}$/.test(code)) {
        validateZipCode(code); // Validate if the input is a 5-digit ZIP code
      } else {
        setValid(false); // Mark as invalid
        setError("Please enter a valid 5-digit ZIP code");
      }
    }, 500); // Debounce validation

    return () => clearTimeout(timer); // Clear timeout on cleanup
  }, [code, validateZipCode]);

  // Handle form submission
  const handleSubmit = () => {
    if (valid) {
      setIsValidZipCode(true); // Mark ZIP code as valid in the context
      setValidatedZipCode(code); // Save the validated ZIP code
    }
  };

  return (
    <div className="grid grid-cols-10 max-w-4xl mx-auto gap-4">
      {/* Left Section: Title and Description */}
      <div className="col-span-10 lg:col-span-4">
        <h2 className="font-bold text-2xl">Delivery & Installation</h2>
        <p className="font-medium text-gray-600 mt-2">
          Enter your ZIP Code to view your installation and delivery options.
        </p>
      </div>

      {/* Right Section: ZIP Code Input and Validation */}
      <div className="col-span-10 lg:col-span-6">
        <div className="flex flex-col gap-y-4">
          {/* Input Label */}
          <Label htmlFor="zipcode" className="capitalize font-bold text-lg">
            Enter ZIP Code
          </Label>

          {/* ZIP Code Input */}
          <div className="relative">
            <Input
              id="zipcode"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={5}
              disabled={loading}
              placeholder="Enter 5-digit ZIP code"
              onChange={(e) => handleCodeChange(e.target.value)}
              value={code}
              className={cn(
                "h-12 rounded-sm border-slate-400 focus:outline-none focus:ring-0 focus:ring-offset-0 w-full text-lg pr-10",
                error && "border-red-500 focus:border-red-500"
              )}
            />
            {/* Validation Icon */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              ) : (
                <CircleCheck
                  size={32}
                  className={cn(
                    "text-white transition-colors",
                    valid ? "fill-green-500" : "fill-slate-300"
                  )}
                />
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            disabled={!valid || loading} // Disable button if invalid or loading
            onClick={handleSubmit} // Handle form submission
            className={cn(
              "font-bold rounded-sm h-12 transition-all",
              !valid && "opacity-50 cursor-not-allowed"
            )}
          >
            View Options
          </Button>
        </div>
      </div>
    </div>
  );
};