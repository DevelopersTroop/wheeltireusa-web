import Container from '@/components/ui/container/container';

const TireSupport = () => {
  return (
    <div className="container w-full h-full px-0">
      <div className="w-full h-full flex flex-col md:flex-row  items-center gap-8">
        <div className="w-full px-4 sm:px-6 lg:pl-8 xl:pl-16 lg:w-[40%] flex flex-col gap-4 pt-16 md:pt-0">
          <p className="text-lg md:text-xl font-normal uppercase text-[#464853]">
            Tirematic: Roadside Support
          </p>
          <h1 className="text-2xl md:text-[40px] font-bold">
            Tire Support You Can Rely On
          </h1>
          <p className="text-base md:text-xl font-normal text-[#212227]">
            Our tire expert at Tirematic is always here to help you make the
            best choice for your vehicle. From answering technical questions to
            walking you through financing options, he’s available to ensure your
            experience is smooth and hassle-free.
          </p>
        </div>
        <div className="w-full h-[470px] lg:h-[505px] lg:w-[60%]">
          <img
            src={'/images/home/tireSupport.png'}
            alt="TireSupport"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default TireSupport;
