import Container from '@/components/ui/container/container';

const LookingAhead = () => {
  return (
    <div className="bg-black py-16 sm:py-[152px]">
      <Container>
        <div className="flex flex-col gap-4">
          <h2 className="text-[40px] sm:text-5xl lg:text-[64px] font-bold text-white">
            Looking Ahead
          </h2>

          <p className="text-lg sm:text-xl font-normal text-[#F5F4F6]">
            We’re not just here to sell tires; we’re here to build
            relationships. As we continue to innovate, Tirematic is committed to
            redefining the tire-buying experience for customers everywhere.
            Together, let’s drive toward a future of safer roads and better
            journeys.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default LookingAhead;
