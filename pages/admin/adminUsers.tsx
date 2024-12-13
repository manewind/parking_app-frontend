import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/adminLayout";
import axios from "axios";
import Link from "next/link";
import * as XLSX from "xlsx";

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
  const [file, setFile] = useState<File | null>(null); // Состояние для выбранного файла

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getAllUsers");
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

  // Function to convert data to Excel and download it
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredUsers.map((user) => ({
        ID: user.id,
        Username: user.username,
        Email: user.email,
        Vehicles: user.vehicles
          .map((vehicle) => `${vehicle.model} (${vehicle.license_plate})`)
          .join(", "),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users.xlsx");
  };

  // Function to convert data to CSV and download it
  const downloadCSV = () => {
    const csvData = [
      ["ID", "Username", "Email", "Vehicles"],
      ...filteredUsers.map((user) => [
        user.id,
        user.username,
        user.email,
        user.vehicles.map((vehicle) => `${vehicle.model} (${vehicle.license_plate})`).join(", "),
      ]),
    ];

    const csvContent = csvData
      .map((row) => row.map((value) => `"${value}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Функция отправки файла на сервер
  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        await axios.post("http://localhost:8000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Файл успешно загружен!");
      } catch (err) {
        alert("Ошибка при загрузке файла");
      }
    } else {
      alert("Пожалуйста, выберите файл для загрузки");
    }
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
        <div className="flex space-x-4 mt-4">
          <button
            onClick={downloadExcel}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Скачать в Excel
          </button>
          <button
            onClick={downloadCSV}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Скачать в CSV
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersAdmin;
