import React, { useState } from 'react';
import {
  X,
  Search,
  Navigation,
  Tag,
  Truck,
  Warehouse,
  ChevronRight,
  MapPin,
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
    <div className="fixed inset-0 bg-white/95 backdrop-blur-3xl z-100 flex flex-col font-sans animate-in slide-in-from-right duration-500 ease-out">
      <div className="p-10 flex justify-end">
        <button
          onClick={setOpen}
          className="p-4 hover:bg-slate-100 rounded-[2.5rem] transition-all hover:rotate-90 group"
        >
          <X size={32} className="text-slate-400 group-hover:text-slate-900" />
        </button>
      </div>

      <div className="px-10 max-w-4xl mx-auto w-full">
        {/* Input Header */}
        <div className="space-y-2 mb-12">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
            Locate Partners
          </h2>
          <div className="h-1 w-12 bg-primary rounded-full" />
        </div>

        <div
          className={`relative mb-8 border-b-4 transition-all duration-500 ${zipCode.length > 0 ? 'border-primary shadow-[0_4px_0_-2px_rgba(var(--primary),0.1)]' : 'border-slate-100'}`}
        >
          <input
            type="text"
            placeholder="Enter Zip Code"
            value={zipCode}
            onChange={(e) => updateZipInput(e.target.value, true)}
            className="w-full text-[64px] font-black py-6 focus:outline-none placeholder:text-slate-100 tracking-tighter uppercase italic transition-all"
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-6">
            {zipCode.length > 0 && (
              <button
                onClick={() => updateZipInput('', true)}
                className="text-sm font-black text-slate-400 hover:text-rose-500 uppercase tracking-widest transition-colors"
              >
                Reset
              </button>
            )}
            <div className="p-4 bg-slate-900 text-white rounded-3xl shadow-2xl">
              <Search size={32} strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* STATE 1: Empty / Initial */}
        {zipCode.length === 0 ? (
          <div className="mt-8 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-[2rem] w-fit">
              <MapPin size={24} className="text-primary" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                Current Location:{' '}
                <span className="text-slate-900">Ashburn, VA 20149</span>
              </p>
            </div>

            <button
              onClick={handleDetectZipCode}
              className="group relative flex items-center gap-6"
            >
              <span className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic group-hover:text-primary transition-colors">
                Auto-Detect Path
              </span>
              <div className="bg-slate-900 text-white p-4 rounded-full group-hover:rotate-360 transition-transform duration-700 shadow-2xl">
                <Navigation
                  size={32}
                  className="transform rotate-45"
                  fill="currentColor"
                />
              </div>
            </button>

            <div className="pt-10">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-xs font-black text-primary uppercase tracking-[0.4em]">
                  The Advantage
                </h3>
                <div className="h-px flex-1 bg-slate-100" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.map((b, i) => (
                  <div
                    key={i}
                    className="group relative"
                  >
                    <div className="absolute -inset-1 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
                    <div className="relative bg-white border border-slate-100 p-8 rounded-[2.5rem] flex flex-col gap-8 aspect-square shadow-sm transition-all group-hover:-translate-y-2 group-hover:shadow-2xl">
                      <div className="bg-slate-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                        {b.icon}
                      </div>
                      <div className="space-y-2">
                        <p className="text-xl font-black text-slate-900 uppercase tracking-tighter italic leading-tight">
                          {b.label}
                        </p>
                        <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                          Learn More <ChevronRight size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* STATE 2: Active Search / Loading */
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {loading ? (
              /* LOADING SKELETON */
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-10 bg-slate-50 rounded-[2.5rem] animate-pulse">
                    <div className="flex items-baseline gap-6 w-2/3">
                      <div className="h-12 w-32 bg-slate-200 rounded-xl" />
                      <div className="h-6 w-48 bg-slate-100 rounded-lg" />
                    </div>
                    <div className="h-16 w-40 bg-slate-200 rounded-2xl" />
                  </div>
                ))}
              </div>
            ) : (
              /* RESULTS LIST */
              <div className="space-y-6">
                {addresses.map((c) => (
                  <div
                    key={c.locationName}
                    className="group relative"
                  >
                    <div className="absolute -inset-1 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]" />
                    <div
                      className="relative flex items-center justify-between p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm transition-all group-hover:-translate-y-1 group-hover:shadow-2xl cursor-pointer"
                    >
                      <div className="flex items-baseline gap-6 font-black uppercase italic tracking-tighter">
                        <span className="text-5xl text-slate-900 group-hover:text-primary transition-colors">
                          {c.zipCode}
                        </span>
                        <span className="text-xl text-slate-400">
                          {c.locationName}
                        </span>
                      </div>
                      <button className="bg-slate-900 hover:bg-primary text-white rounded-2xl px-12 py-5 text-sm font-black uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95">
                        Activate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ZipCodeModal;
