import React, { useState } from "react";
import { FaCamera, FaStar } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import { useAuth } from "../../contexts/authContext";

interface ParkingHistoryItem {
  id: number;
  spot: number;
  date: string;
  isVIP: boolean;
}

const ProfilePage: React.FC = () => {
  const { isLoggedIn, profilePicture, username, isAdmin } = useAuth(); 
  const [parkingHistory, setParkingHistory] = useState<ParkingHistoryItem[]>([
    {
      id: 1,
      spot: 42,
      date: "2024-12-01",
      isVIP: true,
    },
    {
      id: 2,
      spot: 15,
      date: "2024-12-02",
      isVIP: false,
    },
  ]); // Примеры бронирований

  if (isAdmin) {
    // Если пользователь — администратор
    return (
      <div className="container mx-auto px-6 py-8 flex flex-col items-center">
        <div className="relative">
          <img
            src={profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
          />
        </div>
        <h1 className="text-xl font-bold mt-4">Admin</h1>
      </div>
    );
  }

  // Если пользователь — обычный
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-center mb-8">
        <div className="relative">
          <img
            src={profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
          />
          <div className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full cursor-pointer">
            <FaCamera size={20} />
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{username || "Guest"}</h1>
        <div className="flex justify-center items-center space-x-2 mt-4">
          <HiPhone size={20} />
          <h2 className="text-xl font-semibold">+375296473620</h2>
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Parking History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parkingHistory.map((historyItem) => (
            <div
              key={historyItem.id}
              className={`p-4 border rounded-lg ${
                historyItem.isVIP ? "bg-yellow-100 border-yellow-500" : "bg-gray-100 border-gray-300"
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="text-xl text-gray-600 font-semibold">Spot {historyItem.spot}</p>
                {historyItem.isVIP && <FaStar className="text-yellow-500" />}
              </div>
              <p className="text-gray-600">Date: {historyItem.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
