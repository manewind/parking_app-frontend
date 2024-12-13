// src/components/Memberships.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';

type Membership = {
  title: string;
  description: string;
  bookingHours: string;
  privileges: { name: string; allowed: boolean }[];
  bgColor: string;
  textColor: string;
  price: number; // Добавлено поле для цены
};

const Memberships = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [selectedMembership, setSelectedMembership] = useState<Membership | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>(''); // Состояние для сообщения об ошибке

  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/${userId}`);
        if (response.status === 200) {
          const userData = response.data;
          setBalance(userData.balance);
        }
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
      }
    };

    fetchUserData();

    const savedMemberships = JSON.parse(localStorage.getItem('memberships') || '[]');
    setMemberships(savedMemberships);
  }, [userId]);

  const handleSelectMembership = (membership: Membership) => {
    setSelectedMembership(membership);
    setErrorMessage(''); // Сброс сообщения об ошибке
    setIsConfirmModalOpen(true);
  };

  const handleCancel = () => {
    setIsConfirmModalOpen(false);
    setSelectedMembership(null);
    setErrorMessage('');
  };

  const handleConfirm = async () => {
    if (!selectedMembership || !userId) return;

    // Проверяем, хватает ли баланса
    if (balance < selectedMembership.price) {
      setErrorMessage('Недостаточно средств для покупки этого абонемента.');
      return;
    }

    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 30);

    const membershipData = {
      user_id: userId,
      membership_name: selectedMembership.title,
      start_date: currentDate.toISOString(),
      end_date: endDate.toISOString(),
      price: Number(selectedMembership.price), // Преобразуем в число
      status: 'активен',
      description: selectedMembership.description,
      booking_hours: selectedMembership.bookingHours, // Преобразуем в число
    };

    try {
      console.log('Отправляемые данные:', membershipData);
      const response = await axios.post('http://localhost:8000/addMembership', membershipData);

      if (response.status === 200) {
        console.log('Абонемент успешно добавлен');
        setBalance((prevBalance) => prevBalance - selectedMembership.price); // Обновляем баланс
        setIsConfirmModalOpen(false);
      } else {
        console.error('Ошибка при добавлении абонемента');
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-8 text-center">Выберите ваш абонемент</h1>

      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Ваш баланс: {balance} BYN</h2>
      </div>

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
            <p className="text-lg font-semibold mb-4">Цена: {membership.price} BYN</p>
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

      {isConfirmModalOpen && selectedMembership && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-black text-center">
              Вы уверены, что хотите приобрести абонемент?
            </h2>
            <p className="mb-4 text-black text-center">
              <strong>{selectedMembership.title}</strong>
            </p>
            {errorMessage && (
              <p className="text-red-500 text-center mb-4">{errorMessage}</p>
            )}
            <div className="flex justify-around">
              <button
                onClick={handleConfirm}
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Да
              </button>
              <button
                onClick={handleCancel}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Memberships;