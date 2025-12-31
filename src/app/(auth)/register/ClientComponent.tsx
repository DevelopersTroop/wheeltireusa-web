'use client';

import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import Link from 'next/link';
import RegisterForm from './_components/RegisterForm/RegisterForm';
import GoogleAuth from '@/components/shared/GoogleAuth';
import FacebookAuth from '@/components/shared/FacebookAuth';

const ClientComponent = () => {
  const icons = [
    // { src: '/google-icon-logo.svg', alt: 'Google' },
    // { src: '/facebook.png', alt: 'Facebook' },
    { src: '/Apple_logo.svg', alt: 'Apple' },
  ];

  return (
    <Container>
      <div className="flex w-full items-start">
        <div className="w-full">
          <Breadcrumb>
            <Item href={`/`}>Home</Item>
            <Item href={`/login`} isEnd={true}>
              Register
            </Item>
          </Breadcrumb>
        </div>
      </div>

      <div className="max-w-[416px] flex flex-col mx-auto mt-8 mb-18 sm:mt-14 sm:mb-40 gap-6">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-[32px] font-bold text-[#210203]">
            Create Account
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-normal text-[#464853]">
              Already have an account?
            </p>
            <Link
              className="text-lg font-normal text-[#212227] underline"
              href={'/login'}
            >
              Login
            </Link>
          </div>
        </div>

        <RegisterForm />

        <div className="flex items-center justify-center gap-2">
          <p className="text-lg font-normal text-[#61636B]">Or</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <GoogleAuth />
          <FacebookAuth />
          {icons.map((icon, idx) => (
            <button
              key={idx}
              className="border border-gray-300 rounded-md p-4 hover:shadow-md transition"
            >
              <img src={icon.src} alt={icon.alt} className="w-6 h-6" />
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ClientComponent;
