import Link from 'next/link';

// Component to render the hero section for the Financing page
const FinancingHero = () => {
  // Inline styles for the hero banner background image
  const bannerImg = {
    backgroundImage: `url("/images/financing/Financing2.jpeg")`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: '10px',
  };

  return (
    <div className="w-full sm:py-4">
      {' '}
      {/* Wrapper for the hero section with padding for small screens */}
      <div
        className="w-full relative h-[500px] sm:h-[320px] "
        style={bannerImg}
      >
        {/* Gradient overlay for the banner */}
        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-orange-700/100 via-orange-700/100 via-30% to-orange-700/0 rounded-[10px]"></div>
        {/* Content inside the hero banner */}
        <div className="flex flex-col gap-4 justify-center items-start absolute inset-0 m-auto">
          {/* Hero title */}
          <h1 className="pl-5 sm:pl-10 text-[40px] leading-[48px] text-white">
            <span className="text-white font-bold">Financing</span>
          </h1>
          {/* Hero subtitle */}
          <h5 className="pl-5 sm:pl-10 text-xl leading-8 text-white">
            <span className="text-white font-normal">
              Buy now, pay over the time
            </span>
          </h5>
          {/* Links to financing providers */}
          <div className="w-full flex flex-row flex-wrap gap-3 pl-5 sm:pl-10">
            <Link
              href={'https://www.paypal.com'}
              target={'_blank'}
              className="bg-white text-black px-6 py-[15px] h-14 rounded-lg"
            >
              <img
                src="images/financing/PayPal.png"
                alt="paypal"
                className="w-full h-full object-contain"
              />
            </Link>

            <Link
              href={'https://www.affirm.com'}
              target={'_blank'}
              className="bg-white text-black px-6 py-3 h-14 rounded-lg"
            >
              <img
                src="images/financing/affirm.png"
                alt="affirm"
                className="w-full h-full object-contain"
              />
            </Link>

            <Link
              href={'https://go.katapult.com'}
              target={'_blank'}
              className="bg-white text-black px-6 py-3 h-14 rounded-lg"
            >
              <img
                src="images/financing/Katapult.png"
                alt="katapult"
                className="w-full h-full object-contain"
              />
            </Link>
            <Link
              href={'https://www.klarna.com/'}
              target={'_blank'}
              className="bg-white text-black px-6 py-4 h-14 rounded-lg"
            >
              <img
                src="images/financing/Klarna.png"
                alt="klarna"
                className="w-full h-full object-contain"
              />
            </Link>
            <Link
              href={'https://www.afterpay.com/'}
              target={'_blank'}
              className="bg-white text-black px-3 py-3 h-14 rounded-lg"
            >
              <img
                src="images/financing/afterpay.png"
                alt="afterpay"
                className="w-full h-full object-contain"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancingHero;
