"use client";

import { useState, useEffect } from "react";
import { MdClose, MdLocationOn } from "react-icons/md";

interface ZipCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentZip: string;
  onSave: (zipCode: string, city: string, state: string) => void;
}

const ZipCodeModal = ({ isOpen, onClose, currentZip, onSave }: ZipCodeModalProps) => {
  const [zipCode, setZipCode] = useState(currentZip);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setZipCode(currentZip);
      setError("");
    }
  }, [isOpen, currentZip]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic zip code validation (5 digits)
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(zipCode)) {
      setError("Please enter a valid ZIP code");
      return;
    }

    setLoading(true);

    try {
      // Use a free ZIP code API to get city and state
      const response = await fetch(`https://ziptasticapi.com/${zipCode.split("-")[0]}`);

      if (response.ok) {
        const data = await response.json();
        const city = data.city || "Unknown";
        const state = data.state || "Unknown";
        onSave(zipCode, city, state);
        onClose();
      } else {
        // If API fails, just save the zip code
        onSave(zipCode, "City", "ST");
        onClose();
      }
    } catch {
      // If fetch fails, just save the zip code
      onSave(zipCode, "City", "ST");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl w-[95%] sm:w-full sm:max-w-xl lg:max-w-2xl xl:max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <MdLocationOn className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Change Delivery Location
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <MdClose className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
            Enter your ZIP code to check availability and delivery estimates.
          </p>

          <div className="mb-3 sm:mb-4">
            <label htmlFor="zipCode" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
              ZIP Code
            </label>
            <input
              type="text"
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter ZIP code (e.g., 97129)"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              maxLength={10}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-xs sm:text-sm mt-1.5 sm:mt-2">{error}</p>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-2.5 sm:p-3 mb-3 sm:mb-4">
            <p className="text-[10px] sm:text-xs text-gray-500">
              We deliver to the lower 48 states. Free shipping on all orders.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg text-gray-700 text-sm sm:text-base font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 bg-primary hover:bg-primary/90 text-white text-sm sm:text-base font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Location"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ZipCodeModal;
