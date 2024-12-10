// src/components/Memberships.tsx
import React, { useState, useEffect } from 'react';

type Membership = {
  title: string;
  description: string;
  bookingHours: string;
  privileges: { name: string; allowed: boolean }[];
  bgColor: string;
  textColor: string;
};

const Memberships = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [selectedMembership, setSelectedMembership] = useState<Membership | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedMemberships = JSON.parse(localStorage.getItem('memberships') || '[]');
    setMemberships(savedMemberships);
  }, []);

  const handleSelectMembership = (membership: Membership) => {
    setSelectedMembership(membership);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMembership(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-8 text-center">Выберите ваш абонемент</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {memberships.map((membership, index) => (
          <div
            key={index}
            onClick={() => handleSelectMembership(membership)}
            className={`p-8 rounded-lg shadow-lg ${membership.bgColor} ${membership.textColor} min-h-[400px] flex flex-col justify-between cursor-pointer hover:scale-105 transform transition-all`}
          >
            <h2 className="text-3xl font-bold mb-2">{membership.title}</h2>
            <p className="mb-4">{membership.description}</p>
            <p className="text-sm mb-4">Часы бронирования: {membership.bookingHours}</p>
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

      {/* Модальное окно */}
      {isModalOpen && selectedMembership && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-black text-center">
              Вы выбрали абонемент
            </h2>
            <p className="mb-4 text-black text-center">
              <strong>{selectedMembership.title}</strong>
            </p>
            <button
              onClick={handleCloseModal}
              className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Memberships;
