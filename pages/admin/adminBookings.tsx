import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/adminLayout";
import axios from "axios";

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
        console.log("Fetching bookings..."); // Лог перед запросом
        const response = await axios.get("http://localhost:8000/allBookings");
        console.log("API response:", response.data); // Лог данных из API
  
        // Извлекаем массив бронирований из ответа
        const bookingsArray = Array.isArray(response.data.bookings) ? response.data.bookings : [];
        console.log("Parsed bookings array:", bookingsArray); // Лог массива бронирований
  
        const normalizedBookings: Booking[] = bookingsArray.map((booking: any) => ({
          id: booking.id,
          userId: booking.user_id,
          username: booking.username || "Unknown User", // Добавляем username (если есть)
          parkingSlot: `Slot ${booking.parking_slot_id}`, // Форматируем поле ParkingSlot
          bookingTime: `${new Date(booking.start_time).toLocaleString()} - ${new Date(booking.end_time).toLocaleString()}`, // Объединяем время
          status: booking.status,
        }));
  
        console.log("Normalized bookings:", normalizedBookings); // Лог нормализованных данных
        setBookings(normalizedBookings);
      } catch (err) {
        console.error("Failed to load bookings:", err); // Лог ошибки
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
        console.log("Fetching complete."); // Лог завершения процесса
      }
    };
  
    fetchBookings();
  }, []);
  
  

  const handleDelete = async (bookingId: number) => {
    try {
      await axios.delete(`http://localhost:8000/user/${bookingId}`); // Замените на ваш API endpoint
      setBookings(bookings.filter((booking) => booking.id !== bookingId)); // Удаление бронирования из списка
    } catch (err) {
      setError("Failed to delete booking");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-center mb-6">Bookings Management</h1>
      {loading && <p className="text-center">Loading bookings...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">All Bookings</h2>
        <div className="overflow-y-auto max-h-96 mt-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Username</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Parking Slot</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Booking Time</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Actions</th>
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
                      onClick={() => handleDelete(booking.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
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
