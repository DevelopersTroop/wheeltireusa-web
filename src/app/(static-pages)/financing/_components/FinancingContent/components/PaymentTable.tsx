import Link from 'next/link';
import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { IoCheckmarkOutline } from 'react-icons/io5';

// Interface to define the structure of a payment provider
interface PaymentProvider {
  name: string;
  image: string;
  link: string;
  howItWorks: string;
  advantages: string[];
  creditRequired: boolean;
  interestCharged: { isTrue: boolean; content?: string };
  repaymentOptions: string;
  minOrderAmount: string;
  earlyPayoff: boolean;
  lateFees: { isTrue: boolean; content?: string };
}

// Array of payment providers with their details
export const paymentProviders: PaymentProvider[] = [
  {
    name: 'PayPal',
    image: 'images/financing/PayPal.png',
    link: 'https://www.paypal.com/',
    howItWorks: 'Offers a revolving line of credit for online purchases.',
    advantages: ['No annual fee- Promotional financing offers'],
    creditRequired: true,
    interestCharged: {
      isTrue: true,
      content: 'depending on the promotional offer',
    },
    repaymentOptions: 'Monthly payments',
    minOrderAmount: '$30',
    earlyPayoff: true,
    lateFees: { isTrue: true, content: 'if payment is missed' },
  },
  {
    name: 'Affirm',
    image: 'images/financing/affirm.png',
    link: 'https://www.affirm.com/',
    howItWorks:
      'Provides installment loans with clear terms at the point of sale.',
    advantages: ['No hidden fees- Flexible payment terms- No late fees'],
    creditRequired: true,
    interestCharged: { isTrue: true, content: 'ranging from 0% to 30% APR' },
    repaymentOptions: '3, 6, or 12 monthly payments',
    minOrderAmount: 'As low as $100',
    earlyPayoff: true,
    lateFees: { isTrue: false },
  },
  {
    name: 'Katapult',
    image: 'images/financing/Katapult.png',
    link: 'https://go.katapult.com/',
    howItWorks: 'Lease-to-own option for customers without credit.',
    advantages: [
      'No credit required- Instant approvals up to $3,500- Flexible payment plans',
    ],
    creditRequired: false,
    interestCharged: { isTrue: true, content: 'varies by lease agreement' },
    repaymentOptions: 'Lease payments with buyout options',
    minOrderAmount: 'Varies by merchant',
    earlyPayoff: true,
    lateFees: { isTrue: false },
  },
  {
    name: 'Klarna',
    image: 'images/financing/Klarna.png',
    link: 'https://www.klarna.com/',
    howItWorks:
      'Offers multiple payment options, including pay-in-four and longer-term financing',
    advantages: [
      'Interest-free installments- Soft credit check- Flexible payment plans',
    ],
    creditRequired: true,
    interestCharged: {
      isTrue: true,
      content: 'No for pay-in-four; Yes for longer-term financing',
    },
    repaymentOptions:
      'Pay in 4 installments every 2 weeks or monthly payments up to 36 months',
    minOrderAmount: '$10',
    earlyPayoff: true,
    lateFees: { isTrue: true, content: '$7 per missed payment' },
  },
  {
    name: 'Afterpay',
    image: 'images/financing/afterpay.png',
    link: 'https://www.afterpay.com/',
    howItWorks:
      'Allows customers to pay for purchases in four interest-free installments',
    advantages: ['No interest- No credit check- Automatic payments'],
    creditRequired: false,
    interestCharged: { isTrue: false },
    repaymentOptions: '4 equal installments every 2 weeks',
    minOrderAmount: 'Varies by merchant',
    earlyPayoff: true,
    lateFees: { isTrue: true, content: 'late fees apply' },
  },
];

// Component to render the payment providers table
const PaymentTable: React.FC = () => {
  return (
    <div className="overflow-x-auto hidden md:block">
      <table className="w-full border border-gray-300 text-sm">
        <thead className="">
          <tr>
            <th className="p-3 border"></th>
            {paymentProviders.map((provider) => (
              <th key={provider.name} className="p-3 border min-w-[180px]">
                <div className="flex flex-col gap-3 py-4">
                  <Link href={provider.link} target="_blank">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-auto h-8 m-auto"
                    />
                  </Link>
                  <Link
                    href={provider.link}
                    target="_blank"
                    className="text-base font-semibold underline"
                  >
                    Learn More
                  </Link>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* How it works */}
          <tr className="border">
            <td className="p-3 border text-base font-semibold">How It Works</td>
            {paymentProviders.map((provider) => (
              <td
                key={provider.name}
                className="p-3 border text-base font-normal text-center"
              >
                {provider.howItWorks}
              </td>
            ))}
          </tr>

          {/* Advantages */}
          <tr className="border">
            <td className="p-3 border text-base font-semibold">Advantages</td>
            {paymentProviders.map((provider) => (
              <td key={provider.name} className="p-3 border">
                <ul className="list-none list-inside space-y-2">
                  {provider.advantages.map((adv, index) => (
                    <li
                      key={index}
                      className=" flex flex-row gap-2 text-base font-normal"
                    >
                      <IoCheckmarkOutline className="text-2xl text-green-500" />{' '}
                      <p className="w-full">{adv}</p>{' '}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          {/* Credit Required */}
          <tr className="border">
            <td className="p-3 border text-base font-semibold">
              Credit Required
            </td>
            {paymentProviders.map((provider) => (
              <td key={provider.name} className="p-3 border text-center">
                {provider.creditRequired ? (
                  <IoCheckmarkOutline className="text-2xl text-green-500 text-center mx-auto" />
                ) : (
                  <RxCross2 className="text-2xl text-primary text-center mx-auto" />
                )}
              </td>
            ))}
          </tr>

          {/* Interest Charged */}
          <tr className="border">
            <td className="p-3 border text-base font-semibold">
              Interest Charged
            </td>
            {paymentProviders.map((provider) => (
              <td key={provider.name} className="p-3 border text-center">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <p>
                    {provider.interestCharged.isTrue ? (
                      <IoCheckmarkOutline className="text-2xl text-green-500 text-center mx-auto" />
                    ) : (
                      <RxCross2 className="text-2xl text-primary text-center mx-auto" />
                    )}
                  </p>{' '}
                  {provider.interestCharged.content}
                </div>
              </td>
            ))}
          </tr>

          {/* Repayment Options */}
          <tr className="border">
            <td className="p-3 border text-base font-semibold">
              Repayment Options
            </td>
            {paymentProviders.map((provider) => (
              <td
                key={provider.name}
                className="p-3 border text-base font-normal text-center"
              >
                {provider.repaymentOptions}
              </td>
            ))}
          </tr>

          {/* Minimum Order Amount */}
          <tr className="border">
            <td className="p-3 border text-base font-semibold whitespace-nowrap">
              Minimum Order Amount
            </td>
            {paymentProviders.map((provider) => (
              <td
                key={provider.name}
                className="p-3 border text-base font-normal text-center"
              >
                {provider.minOrderAmount}
              </td>
            ))}
          </tr>

          {/* Early Payoff */}
          <tr className="border">
            <td className="p-3 border text-base font-semibold">Early Payoff</td>
            {paymentProviders.map((provider) => (
              <td key={provider.name} className="p-3 border text-center">
                {provider.earlyPayoff ? (
                  <IoCheckmarkOutline className="text-2xl text-green-500 text-center mx-auto" />
                ) : (
                  <RxCross2 className="text-2xl text-primary text-center mx-auto" />
                )}
              </td>
            ))}
          </tr>

          {/* Late Fees */}
          <tr className="border">
            <td className="p-3 border text-base font-semibold">Late Fees</td>
            {paymentProviders.map((provider) => (
              <td key={provider.name} className="p-3 border text-center">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <p>
                    {provider.lateFees.isTrue ? (
                      <IoCheckmarkOutline className="text-2xl text-green-500 text-center mx-auto" />
                    ) : (
                      <RxCross2 className="text-2xl text-primary text-center mx-auto" />
                    )}
                  </p>{' '}
                  {provider.lateFees.content}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
