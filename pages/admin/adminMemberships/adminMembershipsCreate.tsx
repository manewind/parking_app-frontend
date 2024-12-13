import React, { useState } from 'react';
import AdminLayout from "../../../components/adminLayout";

type Privilege = { name: string; allowed: boolean };
type Membership = {
  title: string;
  description: string;
  price: string;
  bookingHours: string;
  privileges: Privilege[];
  bgColor: string;
  textColor: string;
};

const AdminAddMembership = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [bookingHours, setBookingHours] = useState('');
  const [privileges, setPrivileges] = useState<Privilege[]>([
    { name: 'Доступ к обычным парковочным местам', allowed: false },
    { name: 'Приоритетная служба поддержки', allowed: false },
    { name: 'Доступ к VIP местам', allowed: false },
    { name: 'Зарядка', allowed: false },
  ]);
  const [bgColor, setBgColor] = useState('bg-gray-200');
  const [textColor, setTextColor] = useState('text-gray-800');

  const handlePrivilegeChange = (index: number) => {
    const updatedPrivileges = [...privileges];
    updatedPrivileges[index].allowed = !updatedPrivileges[index].allowed;
    setPrivileges(updatedPrivileges);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newMembership: Membership = {
      title,
      description,
      price,
      bookingHours,
      privileges,
      bgColor,
      textColor,
    };

    const existingMemberships = JSON.parse(localStorage.getItem('memberships') || '[]');
    const updatedMemberships = [...existingMemberships, newMembership];
    localStorage.setItem('memberships', JSON.stringify(updatedMemberships));

    alert('Абонемент успешно добавлен!');
    setTitle('');
    setDescription('');
    setPrice('');
    setBookingHours('');
    setPrivileges([
      { name: 'Access to standard parking spots', allowed: false },
      { name: 'Priority support', allowed: false },
      { name: 'Access to VIP zone', allowed: false },
      { name: 'Electrical charging', allowed: false },
    ]);
    setBgColor('bg-gray-200');
    setTextColor('text-gray-800');
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6 bg-gray-800 rounded-lg">
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
              <option value="bg-green-200">Зелёный</option>
              <option value="bg-yellow-200">Жёлтый</option>
              <option value="bg-red-200">Красный</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Цвет текста</label>
            <select
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-black"
            >
              <option value="text-gray-800">Серый</option>
              <option value="text-blue-800">Синий</option>
              <option value="text-green-800">Зелёный</option>
              <option value="text-yellow-800">Жёлтый</option>
              <option value="text-red-800">Красный</option>
              <option value="text-black">Черный</option>
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
    </AdminLayout>
  );
};

export default AdminAddMembership;
