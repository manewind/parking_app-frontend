import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/adminLayout";
import axios from "axios";
import * as XLSX from "xlsx"; // Импорт библиотеки для работы с Excel
import FileUploader from "../../components/uploadFile";

interface Review {
  id: number;
  user_id: number;
  username: string;
  comment: string;
  rating: number;
}

const ReviewsAdmin: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/usersReviews");
        console.log(response.data)
        setReviews(response.data);
      } catch (err) {
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const sortReviews = (order: "asc" | "desc") => {
    const sortedReviews = [...reviews].sort((a, b) =>
      order === "asc" ? a.rating - b.rating : b.rating - a.rating
    );
    setReviews(sortedReviews);
  };

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
    sortReviews(order);
  };

  const handleDelete = async (userId: number, reviewId: number) => {
    try {
      await axios.delete(
        `http://localhost:8000/delete/${userId}/review/${reviewId}`
      );
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (err) {
      setError("Failed to delete review");
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(reviews); // Преобразование данных в лист
    const workbook = XLSX.utils.book_new(); // Создание новой книги
    XLSX.utils.book_append_sheet(workbook, worksheet, "Отзывы"); // Добавление листа
    XLSX.writeFile(workbook, "reviews.xlsx"); // Сохранение файла
  };

  const convertToCSV = (data: Review[]): string => {
    const header = "id,username,comment,rating";
    const rows = data.map(
      (review) =>
        `${review.id},${review.username},${review.comment},${review.rating}`
    );
    return [header, ...rows].join("\n");
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(reviews);
    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "reviews.csv"; // Имя файла
    link.click();
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-center mb-6">
        Управление отзывами
      </h1>
      {loading && <p className="text-center">Загрузка отзывов...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Все отзывы</h2>
        <div className="flex justify-between items-center">
          <button
            onClick={() => handleSortChange("asc")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
          >
            Сортировать по возрастанию
          </button>
          <button
            onClick={() => handleSortChange("desc")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
          >
            Сортировать по убыванию
          </button>
          <div className="space-x-4 mt-4">
            <button
              onClick={downloadExcel}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Скачать в Excel
            </button>
            <button
              onClick={downloadCSV}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Скачать в CSV
            </button>
          </div>
        </div>
        <div className="overflow-y-auto max-h-96 mt-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                  Пользователь
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                  Комментарий
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                  Рейтинг
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{review.username}</td>
                  <td className="px-4 py-2">{review.comment}</td>
                  <td className="px-4 py-2">{review.rating}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleDelete(review.user_id, review.id)}
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
        <FileUploader></FileUploader>
      </div>
    </AdminLayout>
  );
};

export default ReviewsAdmin;
