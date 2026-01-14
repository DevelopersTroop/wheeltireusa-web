'use client';
import React, { useState } from 'react';
import {
  X,
  Trash2,
  Truck,
  Lock,
  Plus,
  Minus,
  ChevronRight,
  Info,
} from 'lucide-react';
import InstallationSection from '../_components/v2/InstallationPartner';
import ZipCodeEntryModal from '../_components/v2/ZipCode';

const CartSystem = () => {
  const [isMainCartOpen, setIsMainCartOpen] = useState(true);
  const [isQtyModalOpen, setIsQtyModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(4);
  const [zipCodeMoal, setZipCodeModal] = useState(false);

  return (
    <div className="relative h-screen w-full bg-gray-100 overflow-hidden font-sans">
      {/* Background Overlay for the Side Drawer */}
      {isMainCartOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 transition-opacity" />
      )}

      {/* MAIN CART DRAWER */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-4xl bg-white z-40 transform transition-transform duration-300 shadow-2xl ${isMainCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="relative">
          <ZipCodeEntryModal />
        </div>

        {/* Header */}
        <div className="p-8 flex justify-between items-center bg-white border-b border-gray-50">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Cart summary
          </h2>
          <button onClick={() => setIsMainCartOpen(false)}>
            <X size={28} className="text-gray-400" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-[calc(100vh-140px)] p-8 pb-40 space-y-10">
          {/* Tire Section */}
          <div>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
              Tires
            </h3>
            <div className="flex gap-6 p-6 rounded-3xl border border-gray-100 shadow-md bg-white">
              <img
                src="/tire-thumb.png"
                alt="Milestar"
                className="w-20 h-20 object-contain"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-black text-2xl italic uppercase border-b-4 border-black inline-block leading-none">
                      MILESTAR
                    </h4>
                    <p className="text-gray-600 font-medium mt-1">
                      Weatherguard AW365
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      195/65R15 95H XL{' '}
                      <ChevronRight
                        size={14}
                        className="inline text-gray-300"
                      />
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-300 line-through font-bold">
                      $539.96
                    </p>
                    <p className="text-xl font-black text-slate-800">$351.96</p>
                    <p className="text-[10px] text-gray-400 font-bold">
                      $87.99/tire
                    </p>
                  </div>
                </div>
                {/* Quantity Trigger Button */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setIsQtyModalOpen(true)}
                    className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-full px-5 py-2 text-sm font-bold hover:bg-gray-100 transition-colors"
                  >
                    {quantity} tires{' '}
                    <ChevronRight size={14} className="rotate-90" />
                  </button>
                  <button className="p-2 border border-gray-200 rounded-full text-gray-300 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Selectors */}
          <section>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
              Shipping & Shop Services
            </h3>
            <div className="grid grid-cols-4 gap-3">
              <div className="relative p-3 border-2 border-[#ff5a13] rounded-xl flex flex-col items-center justify-center text-center bg-white h-28">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff5a13] text-white text-[8px] font-black px-2 py-1 rounded w-max tracking-tighter">
                  MOST POPULAR
                </span>
                <Truck className="text-[#ff5a13] mb-1" size={24} />
                <p className="text-[10px] font-bold leading-tight">
                  Ship to local installer
                </p>
                <p className="text-[9px] text-gray-400 mt-1">
                  Shipping & installation
                </p>
                <div className="absolute top-1 right-1 bg-[#ff5a13] text-white rounded-full p-0.5">
                  <div className="w-1.5 h-1.5 border-r-2 border-b-2 border-white rotate-45 transform -translate-y-0.5" />
                </div>
              </div>
              {/* Simplified secondary boxes */}
              <div className="border border-gray-200 rounded-xl p-3 flex flex-col items-center justify-center opacity-40 h-28 grayscale">
                <Truck size={24} className="mb-1" />
                <p className="text-[10px] font-bold">Ship to mobile</p>
              </div>
              {/* ... other boxes ... */}
            </div>
          </section>

          <InstallationSection />

          {/* Breakdown Section */}
          <section className="space-y-4 pt-4">
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <span>Milestar Weatherguard AW365 × {quantity}</span>
              <span className="text-slate-900 font-bold">$351.96</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-600 pb-4 border-b border-gray-100">
              <span className="flex items-center gap-1 italic">
                Shipping & handling <Info size={14} />
              </span>
              <span className="text-black font-black tracking-widest">
                FREE
              </span>
            </div>
          </section>
        </div>

        {/* STICKY FOOTER */}
        <div className="absolute bottom-0 inset-x-0 bg-white border-t border-gray-100 p-6 shadow-[0_-20px_40px_rgba(0,0,0,0.08)] z-50">
          <div className="flex gap-4">
            <button className="flex-1 bg-[#ffc439] hover:bg-[#f2ba32] rounded-full h-14 flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal_logo.svg"
                className="h-5"
                alt="PayPal"
              />
            </button>
            <button className="flex-[2.5] bg-[#ff5a13] hover:bg-[#e84e0e] text-white font-black text-lg italic rounded-full h-14 flex items-center justify-center gap-2 shadow-lg shadow-orange-100">
              <Lock size={18} fill="white" /> Checkout
            </button>
          </div>
          <p className="text-[9px] text-gray-400 text-center mt-4 px-10 leading-tight">
            By placing an order, you agree and accept the{' '}
            <span className="underline">terms of sale</span>. SimpleTire is not
            liable if the tire does not fit correctly.
          </p>
        </div>

        {/* QUANTITY UPDATE MODAL */}
        <div
          className={`absolute inset-0 bg-white z-[60] transform transition-transform duration-300 flex flex-col ${isQtyModalOpen ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <div className="p-8 flex justify-end">
            <button onClick={() => setIsQtyModalOpen(false)}>
              <X size={28} className="text-gray-400" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center px-10 pt-4">
            {/* Pro Tip Section */}
            <div className="flex flex-col items-center text-center mb-16">
              <div className="relative mb-2">
                <div className="text-orange-600 bg-orange-50 p-2 rounded-full">
                  <Truck size={32} />
                </div>
                <div className="absolute -top-1 -right-1 bg-white p-0.5 rounded-full">
                  <div className="bg-orange-600 w-3 h-3 rounded-full border-2 border-white" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-[#ff5a13] italic uppercase">
                PRO tip
              </h3>
              <p className="text-2xl font-black text-slate-800 leading-tight mt-2 px-8">
                Replace tires in pairs for better traction and braking
              </p>
              <p className="text-sm text-gray-500 mt-4 leading-snug">
                Most drivers replace 4 tires. If you had a flat tire, replace at
                least two.
              </p>
            </div>

            {/* Selector Section */}
            <div className="w-full max-w-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                  Select tire quantity
                </span>
                <span className="text-sm text-gray-400">
                  Total price •{' '}
                  <span className="font-bold text-gray-900">$351.96</span>
                </span>
              </div>

              <div className="flex items-center justify-between border-y border-gray-100 py-10">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 transition-all"
                >
                  <Minus size={24} />
                </button>
                <span className="text-6xl font-black italic text-[#ff5a13]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 transition-all"
                >
                  <Plus size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-8 pb-12">
            <button
              onClick={() => setIsQtyModalOpen(false)}
              className="w-full border-2 border-[#ff5a13] text-[#ff5a13] hover:bg-orange-50 font-black text-lg italic py-4 rounded-full transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSystem;
