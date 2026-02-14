import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'; // Standard shadcn/ui carousel path
import { Star, MapPin, Clock, Users, ChevronRight } from 'lucide-react';
import InstallerSelectionModal from './InstallerSelectionModal';
import { useZipCodePopup } from '@/hooks/useZipcodePopup';
import useAddZipCode from '@/components/shared-old/MainFilterModal/components/AddZipCode/useAddZipCode';

const InstallationSection = () => {
  const [open, setOpen] = useState(false);
  const { setOpen: setZipCodePopup } = useZipCodePopup();
  const { zipCode } = useAddZipCode();
  const installers = [
    {
      id: 1,
      name: 'SAVILLE SERVICE CENTER',
      address: '37251 E Richardson Ln, Purcellville',
      distance: '5 mi',
      rating: 4.7,
      reviews: 6,
      addedPrice: 28.0,
      socialProof: '7 people chose this shop recently',
      earliestTime: 'Friday 01/23/26 . Morning Drop-Off',
      image: '/shop-placeholder-1.png', // Placeholder for shop illustration
    },
    {
      id: 2,
      name: "Bridge's Auto Center",
      address: '118 E Main St, Purcellville',
      distance: '4 mi',
      rating: 4.5,
      reviews: 11,
      addedPrice: 33.0,
      socialProof: '22 people chose this shop recently',
      earliestTime: 'Friday 01/23/26 . Morning Drop-Off',
      image: '/shop-real-photo.png', // Real photo as seen in
    },
    {
      id: 2,
      name: "Bridge's Auto Center",
      address: '118 E Main St, Purcellville',
      distance: '4 mi',
      rating: 4.5,
      reviews: 11,
      addedPrice: 33.0,
      socialProof: '22 people chose this shop recently',
      earliestTime: 'Friday 01/23/26 . Morning Drop-Off',
      image: '/shop-real-photo.png', // Real photo as seen in
    },
    {
      id: 2,
      name: "Bridge's Auto Center",
      address: '118 E Main St, Purcellville',
      distance: '4 mi',
      rating: 4.5,
      reviews: 11,
      addedPrice: 33.0,
      socialProof: '22 people chose this shop recently',
      earliestTime: 'Friday 01/23/26 . Morning Drop-Off',
      image: '/shop-real-photo.png', // Real photo as seen in
    },
  ];

  return (
    <div className="mt-10 space-y-6">
      {/* SECTION HEADER */}
      <div className="space-y-3">
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
          Complete Your Setup
        </h2>
        <div className="flex items-center gap-3">
          <div className="h-1 w-10 bg-primary rounded-full" />
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
            <span className="text-slate-400">SELECT FROM</span>
            <span
              onClick={() => setOpen(true)}
              className="underline decoration-primary decoration-2 underline-offset-4 text-slate-900 cursor-pointer hover:text-primary transition-colors"
            >
              31 CERTIFIED PARTNERS
            </span>
            <span className="text-slate-400">NEAR</span>
            <span className="bg-slate-900 text-white px-3 py-1 rounded-lg text-xs tracking-widest">{zipCode}</span>
            <button
              onClick={setZipCodePopup}
              className="text-primary hover:underline ml-1 uppercase text-xs tracking-tighter font-black"
            >
              Update Location
            </button>
          </div>
        </div>
      </div>
      <InstallerSelectionModal isOpen={open} onClose={() => setOpen(false)} />

      <div className="flex items-center gap-4 py-4 bg-primary/5 rounded-2xl px-6 border border-primary/10">
        <div className="bg-primary text-white p-2 rounded-xl scale-75 lg:scale-100">
          <Clock size={20} />
        </div>
        <div>
          <span className="block text-[10px] font-black text-primary uppercase tracking-[0.2em]">Next-Day Availability</span>
          <span className="text-sm font-black text-slate-900 uppercase italic">Professional Wheel & Tire Installation</span>
        </div>
        <button className="ml-auto text-slate-400 hover:text-primary underline text-xs font-black uppercase tracking-tighter">
          What's included?
        </button>
      </div>

      {/* CAROUSEL */}
      <Carousel className="w-full relative group">
        <CarouselContent className="-ml-4">
          {installers.map((shop) => (
            <CarouselItem
              key={shop.id}
              className="pl-4 basis-[90%] md:basis-[48%]"
            >
              <div className="group/card relative bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                {/* Shop Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                      +${shop.addedPrice.toFixed(2)} / TIRE
                    </span>
                  </div>
                </div>

                {/* Shop Details */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-2xl uppercase italic leading-none tracking-tighter text-slate-900">
                      {shop.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">
                    <MapPin size={12} className="text-primary" />
                    <span>{shop.address.split(',')[0]}</span>
                    <span>•</span>
                    <span>{shop.distance}</span>
                  </div>

                  {/* Ratings */}
                  <div className="flex items-center gap-2 mb-6 bg-slate-50 p-2 rounded-xl w-fit">
                    <img src="/yelp-logo.png" className="h-4 grayscale opacity-50" alt="Yelp" />
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < 4 ? '#f59e0b' : 'none'}
                          stroke={i < 4 ? '#f59e0b' : '#d1d5db'}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-black text-slate-900 ml-1">
                      {shop.rating}
                    </span>
                  </div>

                  {/* Social Proof */}
                  <div className="flex items-center gap-3 text-primary bg-primary/5 p-4 rounded-2xl mb-8">
                    <Users size={16} className="animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-tight">
                      {shop.socialProof}
                    </span>
                  </div>

                  {/* Appointment Info */}
                  <div className="mt-auto space-y-6">
                    <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl">
                      <Clock size={20} className="text-slate-900" />
                      <div className="flex-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Next Available Window</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-slate-900 uppercase italic">
                            {shop.earliestTime.split(' . ')[0]}
                          </span>
                          <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase">
                            Confirmed
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 border-2 border-slate-100 rounded-2xl py-4 text-xs font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
                        Schedule
                      </button>
                      <button className="flex-1 bg-slate-900 text-white rounded-2xl py-4 text-xs font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-200 active:scale-95">
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <div className="absolute -top-16 right-0 flex gap-3">
          <CarouselPrevious className="static translate-y-0 h-14 w-14 bg-white border border-slate-100 shadow-xl text-slate-900 hover:bg-slate-900 hover:text-white transition-all rounded-2xl" />
          <CarouselNext className="static translate-y-0 h-14 w-14 bg-white border border-slate-100 shadow-xl text-slate-900 hover:bg-slate-900 hover:text-white transition-all rounded-2xl" />
        </div>
      </Carousel>
    </div>
  );
};

export default InstallationSection;
