import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/authContext";

const ReviewForm = () => {
  const { userId, isLoggedIn } = useAuth();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false); // Для анимации формы

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200); // Плавное появление формы

    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/usersReviews");
        setReviews(response.data);
      } catch (err) {
        setError("Ошибка при загрузке отзывов");
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setError("Вы должны быть авторизованы, чтобы оставить отзыв");
      return;
    }

    if (!rating || !comment) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/review", {
        user_id: userId,
        rating,
        comment,
      });
      setSuccess(true);
      setError(null);
      setRating(0);
      setComment("");
      setReviews([response.data, ...reviews]);
    } catch (err) {
      setError("Ошибка при отправке отзыва");
    }
  };

  return (
    <div
      className={`max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 transform transition-all duration-1000 ${
        loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Оставить отзыв</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">Отзыв успешно отправлен!</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Оценка (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div>
          <label className="block text-gray-700">Комментарий:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ваш комментарий"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Отправить отзыв
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Отзывы пользователей:</h3>
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div
                key={index}
                className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm text-black transition-all duration-700 opacity-0 transform translate-y-4"
                style={{ animation: `fadeIn 0.5s ease-in-out ${index * 0.2}s forwards` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-blue-500">Оценка: {review.rating}</span>
                  <span className="text-gray-500 text-sm">Пользователь: {review.username}</span>
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Отзывов пока нет.</p>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ReviewForm;
