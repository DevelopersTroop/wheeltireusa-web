import Container from '@/components/ui/container/container';

// Component to render the hero section for the Contact Us page
const DealsAndRebatesHero = () => {
  return (
    <div className="w-full relative h-[150px] sm:h-[280px]">
      {/* Gradient overlay for the banner */}
      <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-black/80 to-black/10"></div>
      {/* Content inside the hero banner */}
      <Container>
        <div className="flex flex-col gap-2 sm:gap-6 justify-center -top-[11px] items-start self-stretch relative h-[150px] sm:h-[280px]">
          {/* Hero title */}
          <h1 className="text-2xl min-[400px]:text-[32px] sm:text-5xl text-white">
            <span className="text-white font-bold uppercase [text-shadow:2px_2px_4px_black]">
              Deals and Rebates
            </span>
          </h1>
          {/* Hero subtitle */}
          <h5 className="text-xl text-white">
            <span className="text-white text-base sm:text-xl font-normal [text-shadow:2px_2px_4px_black]">
              Explore our latest deals and rebates to save more on top tire
              brands and services.
            </span>
          </h5>
        </div>
      </Container>
    </div>
  );
};

export default DealsAndRebatesHero;
