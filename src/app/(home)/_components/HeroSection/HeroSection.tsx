'use client';
import HomeFilter from "./components/HomeFilter/HomeFilter";

export default function HeroSection() {

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

        <div className="w-full max-w-5xl transition-all duration-300">
          <HomeFilter />
        </div>

      </div>
    </section>
  );
}