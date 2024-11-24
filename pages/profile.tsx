import React, { useState, useEffect } from "react";
import { FaCamera, FaStar } from "react-icons/fa"; // Icons for photo and VIP spots
import { HiPhone } from "react-icons/hi"; // Phone icon

interface ParkingHistoryItem {
  id: number;
  spot: number;
  date: string;
  isVIP: boolean;
}

const userProfileData = {
  name: "John Doe",
  email: "johndoe@example.com",
  phone: "+1234567890",
  profilePicture: "https://www.example.com/path/to/profile-picture.jpg", // Example image URL
};

const parkingHistory: ParkingHistoryItem[] = [
  { id: 1, spot: 12, date: "2024-10-15", isVIP: true },
  { id: 2, spot: 8, date: "2024-10-14", isVIP: false },
  { id: 3, spot: 21, date: "2024-10-13", isVIP: true },
  { id: 4, spot: 3, date: "2024-10-10", isVIP: false },
];

const ProfilePage: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string>(userProfileData.profilePicture);
  const [phone, setPhone] = useState<string>(userProfileData.phone);

  useEffect(() => {
    // Simulate fetching user profile data (e.g., from an API or local storage)
    // Set initial profile data like name, email, phone, etc.
  }, []);

  const handleProfilePicChange = () => {
    const newProfilePic = prompt("Enter a new profile picture URL:", profilePic);
    if (newProfilePic) {
      setProfilePic(newProfilePic);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-center mb-8">
        <div className="relative">
          <img
            src="prfilePicture.png"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
          />
          <div
            onClick={handleProfilePicChange}
            className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full cursor-pointer"
          >
            <FaCamera size={20} />
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{userProfileData.name}</h1>
        <p className="text-xl text-gray-500">{userProfileData.email}</p>
        <div className="flex justify-center items-center space-x-2 mt-4">
          <HiPhone size={20} />
          <p className="text-lg">{phone}</p>
        </div>
      </div>

      {/* Parking History */}
      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Parking History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parkingHistory.map((historyItem) => (
            <div
              key={historyItem.id}
              className={`p-4 border rounded-lg ${historyItem.isVIP ? "bg-yellow-100 border-yellow-500" : "bg-gray-100 border-gray-300"}`}
            >
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">Spot {historyItem.spot}</p>
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
