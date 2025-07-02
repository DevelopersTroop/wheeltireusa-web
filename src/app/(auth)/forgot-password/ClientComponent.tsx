'use client';

import Container from '@/components/ui/container/container';
import ForgotPasswordForm from './_components/ForgotPasswordForm/ForgotPasswordForm';

const ClientComponent = () => {
  return (
    <Container>
      <div className={'my-20 flex justify-center'}>
        <div
          className={
            'w-full sm:w-4/5 md:w-1/2 lg:w-2/5 shadow-[0_1px_3px_0_rgba(0,0,0,0.09)] px-8 py-8 rounded-xs'
          }
        >
          <h2 className={'text-2xl font-bold border-b pb-2.5 border-gray mb-4'}>
            Forgot Password
          </h2>
          <ForgotPasswordForm />
        </div>
      </div>
    </Container>
  );
};

export default ClientComponent;
