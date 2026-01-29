import React, { useState } from 'react';
import {
  X,
  Search,
  Map,
  ChevronRight,
  Star,
  Clock,
  Users,
  Info,
} from 'lucide-react';

const InstallerSelectionModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [activeTab, setActiveTab] = useState('All installers (31)');

  if (!isOpen) return null;

  const installers = [
    {
      id: 1,
      name: 'SAVILLE SERVICE CENTER',
      address: '37251 E Richardson Ln, Purcellville',
      distance: '5 mi',
      rating: 4.7,
      reviews: 6,
      addedPrice: 28.0,
      recentCustomers: 7,
      earliestTime: 'Friday 01/23/26 . Morning Drop-Off',
      image: '/shop-illustration.png', //
    },
    {
      id: 2,
      name: "Bridge's Auto Center",
      address: '118 E Main St, Purcellville',
      distance: '4 mi',
      rating: 4.5,
      reviews: 11,
      addedPrice: 33.0,
      recentCustomers: 22,
      earliestTime: 'Friday 01/23/26 . Morning Drop-Off',
      image: '/shop-photo.png', //
    },
  ];

  return (
    <div className="fixed inset-0 bg-white z-120 flex flex-col font-sans overflow-hidden animate-in fade-in duration-200">
      {/* Header Section */}
      <div className="p-8 pb-4 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <h1 className="text-[42px] font-black text-slate-900 leading-tight tracking-tight">
              Pick a shop and schedule your install time.
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-bold">
              <span>31 verified installers near </span>
              <span className="text-black">20149:</span>
              <button className="text-gray-400 underline decoration-dotted ml-1">
                Change zip code
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={32} className="text-gray-400" />
          </button>
        </div>

        {/* Tire Installation Info */}
        <div className="flex items-center gap-2 text-xs font-black mb-8">
          <span>🔧 Tire Installation</span>
          <button className="text-gray-400 underline decoration-dotted flex items-center gap-1">
            What's included?
          </button>
        </div>

        {/* Installer Type Selector */}
        <div className="flex gap-4 mb-10">
          <button className="flex-1 max-w-[180px] p-4 rounded-2xl border-2 border-orange-600 bg-white relative text-left">
            <div className="font-black text-sm text-slate-900">Local shops</div>
            <div className="text-[10px] text-gray-500 font-bold">
              Installers in your area.
            </div>
            <div className="absolute top-2 right-2 bg-orange-600 text-white rounded-full p-0.5">
              <div className="w-2 h-2 border-r-2 border-b-2 border-white rotate-45 transform -translate-y-0.5" />
            </div>
          </button>
          <button className="flex-1 max-w-[180px] p-4 rounded-2xl border-2 border-gray-100 bg-white text-left opacity-60">
            <div className="font-black text-sm text-slate-900">
              Mobile install
            </div>
            <div className="text-[10px] text-gray-500 font-bold">
              Installer comes to you.
            </div>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-3 mb-8">
          <button className="flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-full text-xs font-black">
            <Search size={16} /> Search
          </button>
          <button className="flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-full text-xs font-black">
            <Map size={16} /> Map
          </button>
          <button className="bg-gray-50 px-6 py-3 rounded-full text-xs font-black text-gray-300 cursor-not-allowed">
            Install tomorrow
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-100">
          {[
            'All installers (31)',
            'Distance',
            'Top rated',
            'Price: Low to High',
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold transition-all relative ${
                activeTab === tab ? 'text-black' : 'text-gray-400'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Shop List */}
      <div className="flex-1 overflow-y-auto bg-white p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {installers.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-[32px] border border-gray-50 shadow-xl overflow-hidden flex flex-col h-full hover:scale-[1.02] transition-transform"
            >
              {/* Image & Price Overlay */}
              <div className="relative h-56 bg-gray-100">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/95 px-3 py-1.5 rounded-xl font-black text-sm shadow-sm">
                  +${shop.addedPrice.toFixed(2)}/tire
                </div>
              </div>

              {/* Shop Details */}
              <div className="p-8 flex flex-col flex-1">
                <h3 className="font-black text-xl uppercase flex items-center gap-1 mb-1 tracking-tighter">
                  {shop.name} <ChevronRight size={20} />
                </h3>
                <p className="text-xs font-bold text-gray-400 mb-4">
                  {shop.address} • {shop.distance}
                </p>

                {/* Ratings */}
                <div className="flex items-center gap-1 mb-6">
                  <span className="text-red-600 font-black italic mr-2 text-sm tracking-tighter">
                    yelp
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < 4 ? '#ff5a13' : 'none'}
                        stroke={i < 4 ? '#ff5a13' : '#d1d5db'}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-black ml-1 text-slate-900">
                    {shop.rating}
                  </span>
                  <span className="text-xs text-gray-400 font-bold">
                    ({shop.reviews})
                  </span>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-2 text-orange-600 mb-8">
                  <Users size={18} fill="#ff5a13" className="opacity-80" />
                  <span className="text-xs font-black tracking-tight">
                    {shop.recentCustomers} people chose this shop recently
                  </span>
                </div>

                {/* Footer Actions */}
                <div className="mt-auto space-y-6">
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-slate-800 mt-1" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Date & Time
                        </span>
                        <span className="bg-gray-100 text-gray-600 text-[8px] font-black px-2 py-0.5 rounded uppercase">
                          Earliest time available
                        </span>
                      </div>
                      <p className="text-sm font-bold text-slate-900 mt-1">
                        {shop.earliestTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 border-2 border-gray-100 rounded-full py-4 text-sm font-black text-slate-900 hover:bg-gray-50 transition-colors">
                      Change Time
                    </button>
                    <button className="flex-[1.2] bg-orange-600 text-white rounded-full py-4 text-sm font-black hover:bg-orange-700 transition-colors">
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstallerSelectionModal;
