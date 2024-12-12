import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../contexts/authContext";

interface ISpot {
  id: number,
  isVIP: boolean,
  floor: number, // Добавим этаж для каждого места
}

const parkingSpots: ISpot[] = [
  { id: 1, isVIP: true, floor: 1 },
  { id: 2, isVIP: true, floor: 1 },
  { id: 3, isVIP: true, floor: 1 },
  { id: 4, isVIP: true, floor: 1 },
  { id: 5, isVIP: true, floor: 1 },
  { id: 6, isVIP: true, floor: 1 },
  { id: 7, isVIP: true, floor: 1 },
  { id: 8, isVIP: true, floor: 1 },
  { id: 9, isVIP: true, floor: 1 },
  { id: 10, isVIP: true, floor: 1 },
  { id: 11, isVIP: false, floor: 2 },
  { id: 12, isVIP: false, floor: 2 },
  { id: 13, isVIP: false, floor: 2 },
  { id: 14, isVIP: false, floor: 2 },
  { id: 15, isVIP: false, floor: 2 },
  { id: 16, isVIP: false, floor: 2 },
  { id: 17, isVIP: false, floor: 2 },
  { id: 18, isVIP: false, floor: 2 },
  { id: 19, isVIP: false, floor: 2 },
  { id: 20, isVIP: false, floor: 2 },
  { id: 21, isVIP: false, floor: 2 },
  { id: 22, isVIP: false, floor: 2 },
  { id: 23, isVIP: false, floor: 2 },
  { id: 24, isVIP: false, floor: 2 },
  { id: 25, isVIP: false, floor: 2 },
  { id: 26, isVIP: false, floor: 2 },
  { id: 27, isVIP: false, floor: 2 },
  { id: 28, isVIP: false, floor: 2 },
  { id: 29, isVIP: false, floor: 2 },
  { id: 30, isVIP: false, floor: 2 },
  { id: 31, isVIP: false, floor: 2 },
  { id: 32, isVIP: false, floor: 2 },
  { id: 33, isVIP: false, floor: 2 },
  { id: 34, isVIP: false, floor: 2 },
  { id: 35, isVIP: false, floor: 2 },
  { id: 36, isVIP: false, floor: 2 },
  { id: 37, isVIP: false, floor: 2 },
  { id: 38, isVIP: false, floor: 2 },
  { id: 41, isVIP: false, floor: 2 },
  { id: 42, isVIP: false, floor: 2 },
];

const Bookings: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [floor, setFloor] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userMembership, setUserMembership] = useState<string | null>(null);

  const { userId } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 500); // Задержка для загрузки контента
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8000/user/${userId}`)
        .then((response) => {
          const membershipName = response.data.membership?.membership_name;
          setUserMembership(membershipName);
        })
        .catch((error) => {
          console.error("Ошибка при получении данных пользователя:", error);
          setUserMembership(null);
        });
    }
  }, [userId]);

  const handleSpotClick = (spotId: number, isVIP: boolean) => {
    // Если пользователь VIP, позволяет выбирать все места, но при клике на VIP-место уведомляем
    if (userMembership && userMembership.toLowerCase() === "vip" || !isVIP) {
      setSelectedSpot(spotId === selectedSpot ? null : spotId);
    } else {
      // Если место VIP и пользователь не VIP, выводим сообщение
      alert("Вы не можете забронировать это VIP-место.");
    }
  };

  const handleBooking = () => {
    if (userId && selectedSpot) {
      setLoading(true);

      const startTime = new Date().toISOString();
      const endTime = new Date();
      endTime.setHours(endTime.getHours() + 5);
      const endTimeISO = endTime.toISOString();

      axios
        .post("http://localhost:8000/booking", {
          user_id: userId,
          parking_slot_id: selectedSpot,
          start_time: startTime,
          end_time: endTimeISO
        })
        .then((response) => {
          console.log("Бронирование успешно:", response.data);
          alert("Бронирование успешно!");
        })
        .catch((error) => {
          console.error("Ошибка при бронировании:", error.response?.data || error.message);
          alert("Не удалось выполнить бронирование.");
        })
        .finally(() => {
          setLoading(false);
          setSelectedSpot(null);
        });
    } else {
      console.error("Пользователь не залогинен или место не выбрано.");
      alert("Выберите место для бронирования.");
    }
  };

  const floorSpots = parkingSpots.filter(spot => spot.floor === floor); // Фильтруем места по этажу

  return (
    <div className={`container mx-auto px-4 py-8 transition-opacity duration-700 ease-in-out ${pageLoaded ? "opacity-100" : "opacity-0"}`}>
      <h1 className="text-3xl font-bold text-center mb-6">Бронирование</h1>
      <p className="text-center text-xl mb-8">Пожалуйста, выберите место для парковки</p>
      <div className="grid grid-cols-5 gap-4">
        {floorSpots.map((spot, index) => (
          <div
            key={spot.id}
            className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-500 transform ease-in-out
              ${spot.isVIP ? "bg-yellow-300 border-4 border-yellow-500" : "bg-gray-200 border-gray-400"}
              ${selectedSpot === spot.id ? "bg-blue-400 border-blue-600 scale-105" : "opacity-90"}`}
            onClick={() => handleSpotClick(spot.id, spot.isVIP)}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {spot.isVIP && (
              <div className="absolute top-2 right-2 text-yellow-500">
                <FaStar size={20} />
              </div>
            )}
            <p className={`text-center font-semibold ${selectedSpot === spot.id ? "text-white" : "text-gray-800"}`}>
              {`Место ${index + 1}`}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col mt-8">
        <div className="flex justify-center gap-4 mb-3">
          <button onClick={() => setFloor(1)} className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition">Первый этаж</button>
          <button onClick={() => setFloor(2)} className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition">Второй этаж</button>
        </div>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={handleBooking}
          disabled={selectedSpot === null || !userMembership}
        >
          Подтвердить выбор
        </button>
      </div>
    </div>
  );
};

export default Bookings;
