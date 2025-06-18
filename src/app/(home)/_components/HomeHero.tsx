import Container from '@/components/ui/container/container';
import HeroFilter from './filter/HeroFilter';

export const HomeHero = () => {
  return (
    <div
      className={`bg-[url(/images/home/hero.png)] bg-no-repeat bg-cover bg-right-top`}
    >
      <Container>
        <div className="h-[90vh] mx-auto flex flex-col justify-center items-center ">
          <div className="flex flex-col gap-y-3">
            <h1 className="text-[40px] lg:text-[4rem] font-bold text-center leading-tight text-white">
              {'Tirematic:'}
              <br />
              Your Road to Reliability
            </h1>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg lg:text-2xl text-center  text-white">
                {
                  "Premium quality doesn't have to come at a premium price. Experience top-tier performance and affordability with Tirematic tires."
                }
              </p>
            </div>
            <HeroFilter />
          </div>
        </div>
      </Container>
    </div>
  );
};
