import React, { useState } from 'react';
import axios from 'axios';

type Privilege = { name: string; allowed: boolean };

const AdminAddMembership = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [bookingHours, setBookingHours] = useState('');
  const [privileges, setPrivileges] = useState<Privilege[]>([
    { name: 'Access to standard parking spots', allowed: false },
    { name: 'Priority support', allowed: false },
    { name: 'Access to VIP zone', allowed: false },
    { name: 'Electrical cahrging', allowed: false },
  ]);

  const [bgColor, setBgColor] = useState('bg-gray-200');
  const [textColor, setTextColor] = useState('text-gray-800');

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newMembership = {
      title,
      description,
      price,
      bookingHours,
      privileges,
      bgColor,
      textColor,
    };

    try {
      // Отправка данных на сервер для добавления абонемента
      await axios.post('/api/memberships', newMembership);
      alert('Абонемент успешно добавлен!');
      // Очистка формы
      setTitle('');
      setDescription('');
      setPrice('');
      setBookingHours('');
      setPrivileges([
        { name: 'Access to standard parking spots', allowed: false },
        { name: 'Priority support', allowed: false },
        { name: 'Access to VIP zone', allowed: false },
      ]);
      setBgColor('bg-gray-200');
      setTextColor('text-gray-800');
    } catch (error) {
      console.error('Ошибка при добавлении абонемента:', error);
      alert('Ошибка при добавлении абонемента.');
    }
  };

  // Обработчик изменения привилегий
  const handlePrivilegeChange = (index: number) => {
    const newPrivileges = [...privileges];
    newPrivileges[index].allowed = !newPrivileges[index].allowed;
    setPrivileges(newPrivileges);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-8 text-center">Добавить новый абонемент</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-2">Название абонемента</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-black"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-black"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Цена</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-black"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Часы бронирования</label>
          <input
            type="text"
            value={bookingHours}
            onChange={(e) => setBookingHours(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-black"
            required
          />
        </div>
        <div>
          <h2 className="font-semibold mb-4">Привилегии</h2>
          {privileges.map((privilege, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={privilege.allowed}
                onChange={() => handlePrivilegeChange(index)}
                className="mr-2"
              />
              <span>{privilege.name}</span>
            </div>
          ))}
        </div>
        <div>
          <label className="block font-medium mb-2">Цвет фона</label>
          <select
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-black"
          >
            <option value="bg-gray-200">Серый</option>
            <option value="bg-blue-200">Синий</option>
            <option value="bg-yellow-200">Желтый</option>
            <option value="text-yellow-800">Фиалетовый</option>
            <option value="text-yellow-800">Зеленый</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-2">Цвет текста</label>
          <select
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-black"
          >
            <option value="text-gray-800">Темный</option>
            <option value="text-blue-800">Синий</option>
            <option value="text-yellow-800">Желтый</option>
            <option value="text-yellow-800">Фиалетовый</option>
            <option value="text-yellow-800">Зеленый</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Добавить абонемент
        </button>
      </form>
    </div>
  );
};

export default AdminAddMembership;
