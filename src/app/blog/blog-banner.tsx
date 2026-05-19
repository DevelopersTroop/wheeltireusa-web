import Container from '@/components/ui/container/container';

const BlogBanner = () => {
  return (
    <div className="w-full relative overflow-hidden bg-gray-950 h-[180px] sm:h-[300px] px-4">
      {/* Animated gradient orbs */}
      <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-16 -right-8 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 rounded-full bg-white/5 blur-2xl" />

      {/* Dot grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Diagonal stripe accent */}
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
          backgroundSize: '12px 12px',
        }}
      />

      <Container>
        <div className="relative z-10 flex flex-col gap-2 sm:gap-4 justify-center h-[180px] sm:h-[300px] items-start">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-primary/20 border border-primary/30 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              WheelTireUSA
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
              Blog
            </span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-xl leading-relaxed hidden sm:block">
            Expert tips, wheel trends, and real-world performance stories — all in one place.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default BlogBanner;
