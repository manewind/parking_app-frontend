import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import moment from 'moment';
import { AxiosError } from 'axios';

interface ISpot {
  id: number;
  isVIP: boolean;
  floor: number;
}

interface Booking {
  id: number;
  userId: number;
  username: string;
  parkingSlot: string;
  bookingTime: string;
  status: string;
  startTime: string;
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
  const [bookedSpots, setBookedSpots] = useState<number[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const { userId } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8000/memberships/${userId}`)
        .then((response) => {
          const membership = response.data; // Получаем весь объект абонемента
          const membershipName = membership.membership_name || "Неизвестный";
          console.log("Полученные данные о членстве пользователя:", membership);
          setUserMembership(membershipName);
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            console.error("Ошибка при получении данных о членстве пользователя:", error.response.data);
          } else if (error.request) {
            console.error("Ошибка при получении данных: нет ответа от сервера", error.request);
          } else {
            console.error("Ошибка при настройке запроса:", error.message);
          }
          setUserMembership(null);
        });
    }
  
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8000/allBookings");
        console.log("Полученные данные о бронированиях:", response.data);
  
        const bookingsArray = Array.isArray(response.data.bookings) ? response.data.bookings : [];
  
        const normalizedBookings: Booking[] = bookingsArray
          .filter((booking: any) => moment(booking.start_time).isAfter(moment())) // Фильтрация по дате
          .map((booking: any) => ({
            id: booking.id,
            userId: booking.user_id,
            username: booking.username || "Неизвестный пользователь",
            parkingSlot: `Место ${booking.parking_slot_id || "N/A"}`,
            bookingTime: `${moment(booking.start_time).format("MMMM Do YYYY, h:mm:ss a")} - ${moment(booking.end_time).format("MMMM Do YYYY, h:mm:ss a")}`,
            status: booking.status || "неизвестен",
            startTime: booking.start_time,
          }));
  
        setBookings(normalizedBookings);
  
        const bookedSlots = bookingsArray.map((booking: any) => booking.parking_slot_id).filter(Boolean);
        setBookedSpots(bookedSlots);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error("Ошибка при получении данных о бронированиях:", err.response?.data);
        } else {
          console.error("Ошибка при настройке запроса:", err instanceof Error ? err.message : err);
        }
      }
    };
  
    fetchBookings();
  }, [userId]);
  
  

  const handleSpotClick = (spotId: number, isVIP: boolean) => {
    console.log(`Clicked spot ID: ${spotId}, isVIP: ${isVIP}, User Membership: ${userMembership}`);
    console.log(`Selected spot: ${selectedSpot}, Booked spots: ${bookedSpots}`);
    if (bookedSpots.includes(spotId)) {
      alert("Это место уже забронировано.");
      return;
    }
  
    if (isVIP && userMembership?.toLowerCase() !== "vip") {
      alert("Вы не можете забронировать это VIP-место.");
      return;
    }
    
    setSelectedSpot(spotId === selectedSpot ? null : spotId);
  };

  const handleBooking = () => {
  if (!userMembership) {
    alert("У вас нет абонемента. Пожалуйста, приобретите абонемент для бронирования места.");
    return;
  }

  // Проверка, что пользователь не забронировал уже место
  if (bookedSpots.length > 0) {
    alert("Вы уже забронировали место. Только одно место можно забронировать.");
    return;
  }

  if (userId && selectedSpot) {
    setLoading(true);

    const startTime = moment().toISOString();
    const endTime = moment().add(5, "hours").toISOString();

    setBookedSpots((prev) => [...prev, selectedSpot]);

    axios
      .post("http://localhost:8000/booking", {
        user_id: userId,
        parking_slot_id: selectedSpot,
        start_time: startTime,
        end_time: endTime,
        status: "pending",
      })
      .then((response) => {
        setBookings((prevBookings) => [
          ...prevBookings,
          {
            id: response.data.id,
            userId: response.data.user_id,
            username: response.data.username || "Unknown User",
            parkingSlot: `Slot ${response.data.parking_slot_id}`,
            bookingTime: `${moment(response.data.start_time).format("MMMM Do YYYY, h:mm:ss a")} - ${moment(response.data.end_time).format("MMMM Do YYYY, h:mm:ss a")}`,
            status: response.data.status,
            startTime: response.data.start_time,
          },
        ]);

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

  

  const floorSpots = parkingSpots.filter(spot => spot.floor === floor);

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
      ${selectedSpot === spot.id ? "bg-blue-400 border-blue-600 scale-105" : "opacity-90"}
      ${bookedSpots.includes(spot.id)
        ? spot.isVIP
          ? "bg-yellow-400 border-yellow-600 opacity-70" // Добавить измененный стиль для забронированных VIP-мест
          : "bg-gray-400 border-gray-600 opacity-70"
        : ""}`}
    onClick={() => handleSpotClick(spot.id, spot.isVIP)}
    style={{ animationDelay: `${index * 50}ms` }}
  >
    {spot.isVIP && (
      <div className="absolute top-2 right-2 text-yellow-500">
        <FaStar size={20} />
      </div>
    )}
    <p className={`text-center font-semibold ${selectedSpot === spot.id ? "text-white" : "text-gray-800"}`}>
      {`Место ${spot.id}`}
    </p>
  </div>
))}


      </div>
      {selectedSpot && (
  <div className="text-center mt-4">
    <button
      onClick={handleBooking}
      disabled={loading}
      className={`bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Обработка..." : "Забронировать место"}
    </button>
  </div>
)}
        <div className="text-center my-4">
          {userMembership ? (
            <p className="text-green-600">Ваш абонемент: {userMembership}</p>
          ) : (
            <p className="text-red-600">У вас нет активного абонемента.</p>
          )}
        </div>

      <div className="flex flex-col mt-8">
        <div className="flex justify-center gap-4 mb-3">
          <button onClick={() => setFloor(1)} className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition">Первый этаж</button>
          <button onClick={() => setFloor(2)} className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition">Второй этаж</button>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
