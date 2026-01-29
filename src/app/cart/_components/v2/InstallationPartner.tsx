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
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Confirm your installation appointment time
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
          <span
            onClick={() => setOpen(true)}
            className="underline decoration-dotted underline-offset-4 font-bold text-gray-700"
          >
            31 verified installers
          </span>
          <span>near</span>
          <span className="font-bold text-gray-900">{zipCode}:</span>
          <button
            onClick={setZipCodePopup}
            className="text-gray-400 underline decoration-dotted ml-1"
          >
            Change zip code
          </button>
        </div>
      </div>
      <InstallerSelectionModal isOpen={open} onClose={() => setOpen(false)} />

      <div className="flex items-center gap-2 text-sm py-2">
        <span className="font-black">🔧 Tire Installation</span>
        <button className="text-gray-400 underline decoration-dotted text-xs font-bold">
          What's included?
        </button>
      </div>

      {/* CAROUSEL */}
      <Carousel className="w-full relative group">
        <CarouselContent className="-ml-4">
          {installers.map((shop) => (
            <CarouselItem
              key={shop.id}
              className="pl-4 basis-[85%] md:basis-[48%]"
            >
              <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden flex flex-col h-full transition-all hover:shadow-xl">
                {/* Shop Image Header */}
                <div className="relative h-44 bg-gray-50">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur shadow-sm px-3 py-1 rounded-lg font-black text-sm">
                    +${shop.addedPrice.toFixed(2)}/tire
                  </div>
                </div>

                {/* Shop Details */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-black text-lg uppercase flex items-center gap-1 leading-tight tracking-tighter">
                      {shop.name} <ChevronRight size={18} />
                    </h3>
                  </div>
                  <p className="text-xs font-medium text-gray-400 mb-3">
                    {shop.address} • {shop.distance}
                  </p>

                  {/* Ratings */}
                  <div className="flex items-center gap-1 mb-4">
                    <img src="/yelp-logo.png" className="h-4 mr-1" alt="Yelp" />
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < 4 ? '#ff5a13' : 'none'}
                          stroke={i < 4 ? '#ff5a13' : '#d1d5db'}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-black ml-1">
                      {shop.rating}
                    </span>
                    <span className="text-xs text-gray-400 font-bold">
                      ({shop.reviews})
                    </span>
                  </div>

                  {/* Social Proof */}
                  <div className="flex items-center gap-2 text-[#ff5a13] bg-orange-50/50 p-2 rounded-lg mb-6">
                    <Users size={14} fill="#ff5a13" />
                    <span className="text-[11px] font-black uppercase tracking-tight">
                      {shop.socialProof}
                    </span>
                  </div>

                  {/* Appointment Info */}
                  <div className="mt-auto space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock size={16} className="text-slate-800 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Date & Time
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800">
                            {shop.earliestTime.split(' . ')[0]}
                          </span>
                          <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded uppercase">
                            Earliest time available
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {shop.earliestTime.split(' . ')[1]}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 border-2 border-gray-100 rounded-full py-2.5 text-sm font-black text-slate-800 hover:bg-gray-50 transition-colors">
                        Change Time
                      </button>
                      <button className="flex-1 bg-[#ff5a13] text-white rounded-full py-2.5 text-sm font-black hover:bg-[#e84e0e] transition-colors">
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
        <div className="absolute -top-12 right-12 flex gap-2">
          <CarouselPrevious className="static translate-y-0 h-10 w-10 bg-gray-100 border-none hover:bg-gray-200" />
          <CarouselNext className="static translate-y-0 h-10 w-10 bg-gray-100 border-none hover:bg-gray-200" />
        </div>
      </Carousel>
    </div>
  );
};

export default InstallationSection;
