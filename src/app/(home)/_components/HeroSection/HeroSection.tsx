'use client';
import { useState } from "react";
import HomeYmm from "./components/HomeYmm/HomeYmm";

export default function HeroSection() {

  const [activeTab, setActiveTab] = useState('vehicle');

  return (
    <section
      className="relative max-w-[1350px] mx-auto min-h-[800px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/hero.jpeg')`,
      }}
    >
      <div className="absolute inset-0 bg-black/55 backdrop-brightness-75"></div>

      <div className="relative container mx-auto px-4 py-16 flex flex-col items-center text-center gap-10">

        <div className="max-w-4xl space-y-5">
          <h1 className="text-3xl md:text-6xl font-extrabold text-white uppercase leading-tight tracking-tight">
            Find The Best <span className="text-primary">Wheels & Tires</span>
          </h1>

          <p className="text-gray-200 text-sm md:text-lg max-w-2xl mx-auto">
            Discover premium wheels, tires, and performance accessories designed
            to elevate your driving experience.
          </p>
        </div>

        <div className="w-full max-w-5xl bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-6 md:p-8 border border-white/30 transition-all duration-300 hover:shadow-3xl">

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setActiveTab("vehicle")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === "vehicle"
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Search by Vehicle
            </button>

            <button
              onClick={() => setActiveTab("size")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === "size"
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Search by Size
            </button>
          </div>

          <HomeYmm />
        </div>

      </div>
    </section>
  );
}