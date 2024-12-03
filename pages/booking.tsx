import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa"; 
import axios from "axios";
import { useAuth } from "../contexts/authContext";

interface ISpot {
  id: number,
  isVIP: boolean
}

const parkingSpots: ISpot[] = [
  { id: 1, isVIP: false },
  { id: 2, isVIP: true },
  { id: 3, isVIP: false },
  { id: 4, isVIP: false },
  { id: 5, isVIP: true },
  { id: 6, isVIP: false },
  { id: 7, isVIP: false },
  { id: 8, isVIP: true },
  { id: 9, isVIP: false },
  { id: 10, isVIP: false },
  { id: 11, isVIP: true },
  { id: 12, isVIP: false },
  { id: 13, isVIP: false },
  { id: 14, isVIP: true },
  { id: 15, isVIP: false },
  { id: 16, isVIP: false },
  { id: 17, isVIP: true },
  { id: 18, isVIP: false },
  { id: 19, isVIP: false },
  { id: 20, isVIP: true },
  { id: 21, isVIP: false },
  { id: 22, isVIP: false },
  { id: 23, isVIP: true },
  { id: 24, isVIP: false },
  { id: 25, isVIP: false },
  { id: 26, isVIP: true },
  { id: 27, isVIP: false },
  { id: 28, isVIP: false },
  { id: 29, isVIP: true },
  { id: 30, isVIP: false },
  { id: 31, isVIP: false },
  { id: 32, isVIP: true },
  { id: 33, isVIP: false },
  { id: 34, isVIP: false },
  { id: 35, isVIP: true },
  { id: 36, isVIP: false },
  { id: 37, isVIP: false },
  { id: 38, isVIP: true },
  { id: 41, isVIP: true },
  { id: 42, isVIP: true },
];

const Bookings: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null); // state to track selected spot
  const [pageLoaded, setPageLoaded] = useState(false);
  const [floor, setFloor] = useState(1);
  const [loading, setLoading] = useState(false);;

  const { userId } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 500); // Delay to let the page content load first
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const handleSpotClick = (spotId: number) => {
    // Toggle the selection of the spot
    setSelectedSpot(spotId === selectedSpot ? null : spotId);
  };

  const handleBooking = () => {
    console.log("userId:", userId);
    console.log("selectedSpot:", selectedSpot);
  
    if (userId && selectedSpot) {
      setLoading(true);

      const startTime = new Date().toISOString();  // Текущее время в формате ISO

      // Вычисляем endTime, добавив 5 часов к текущему времени
      const endTime = new Date();
      endTime.setHours(endTime.getHours() + 5);  // Добавляем 5 часов
      const endTimeISO = endTime.toISOString(); 

      axios
        .post("http://localhost:8000/booking", {
          user_id: userId, // ID пользователя
          parking_slot_id: selectedSpot, 
          start_time: startTime, // Текущее время
          end_time: endTimeISO // Выбранное место
        })
        .then((response) => {
          console.log("Бронирование успешно:", response.data);
          alert("Бронирование успешно!");
        })
        .catch((error) => {
          console.error("Ошибка при бронировании:", error.response?.data || error.message);
          if (error.response) {
            console.error("Ответ сервера:", error.response.data);
          }
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
  

  const filterSpots = (spot: ISpot) => {
    if(floor === 1){
      return spot.isVIP
    }
    else return !spot.isVIP
  }

  return (
    <div
      className={`container mx-auto px-4 py-8 transition-opacity duration-700 ease-in-out ${pageLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Page title */}
      <h1 className="text-3xl font-bold text-center mb-6">Booking</h1>
      <p className="text-center text-xl mb-8">Please select a parking spot</p>
      <div className="grid grid-cols-5 gap-4">
        {parkingSpots.filter(filterSpots).map((spot, index) => (
          <div
            key={spot.id}
            className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-500 transform ease-in-out
              ${spot.isVIP ? "bg-yellow-300 border-yellow-500" : "bg-gray-200 border-gray-400"}
              ${selectedSpot === spot.id ? "bg-blue-400 border-blue-600 scale-105" : "opacity-90"}
              animate__animated animate__fadeIn
            `}
            onClick={() => handleSpotClick(spot.id)}
            style={{ animationDelay: `${index * 50}ms` }} // Delay for staggered animation
          >
            {spot.isVIP && (
              <div className="absolute top-2 right-2 text-yellow-500">
                <FaStar size={20} />
              </div>
            )}
            <p className={`text-center font-semibold ${selectedSpot === spot.id ? "text-white" : "text-gray-800"}`}>
              {`Spot ${index+1}`}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col mt-8">
        <div className="flex justify-center gap-4 mb-3">
          <button onClick={() => setFloor(1)} className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition">First floor</button>
          <button onClick={() => setFloor(2)} className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition">Second floor</button>
        </div>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={handleBooking}
          disabled={selectedSpot === null} // Disable button if no spot is selected
        >
          Confirm selection
        </button>
      </div>
    </div>
  );
};

export default Bookings;
