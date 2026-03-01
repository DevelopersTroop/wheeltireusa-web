'use client';
import { useState } from "react";
import HomeYmm from "./components/HomeYmm/HomeYmm";

export default function HeroSection() {

  const [activeTab, setActiveTab] = useState('vehicle');

  const banner = {
    backgroundImage: `url('/images/hero.jpeg')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "750px",
  };

  return (
    <div className="relative h-screen bg-cover bg-center py-20" style={banner}>
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="w-full flex flex-col items-center gap-10">
          <div>
            <h1 className=" text-2xl md:text-6xl text-white uppercase font-bold">
              Find the best wheels & tires
            </h1>
          </div>

          <HomeYmm />
        </div>
      </div>
    </div>
  );
}
