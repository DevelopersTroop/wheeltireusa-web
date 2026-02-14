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
  MapPin,
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
    <div className="fixed inset-0 bg-white/95 backdrop-blur-3xl z-120 flex flex-col font-sans overflow-hidden animate-in slide-in-from-right duration-700 ease-out">
      {/* Header Section */}
      <div className="p-10 pb-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-3">
            <h1 className="text-[56px] font-black text-slate-900 leading-none tracking-tighter uppercase italic">
              Network Selection
            </h1>
            <div className="flex items-center gap-4">
              <div className="h-1.5 w-16 bg-primary rounded-full" />
              <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest">
                <span className="text-slate-400">PARTNERS NEAR</span>
                <span className="bg-slate-900 text-white px-3 py-1 rounded-xl text-xs tracking-widest shadow-lg">20149</span>
                <button className="text-primary hover:underline transition-colors">
                  Modify Sector
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-4 hover:bg-slate-100 rounded-[2.5rem] transition-all hover:rotate-90 group"
          >
            <X size={40} className="text-slate-400 group-hover:text-slate-900" />
          </button>
        </div>

        {/* Tire Installation Info */}
        <div className="flex items-center gap-4 py-4 bg-primary/5 rounded-2xl px-6 border border-primary/10 w-fit mb-10">
          <div className="bg-primary text-white p-2 rounded-xl">
            <Info size={18} />
          </div>
          <span className="text-sm font-black text-slate-900 uppercase italic tracking-tight">Full-Service Network Protocol</span>
          <button className="text-slate-400 hover:text-primary underline text-xs font-black uppercase tracking-tighter ml-4">
            Coverage Details
          </button>
        </div>

        {/* Installer Type Selector */}
        <div className="flex gap-6 mb-12">
          <button className="group relative flex-1 max-w-[240px]">
            <div className="absolute -inset-1 bg-primary/20 blur-xl opacity-100 rounded-[2rem]" />
            <div className="relative p-6 rounded-[2rem] border-2 border-slate-900 bg-white text-left transition-all group-hover:-translate-y-1">
              <div className="font-black text-lg text-slate-900 uppercase tracking-tight italic">Verified Shops</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
                Brick & mortar network.
              </div>
              <div className="absolute top-4 right-4 bg-slate-900 text-white rounded-full p-1.5 shadow-xl">
                <ChevronRight size={16} strokeWidth={3} />
              </div>
            </div>
          </button>

          <button className="group relative flex-1 max-w-[240px] opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
            <div className="relative p-6 rounded-[2rem] border-2 border-slate-100 bg-white text-left">
              <div className="font-black text-lg text-slate-900 uppercase tracking-tight italic">Mobile Units</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
                On-site deployment.
              </div>
            </div>
          </button>
        </div>

        {/* Tabs & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-8 border-b border-slate-100">
          <div className="flex gap-10">
            {[
              'Global View (31)',
              'Proximity',
              'Performance',
              'Elite Pricing',
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-6 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                  }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 pb-6">
            <button className="flex items-center gap-3 bg-slate-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all hover:bg-primary hover:-translate-y-1">
              <Search size={14} strokeWidth={3} /> Filter Path
            </button>
            <button className="flex items-center gap-3 bg-white border border-slate-100 text-slate-900 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm transition-all hover:bg-slate-50 hover:-translate-y-1">
              <Map size={14} strokeWidth={3} /> Geo Map
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Shop List */}
      <div className="flex-1 overflow-y-auto bg-slate-50/50 p-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
          {installers.map((shop) => (
            <div
              key={shop.id}
              className="group/card relative bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]"
            >
              {/* Image & Price Overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <span className="bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl shadow-2xl">
                    +${shop.addedPrice.toFixed(2)} / Tire Protocol
                  </span>
                </div>
              </div>

              {/* Shop Details */}
              <div className="p-10 flex flex-col flex-1">
                <h3 className="font-black text-2xl uppercase italic leading-none tracking-tighter text-slate-900 mb-2">
                  {shop.name}
                </h3>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">
                  <MapPin size={14} className="text-primary" />
                  <span>{shop.address.split(',')[0]}</span>
                  <span>•</span>
                  <span>{shop.distance}</span>
                </div>

                {/* Ratings */}
                <div className="flex items-center gap-3 mb-8 bg-slate-50 p-3 rounded-2xl w-fit">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        fill={i < 4 ? '#f59e0b' : 'none'}
                        stroke={i < 4 ? '#f59e0b' : '#d1d5db'}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-black text-slate-900">
                    {shop.rating}
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    ({shop.reviews} Protocols)
                  </span>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-4 text-primary bg-primary/5 p-5 rounded-[2rem] mb-10 translate-y-0 group-hover/card:-translate-y-1 transition-transform">
                  <Users size={20} className="animate-pulse" />
                  <span className="text-[11px] font-black uppercase tracking-tight leading-tight">
                    {shop.recentCustomers} Active Deployment Requests
                  </span>
                </div>

                {/* Footer Actions */}
                <div className="mt-auto space-y-8">
                  <div className="flex items-center gap-5 p-5 border border-slate-100 rounded-[2rem]">
                    <Clock size={24} className="text-slate-900" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Next Window</span>
                        <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase">Priority</span>
                      </div>
                      <p className="text-sm font-black text-slate-900 uppercase italic">
                        {shop.earliestTime.split(' . ')[0]}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 border-2 border-slate-100 rounded-2xl py-5 text-xs font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
                      Schedule
                    </button>
                    <button className="flex-[1.5] bg-slate-900 text-white rounded-2xl py-5 text-xs font-black uppercase tracking-widest hover:bg-primary transition-all shadow-2xl active:scale-95">
                      Confirm Partner
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
