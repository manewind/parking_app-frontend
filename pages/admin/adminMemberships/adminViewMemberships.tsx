import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from "../../../components/adminLayout";

type Privilege = {
  name: string;
  allowed: boolean;
};

type Membership = {
  title: string;
  description: string;
  price: string;
  bookingHours: string;
  privileges: Privilege[];
  bgColor: string;
  textColor: string;
};

const AdminViewMemberships = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedMemberships = JSON.parse(localStorage.getItem('memberships') || '[]');
    setMemberships(storedMemberships);
  }, []);

  const handleDelete = (index: number) => {
    const updatedMemberships = memberships.filter((_, i) => i !== index);
    setMemberships(updatedMemberships);
    localStorage.setItem('memberships', JSON.stringify(updatedMemberships));
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6 bg-gray-800 rounded-lg">
        <h1 className="text-3xl font-semibold mb-8 text-center">Все абонементы</h1>
        <div className="space-y-6">
          {memberships.map((membership, index) => (
            <div key={index} className={`p-4 rounded-lg ${membership.bgColor}`}>
              <h2 className={`font-semibold ${membership.textColor}`}>{membership.title}</h2>
              <p className='text-black'>{membership.description}</p>
              <p className='text-black'>Цена: {membership.price}</p>
              <p className='text-black'>Часы бронирования: {membership.bookingHours}</p>
              <div>
                <h3 className="font-medium text-black">Привилегии:</h3>
                <ul>
                  {membership.privileges.map((privilege, idx) => (
                    <li key={idx} className={privilege.allowed ? 'text-green-600' : 'text-red-600'}>
                      {privilege.name} {privilege.allowed ? '(Доступно)' : '(Недоступно)'}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => handleDelete(index)}
                  className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => router.push('/admin/adminMemberships/adminMembershipsCreate')}
          className="mt-6 w-full py-3 px-6 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Добавить новый абонемент
        </button>
      </div>
    </AdminLayout>
  );
};

export default AdminViewMemberships;
