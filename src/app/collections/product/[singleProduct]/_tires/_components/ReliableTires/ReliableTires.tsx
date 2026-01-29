import Link from 'next/link';

const ReliableTires = () => {
  return (
    <div
      className={`flex my-4 relative bg-[url(/images/home/hero.png)] bg-no-repeat bg-cover bg-top-right h-[320px] rounded-xs`}
    >
      <div className="absolute top-1/2 -translate-y-1/2 text-left w-full text-white pl-5 sm:pl-10 pr-5 space-y-3">
        <h1 className="text-2xl sm:text-[40px] font-bold">
          Reliable Tires, Reliable Support
        </h1>
        <p className="text-xl font-normal text-[#F5F4F6] sm:w-[80%]">
          {
            "We're committed to ensuring your journey is smooth, from tire selection to aftercare.  Our team is here to help with any questions or concerns.  Your trust is our priority."
          }
        </p>
        <div className="flex flex-row gap-8">
          <Link className="underline" href={'#'}>
            Tire Section
          </Link>
          <Link className="underline" href={'/frequently-asked-questions'}>
            FAQ{' '}
          </Link>
          <Link className="underline" href={'#'}>
            Help Center
          </Link>
          <Link className="underline" href={'/contact-us'}>
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReliableTires;
