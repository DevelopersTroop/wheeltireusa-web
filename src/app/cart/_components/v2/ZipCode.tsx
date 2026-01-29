import React, { useState } from 'react';
import {
  X,
  Search,
  Navigation,
  Tag,
  Truck,
  Warehouse,
  ChevronRight,
} from 'lucide-react';
import { useZipCodePopup } from '@/hooks/useZipcodePopup';
import useAddZipCode from '@/components/shared-old/MainFilterModal/components/AddZipCode/useAddZipCode';

const ZipCodeModal = () => {
  const { open, setOpen } = useZipCodePopup();
  const {
    handleDetectZipCode,
    updateZipInput,
    zipCode,
    addresses,
    loading, //
  } = useAddZipCode();

  if (!open) return null;

  const benefits = [
    { icon: <Tag size={20} />, label: 'Better Pricing' },
    { icon: <Truck size={20} />, label: 'Faster delivery' },
    { icon: <Warehouse size={20} />, label: 'Verified local shops' },
  ];

  return (
    <div className="fixed inset-0 bg-white z-100 flex flex-col font-sans animate-in slide-in-from-right duration-300">
      <div className="p-6 flex justify-end">
        <button
          onClick={setOpen}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={28} className="text-gray-400" />
        </button>
      </div>

      <div className="px-10 max-w-2xl mx-auto w-full">
        {/* Input Header */}
        <div
          className={`relative mb-2 border-b-2 transition-colors ${zipCode.length > 0 ? 'border-black' : 'border-gray-200'}`}
        >
          <input
            type="text"
            placeholder="Enter your zip code"
            value={zipCode}
            onChange={(e) => updateZipInput(e.target.value, true)}
            className="w-full text-[40px] font-bold py-4 focus:outline-none placeholder:text-gray-300 tracking-tight"
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-4">
            {zipCode.length > 0 && (
              <button
                onClick={() => updateZipInput('', true)}
                className="text-sm font-bold text-gray-400 hover:text-black"
              >
                Clear
              </button>
            )}
            <Search className="text-black" size={28} strokeWidth={3} />
          </div>
        </div>

        {/* STATE 1: Empty / Initial */}
        {zipCode.length === 0 ? (
          <div className="mt-4 space-y-12">
            <p className="text-gray-500 font-medium">
              Current location:{' '}
              <span className="text-gray-900 font-bold">Ashburn, VA 20149</span>
            </p>

            <button
              onClick={handleDetectZipCode}
              className="flex items-center gap-4 group"
            >
              <span className="text-3xl font-black text-gray-900 tracking-tight">
                Use current location
              </span>
              <Navigation
                size={28}
                className="text-black transform rotate-45"
                fill="black"
              />
            </button>

            <div className="pt-8">
              <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.15em] mb-6">
                Why share your location?
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {benefits.map((b, i) => (
                  <div
                    key={i}
                    className="bg-[#f8f7f2] p-5 rounded-2xl flex flex-col justify-between aspect-square border border-transparent hover:border-gray-200 cursor-pointer group"
                  >
                    <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm text-gray-800">
                      {b.icon}
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-xs font-black text-gray-900 leading-tight w-2/3">
                        {b.label}
                      </p>
                      <ChevronRight
                        size={16}
                        className="text-gray-400 group-hover:text-black"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* STATE 2: Active Search / Loading */
          <div className="mt-8 animate-in fade-in duration-200">
            {loading ? (
              /* LOADING SKELETON */
              <div className="flex items-center justify-between py-6 border-b border-gray-50 animate-pulse">
                <div className="flex items-baseline gap-3 w-2/3">
                  <div className="h-10 w-24 bg-gray-100 rounded-md" />
                  <div className="h-6 w-48 bg-gray-50 rounded-md" />
                </div>
                <div className="h-12 w-32 bg-gray-100 rounded-full" />
              </div>
            ) : (
              /* RESULTS LIST */
              addresses.map((c) => (
                <div
                  key={c.locationName}
                  className="flex items-center justify-between py-6 group cursor-pointer border-b border-gray-50"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-gray-900">
                      {c.zipCode}
                    </span>
                    <span className="text-lg font-medium text-gray-400">
                      {c.locationName}
                    </span>
                  </div>
                  <button className="bg-white border-2 border-gray-100 rounded-full px-10 py-3 text-base font-black text-slate-900 hover:shadow-md transition-all active:scale-95">
                    Select
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ZipCodeModal;
