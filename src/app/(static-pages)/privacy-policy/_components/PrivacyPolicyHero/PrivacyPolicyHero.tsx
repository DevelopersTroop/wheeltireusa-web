import Container from '@/components/ui/container/container';

const PrivacyPolicyHero = () => {
  return (
    <div className="w-full relative bg-gray-950 overflow-hidden">
      {/* Brand glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 60%, var(--primary) 0%, transparent 45%), radial-gradient(circle at 85% 20%, var(--primary-hover) 0%, transparent 35%)',
        }}
      />
      {/* Decorative tyre rings */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.04] overflow-hidden pointer-events-none select-none">
        <div className="absolute inset-0 flex flex-wrap gap-4 p-8">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-10 h-10 rounded-full border-4 border-white flex-shrink-0" />
          ))}
        </div>
      </div>

      <Container>
        <div className="relative z-10 flex flex-col gap-3 sm:gap-5 justify-center py-10 sm:py-20 px-4">
          <span className="text-primary text-xs sm:text-sm font-semibold tracking-widest uppercase">
            Legal
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white uppercase leading-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed">
            Learn how we collect, use, and protect your personal information at WheelTireUSA.
          </p>
          <div className="flex items-center gap-3 mt-1">
            <div className="h-1 w-12 rounded-full bg-primary" />
            <div className="h-1 w-4 rounded-full bg-primary/40" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPolicyHero;
