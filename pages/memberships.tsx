// src/components/Memberships.tsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';  // Подключение контекста для получения userId

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
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);  // Модалка подтверждения
  const [balance, setBalance] = useState<number>(0);  // Состояние для хранения баланса пользователя

  const { userId } = useAuth();  // Получение userId из контекста

  useEffect(() => {
    if (!userId) return;

    // Запрос для получения данных пользователя
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/${userId}`);
        if (response.status === 200) {
          const userData = response.data;
          setBalance(userData.balance);  // Записываем баланс в состояние
        }
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
      }
    };

    fetchUserData();

    // Загрузка абонементов из localStorage
    const savedMemberships = JSON.parse(localStorage.getItem('memberships') || '[]');
    setMemberships(savedMemberships);
  }, [userId]);

  const handleSelectMembership = (membership: Membership) => {
    setSelectedMembership(membership);
    setIsConfirmModalOpen(true);  // Открыть модалку подтверждения
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMembership(null);
  };

  const handleCancel = () => {
    setIsConfirmModalOpen(false);  // Закрыть модалку подтверждения
    setSelectedMembership(null);
  };

  const handleConfirm = async () => {
    if (!selectedMembership || !userId) return;

    // Получаем текущую дату
    const currentDate = new Date();
    
    // Устанавливаем дату окончания через 30 дней от текущей
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 30);

    const membershipData = {
      user_id: userId,  // Добавляем user_id
      membership_name: selectedMembership.title,  // Название абонемента
      start_date: currentDate.toISOString(),  // Текущая дата начала
      end_date: endDate.toISOString(),  // Дата окончания через 30 дней
      price: 100,  // Примерная цена абонемента, можно передать из данных
      status: 'active',  // Статус абонемента
      description: selectedMembership.description,  // Описание абонемента
      booking_hours: selectedMembership.bookingHours,  // Часы бронирования
    };

    try {
      // Отправляем POST запрос для добавления абонемента
      const response = await axios.post('http://localhost:8000/addMembership', membershipData);

      if (response.status === 200) {
        console.log('Абонемент успешно добавлен');
        setIsConfirmModalOpen(false);  // Закрыть модалку
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

      {/* Отображаем баланс пользователя */}
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

      {/* Модальное окно с подтверждением */}
      {isConfirmModalOpen && selectedMembership && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-black text-center">
              Вы уверены, что хотите приобрести абонемент?
            </h2>
            <p className="mb-4 text-black text-center">
              <strong>{selectedMembership.title}</strong>
            </p>
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
