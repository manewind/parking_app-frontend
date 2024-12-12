import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/adminLayout";
import axios from "axios";
import Link from "next/link";

interface Vehicle {
  id: number;
  license_plate: string;
  model: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  vehicles: Vehicle[];
}

const UsersAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getAllUsers");
        console.log(response.data);
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle search input change
  useEffect(() => {
    const results = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleDelete = async (userId: number) => {
    try {
      await axios.delete(`http://localhost:8000/user/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  // Function to convert users data to CSV
  const convertToCSV = (data: User[]) => {
    const header = ["ID", "Username", "Email", "Vehicles"];
    const rows = data.map((user) => {
      const vehicles = user.vehicles
        .map((vehicle) => `${vehicle.model} (${vehicle.license_plate})`)
        .join(", ");
      return [user.id, user.username, user.email, vehicles].join(",");
    });

    return [header.join(","), ...rows].join("\n");
  };

  // Function to trigger CSV download
  const downloadCSV = () => {
    const csvData = convertToCSV(filteredUsers);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-center mb-6">Управление пользователями</h1>
      {loading && <p className="text-center">Загружаем пользователей...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Все Пользователи</h2>
        <input
          type="text"
          placeholder="Поиск по имени пользователя..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mt-4 mb-4 border border-gray-300 rounded-md text-black"
        />
        <div className="overflow-x-auto mt-4">
          <div className="overflow-y-auto max-h-96">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Пользователь</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Почта</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Транспорт</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700">
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      {user.vehicles.length > 0 ? (
                        user.vehicles.map((vehicle) => (
                          <div key={vehicle.id} className="mb-2">
                            <p>Model: {vehicle.model}</p>
                            <p>Plate: {vehicle.license_plate}</p>
                          </div>
                        ))
                      ) : (
                        <p>No vehicles</p>
                      )}
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Удалить
                      </button>
                      <Link
                        href={`/profile/${user.id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Профиль
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          onClick={downloadCSV}
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Скачать в CSV
        </button>
      </div>
    </AdminLayout>
  );
};

export default UsersAdmin;
