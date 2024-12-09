import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type Membership = {
  title: string;
  description: string;
  price: string;
  bookingHours: string;
  privileges: { name: string; allowed: boolean }[];
  bgColor: string;
  textColor: string;
};

const memberships: Membership[] = [
  {
    title: 'Basic',
    description: 'Basic plan with limited privileges',
    price: '30 BYN/month',
    bookingHours: 'Up to 10 hours per month',
    privileges: [
      { name: 'Access to standard parking spots', allowed: true },
      { name: 'Priority support', allowed: false },
      { name: 'Access to VIP zone', allowed: false },
      { name: 'Electrical charging', allowed: false },
    ],
    bgColor: 'bg-gray-200',
    textColor: 'text-gray-800',
  },
  {
    title: 'Premium',
    description: 'Advanced plan with extended privileges',
    price: '90 BYN/month',
    bookingHours: 'Up to 30 hours per month',
    privileges: [
      { name: 'Access to standard parking spots', allowed: true },
      { name: 'Priority support', allowed: true },
      { name: 'Access to VIP zone', allowed: false },
      { name: 'Electrical charging', allowed: false },
    ],
    bgColor: 'bg-blue-200',
    textColor: 'text-blue-800',
  },
  {
    title: 'VIP',
    description: 'Full access to all privileges',
    price: '180 BYN/month',
    bookingHours: 'Unlimited booking hours',
    privileges: [
      { name: 'Access to standard parking spots', allowed: true },
      { name: 'Priority support', allowed: true },
      { name: 'Access to VIP zone', allowed: true },
      { name: 'Electrical charging', allowed: true },
    ],
    bgColor: 'bg-yellow-200',
    textColor: 'text-yellow-800',
  },
];

const Memberships = () => {
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-8 text-center">Choose Your Plan</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {memberships.map((membership, index) => (
          <div
            key={index}
            className={`p-8 rounded-lg shadow-lg ${membership.bgColor} ${membership.textColor} min-h-[400px] flex flex-col justify-between transition-all duration-500 ease-out ${
              animate
                ? `opacity-100 translate-y-0`
                : `opacity-0 translate-y-10`
            }`}
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <h2 className="text-3xl font-bold mb-2">{membership.title}</h2>
            <p className="mb-4">{membership.description}</p>
            <p className="text-lg font-semibold mb-2">Price: {membership.price}</p>
            <p className="text-sm mb-4">Booking Hours: {membership.bookingHours}</p>
            <ul className="space-y-2">
              {membership.privileges.map((privilege, idx) => (
                <li
                  key={idx}
                  className={`${
                    privilege.allowed ? 'text-black' : 'text-gray-400 line-through'
                  }`}
                >
                  {privilege.name}
                </li>
              ))}
            </ul>
            <button className="mt-6 py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-700">
              <Link href = "/payment">
              Choose {membership.title}
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memberships;
