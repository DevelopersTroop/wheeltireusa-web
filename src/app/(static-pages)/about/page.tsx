import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import Item from "@/components/ui/breadcrumb/item";
import { metaDataHelper } from "@/utils/metadata";
import React from "react";

export async function generateMetadata() {
  try {
    return {
      ...metaDataHelper({
        title: `About us - Wheel Tire USA`,
        description: "",
      }),
      alternates: {
        canonical: `https://wheeltireusa.com/about`,
      },
    };
  } catch (error) {
    return { title: "Error" };
  }
}

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "50K+", label: "Products In Stock" },
  { value: "48hr",  label: "Avg. Shipping Time" },
  { value: "100%", label: "Secure Checkout" },
];

const promises = [
  { icon: "🏆", title: "Quality First",   desc: "We partner only with brands known for craftsmanship, performance, and safety. No cheap knockoffs, no low-grade products." },
  { icon: "💲", title: "Honest Pricing",  desc: "Clear pricing, no hidden fees, and products built to last. We believe in delivering real value every time." },
  { icon: "🚚", title: "Fast Shipping",   desc: "We process orders quickly and ship them safely, so you get what you need on time, every time." },
  { icon: "🎧", title: "Real Support",    desc: "Our team knows wheels and tires — not scripts. We guide you to the right fit and answer every question." },
  { icon: "🔒", title: "Safe Shopping",   desc: "Our website is designed to make your experience fast, simple, and secure from checkout to delivery." },
  { icon: "🤝", title: "Long-term Trust", desc: "We're not just selling products — we're building relationships. Your satisfaction is our priority." },
];

const offerings = [
  "Premium wheels in a range of styles, finishes, and sizes",
  "Top-brand tires for all-season, performance, off-road, and daily driving",
  "Wheel-and-tire packages mounted, balanced, and ready to install",
  "Accessories that support performance, safety, and durability",
];

const steps = [
  "Select your wheel or tire by vehicle",
  "We verify fitment and process quickly",
  "Fast, secure shipping to your door",
  "Ongoing support from real experts",
];

const promiseItems = [
  "We'll always provide trusted brands and quality products",
  "We'll always offer fair pricing and clear information",
  "We'll always deliver helpful, honest service",
  "We'll always treat your vehicle like it's our own",
];

const CheckIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const AboutPage: React.FC = () => {
  return (
    <div className="bg-background min-h-screen">

      

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gray-950 text-white">
        {/* Brand glow using CSS var so it always stays in sync */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 55%, var(--primary) 0%, transparent 48%), radial-gradient(circle at 80% 15%, var(--primary-hover) 0%, transparent 38%)",
          }}
        />
        {/* Decorative tyre rings */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.04] overflow-hidden pointer-events-none select-none">
          <div className="absolute inset-0 flex flex-wrap gap-4 p-8">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-white flex-shrink-0" />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-4">
              About WheelTireUSA
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Built for Drivers.<br />
              <span className="text-primary">Trusted Nationwide.</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
              Our goal is simple — deliver the best wheels, tires, and vehicle
              accessories with service you can rely on. We help drivers upgrade
              with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {stats.map((stat) => (
              <div key={stat.label} className="py-8 px-6 text-center">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm mt-1 font-medium text-white/75">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">
              Our Story
            </span>
            <h2 className="text-4xl font-bold text-foreground mt-3 mb-6 leading-tight">
              From a small idea to a nationwide name
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                WheelTireUSA was founded with one purpose in mind: make it easier
                for everyday drivers to find high-quality wheels and tires without
                the stress, confusion, or inflated pricing that often comes with
                the process.
              </p>
              <p>
                Over the years, we've grown from a small operation into a trusted
                source for customers across the United States, offering a wide
                selection of products backed by personalised support.
              </p>
              <p>
                We understand how important it is to feel confident in what you're
                buying. That's why we focus on clear information, trusted brands,
                fair pricing, and a customer experience that feels straightforward
                from start to finish.
              </p>
            </div>
          </div>

          {/* Step card */}
          <div className="relative">
            <div className="bg-secondary rounded-2xl p-8 border border-border">
              <div className="space-y-4">
                {steps.map((step, i) => (
                  <React.Fragment key={i}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-sm flex-shrink-0 text-primary-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <p className="text-foreground font-medium">{step}</p>
                    </div>
                    {i < steps.length - 1 && <div className="ml-5 h-6 w-px bg-border" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
            {/* Decorative accent block */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary rounded-2xl -z-10 opacity-10" />
          </div>
        </div>
      </section>

      {/* ── What We Offer ────────────────────────────────────────────────────── */}
      <section className="bg-gray-950 text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">
              Catalog
            </span>
            <h2 className="text-4xl font-bold mt-3">What We Offer</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              Wheels and tires for cars, trucks, SUVs, and specialty vehicles —
              selected for quality, reliability, and real value.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {offerings.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl p-5 border border-white/10 bg-white/[0.04] hover:border-primary/40 hover:bg-primary/[0.07] transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-200 leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────────── */}
      <section className="py-20 container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-14">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Why Us
          </span>
          <h2 className="text-4xl font-bold text-foreground mt-3">
            Why Drivers Choose WheelTireUSA
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Every product we offer is selected based on quality, reliability,
            and real value. If it's not something we'd use on our own vehicles,
            we don't carry it.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {promises.map((item) => (
            <div
              key={item.title}
              className="bg-background border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-foreground font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Promise Banner ───────────────────────────────────────────────── */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center text-primary-foreground">
          <h2 className="text-4xl font-bold mb-4">Our Promise to You</h2>
          <p className="mb-12 text-lg text-white/80">
            We're not just selling products — we're building relationships. Your
            satisfaction is our priority, and we stand behind every product we offer.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {promiseItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl p-4 bg-white/10">
                <CheckIcon />
                <span className="text-sm leading-snug text-white/90">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 container mx-auto px-4 text-center max-w-2xl">
        <span className="text-primary text-sm font-semibold tracking-widest uppercase">
          Thank You
        </span>
        <h2 className="text-4xl font-bold text-foreground mt-3 mb-4">WheelTireUSA</h2>
        <p className="text-muted-foreground text-lg mb-8">
          Thank you for choosing us. We're honored to be part of your automotive
          journey — whether you're upgrading your look, improving performance, or
          building something custom.
        </p>
        <a
          href="/collections/product-category/wheels"
          className="box-button-lg inline-flex items-center gap-2"
        >
          Shop Wheels &amp; Tires
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </section>

    </div>
  );
};

export default AboutPage;
