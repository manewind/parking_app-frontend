import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/adminLayout";
import axios from "axios";
import * as XLSX from "xlsx";

interface Booking {
  id: number;
  userId: number;
  username: string;
  parkingSlot: string;
  bookingTime: string;
  status: string;
}

const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8000/allBookings");
        const bookingsArray = Array.isArray(response.data.bookings)
          ? response.data.bookings
          : [];

        const normalizedBookings: Booking[] = bookingsArray.map(
          (booking: any) => ({
            id: booking.id,
            userId: booking.user_id,
            username: booking.username || "Unknown User",
            parkingSlot: `Slot ${booking.parking_slot_id}`,
            bookingTime: `${new Date(
              booking.start_time
            ).toLocaleString()} - ${new Date(
              booking.end_time
            ).toLocaleString()}`,
            status: booking.status,
          })
        );

        setBookings(normalizedBookings);
      } catch (err) {
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (userId: number, bookingId: number) => {
    try {
      await axios.delete(
        `http://localhost:8000/delete/${userId}/booking/${bookingId}`
      );
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
    } catch (err) {
      setError("Failed to delete booking");
    }
  };

  // Convert bookings data to CSV format
  const convertToCSV = (data: Booking[]): string => {
    const header = "id,username,parkingSlot,bookingTime,status";
    const rows = data.map(
      (booking) =>
        `${booking.id},${booking.username},${booking.parkingSlot},${booking.bookingTime},${booking.status}`
    );
    return [header, ...rows].join("\n");
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(bookings);
    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "bookings.csv";
    link.click();
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(bookings);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
    XLSX.writeFile(workbook, "bookings.xlsx");
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-center mb-6">
        Управление бронированиями
      </h1>
      {loading && <p className="text-center">Загрузка бронирований...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Все бронирования</h2>
        <div className="flex space-x-4 mt-4 mb-4">
          <button
            onClick={downloadCSV}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Скачать в CSV
          </button>
          <button
            onClick={downloadExcel}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Скачать в Excel
          </button>
        </div>
        <div className="overflow-y-auto max-h-96 mt-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                  Пользователь
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                  Парковочное место
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                  Время брони
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{booking.username}</td>
                  <td className="px-4 py-2">{booking.parkingSlot}</td>
                  <td className="px-4 py-2">{booking.bookingTime}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleDelete(booking.userId, booking.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBookings;
