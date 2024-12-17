import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/authContext";

interface User {
  id: number;
  username: string;
  email: string;
  vehicles: Vehicle[];
  balance: number;
  membership: Membership | null;

}

interface Vehicle {
  id: number;
  model: string;
  license_plate: string;
  vehicle_type: string;
}

interface Booking {
  id: number;
  spot: number;
  date: string;
  isVIP: boolean;
}

interface Membership {
  id: number;
  membership_name: string;
  start_date: string;
  end_date: string;
  price: number;
  status: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { isAdmin } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!userId) return;
  
    const fetchUserData = async () => {
      try {
        // Запрос на получение информации о пользователе
        const response = await fetch(`http://localhost:8000/user/${userId}`);
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }
        const userData = await response.json();
    
        // Запрос на получение данных об абонементе
        const membershipResponse = await fetch(
          `http://localhost:8000/memberships/${userId}`
        );
        console.log(membershipResponse)
        if (!membershipResponse.ok) {
          throw new Error(
            `Ошибка при получении данных об абонементе: ${membershipResponse.status} ${membershipResponse.statusText}`
          );
        }
        const membershipData = await membershipResponse.json();
    
        // Если абонемент не найден (null или пустой объект), просто устанавливаем null
        const updatedUserData = { ...userData, membership: membershipData || null };
        setUser(updatedUserData);
    
        // Получение данных бронирований
        const bookingsResponse = await fetch(
          `http://localhost:8000/user-bookings/${userId}`
        );
        if (!bookingsResponse.ok) {
          throw new Error(
            `Ошибка при получении бронирований: ${bookingsResponse.status} ${bookingsResponse.statusText}`
          );
        }
        const bookingsData = await bookingsResponse.json();
    
        const formattedBookings = (bookingsData.bookings || []).map((booking: any) => ({
          id: booking.id,
          spot: booking.parking_slot_id,
          date: new Date(booking.start_time).toLocaleString(),
          isVIP: false,
        }));
    
        setBookings(formattedBookings);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    
    
  
    fetchUserData();
  }, [userId]);
  
  

  const handleBalanceTopUp = () => {
    // Логика для обработки пополнения баланса
    router.push('/payment/card');
  };

  return (
    <div className="container mx-auto px-6 py-8 relative">
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          На главную страницу
        </button>
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <img
            src="/prfilePicture.png"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
          />
          <div className="absolute bottom-0 right-0 p-1 bg-blue-500 text-white rounded-full cursor-pointer">
            <FaCamera size={18} />
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{user?.username}</h1>
        <h2 className="text-lg font-semibold ">{user?.email}</h2>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold">{user?.balance} BYN</h2>
          <button
            onClick={handleBalanceTopUp}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Пополнить баланс
          </button>
        </div>
      </div>

      {user?.membership ? (
  <div className="my-6">
    <h2 className="text-2xl font-semibold mb-4">Информация об абонементе</h2>
    <div className="max-w-md p-4 border rounded-lg bg-blue-100 text-black">
      <p className="text-xl font-semibold">
        Название: {user.membership.membership_name}
      </p>
      <p className="text-xl font-semibold">
        Дата покупки: {new Date(user.membership.start_date).toLocaleDateString()}
      </p>
      <p className="text-xl font-semibold">
        Дата окончания: {new Date(user.membership.end_date).toLocaleDateString()}
      </p>
      <p className="text-xl font-semibold">Статус: активен</p>
    </div>
  </div>
) : (
  <div className="my-6">
    <h2 className="text-2xl font-semibold mb-4">Информация об абонементе</h2>
    <p className="text-xl font-semibold text-gray-500">Абонемент не найден.</p>
  </div>
)}

<div className="my-6">
  <h2 className="text-2xl font-semibold mb-4">
    Информация о транспортных средствах
  </h2>
  {user?.vehicles && user.vehicles.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {user.vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className="p-4 border rounded-lg bg-gray-100 text-black"
        >
          <p className="text-xl font-semibold text-black">
            Модель: {vehicle.model}
          </p>
          <p className="text-xl font-semibold text-black">
            Госномер: {vehicle.license_plate}
          </p>
          <p className="text-xl font-semibold text-black">
            Тип: {vehicle.vehicle_type}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">Информация о транспортных средствах отсутствует.</p>
  )}
</div>


<div className="my-6">
  <h2 className="text-2xl font-semibold mb-4">Бронирования</h2>
  {bookings.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="p-4 border rounded-lg bg-gray-100 border-gray-300"
        >
          <div className="flex justify-between items-center">
            <p className="text-xl text-gray-600 font-semibold">
              Место {booking.spot}
            </p>
          </div>
          <p className="text-gray-600">Дата: {booking.date}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-xl text-center text-red-500">Нет бронирований.</p>
  )}
</div>

    </div>
  );
};

export default ProfilePage;
