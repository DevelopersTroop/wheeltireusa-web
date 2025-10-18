import { useCheckout } from "@/context/checkoutContext";
import { useState } from "react";
import { toast } from "sonner";


export const useZipCodeValidator = () => {
    const {
        isValidZipCode,
        validatedZipCode,
        setZipCodeAddress,
        setValidatedZipCode,
    } = useCheckout();
    const [loading, setLoading] = useState(false);
    const handleValidate = async (zipCode: string) => {
        setLoading(true);

        toast.loading("Checking ZIP Code", {
            description: "Looking up installation options for your area...",
        });

        try {
            const geocoder = new window.google.maps.Geocoder();

            geocoder.geocode(
                {
                    address: zipCode,
                    componentRestrictions: { country: "US" },
                },
                (results, status) => {
                    if (status !== "OK" || !results || results.length === 0) {
                        toast.error("error", {
                            description: "Invalid ZIP code. Please try again.",
                        });
                        setLoading(false);
                        return;
                    }

                    const addressComponents = results[0].address_components;

                    const getComponent = (type: string) =>
                        addressComponents.find((comp) => comp.types.includes(type))
                            ?.short_name || "";

                    const city =
                        getComponent("locality") ||
                        getComponent("sublocality") ||
                        getComponent("neighborhood");
                    const state = getComponent("administrative_area_level_1");
                    const country = getComponent("country");
                    const postalCode = getComponent("postal_code");

                    if (postalCode && state && country) {
                        setZipCodeAddress({
                            country,
                            state,
                            city,
                            zipCode: postalCode,
                        });
                        setValidatedZipCode(postalCode);
                        toast.success("", {
                            description: "ZIP code validated successfully",
                        });
                    } else {
                        toast.error("", {
                            description:
                                "Incomplete address info. Please try another ZIP code.",
                        });
                    }

                    setLoading(false);
                }
            );
        } catch (error) {
            toast.error("ZIP Code Not Found", {
                description: "Please enter a valid US ZIP code to find installers",
            });
            setLoading(false);
        }
    };

    return {
        handleValidate,
        loading,
        valid: isValidZipCode,
        validatedZipCode: validatedZipCode,
    };
};
