import React, { useState, useEffect } from 'react';

type Membership = {
  title: string;
  description: string;
  price: string;
  bookingHours: string;
  privileges: { name: string; allowed: boolean }[];
  bgColor: string;
  textColor: string;
};

const Memberships = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);

  useEffect(() => {
    // Получаем абонементы из localStorage
    const savedMemberships = JSON.parse(localStorage.getItem('memberships') || '[]');
    setMemberships(savedMemberships);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-8 text-center">Choose Your Plan</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {memberships.map((membership, index) => (
          <div
            key={index}
            className={`p-8 rounded-lg shadow-lg ${membership.bgColor} ${membership.textColor} min-h-[400px] flex flex-col justify-between`}
          >
            <h2 className="text-3xl font-bold mb-2">{membership.title}</h2>
            <p className="mb-4">{membership.description}</p>
            <p className="text-lg font-semibold mb-2">Price: {membership.price} BYN/Month</p>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memberships;
