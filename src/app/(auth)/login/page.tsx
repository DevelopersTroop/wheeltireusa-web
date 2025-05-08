'use client';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container/container';
import Text from '@/lib/generic-form/fields/Text';
import TextCheckBox from '@/lib/generic-form/fields/TextCheck';
import TextPassword from '@/lib/generic-form/fields/TextPassword';
import GenericForm from '@/lib/generic-form/GenericForm';
import Link from 'next/link';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type TFieldValues = z.infer<typeof formSchema>;

const defaultValues: TFieldValues = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const onSubmit = (data: TFieldValues) => {
    console.log(data);
  };

  const icons = [
    { src: '/google-icon-logo.svg', alt: 'Google' },
    { src: '/facebook.png', alt: 'Facebook' },
    { src: '/Apple_logo.svg', alt: 'Apple' },
  ];

  return (
    <Container>
      <div className="flex w-full items-start">
        <div className="w-full">
          <Breadcrumb>
            <Item href={`/`}>Home</Item>
            <Item href={`/login`} isEnd={true}>
              Login
            </Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="max-w-[416px] flex flex-col mx-auto mt-14 mb-40 gap-6">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-[32px] font-bold text-[#210203]">My Account</h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-normal text-[#464853]">
              Dont have an account yet?
            </p>
            <Link
              className="text-lg font-normal text-[#212227] underline"
              href={'/register'}
            >
              Create Account
            </Link>
          </div>
        </div>
        <GenericForm
          schema={formSchema}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        >
          <div>
            <Text<TFieldValues>
              name="email"
              placeholder="email@email.com"
              heading="Email"
              showMessage={true}
            />
          </div>
          <div className="flex flex-col gap-2">
            <TextPassword<TFieldValues>
              name="password"
              placeholder="Enter your password"
              heading="Password"
              showMessage={true}
              checkForgotPassword={true}
            />
          </div>
          <div>
            <TextCheckBox<TFieldValues> name="terms" />
          </div>

          <div>
            <Button
              className="w-full !h-11 bg-[#F6511D] hover:bg-orange-500"
              type="submit"
            >
              {' '}
              <img src="UserCircle.svg" className="w-5 h-5 text-white" /> Login
            </Button>
          </div>
        </GenericForm>
        <div className="flex items-center justify-center gap-2">
          <p className="text-lg font-normal text-[#61636B]">Or</p>
        </div>

        <div className="flex items-center justify-center gap-4">
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

export default LoginPage;
