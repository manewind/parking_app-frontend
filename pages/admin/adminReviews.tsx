import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/adminLayout";
import axios from "axios";
import Link from "next/link";

interface Review {
  id: number;
  userId: number;
  username: string;
  comment: string;
  rating: number;
}

const ReviewsAdmin: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/usersReviews"); // Замените на ваш API endpoint
        setReviews(response.data);
      } catch (err) {
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (reviewId: number) => {
    try {
      await axios.delete(`/api/admin/reviews/${reviewId}`); // Замените на ваш API endpoint
      setReviews(reviews.filter((review) => review.id !== reviewId)); // Удаление отзыва из списка
    } catch (err) {
      setError("Failed to delete review");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-center mb-6">Reviews Management</h1>
      {loading && <p className="text-center">Loading reviews...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">All Reviews</h2>
        <div className="overflow-y-auto max-h-96 mt-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Username</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Comment</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Rating</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Actions</th>
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
                      onClick={() => handleDelete(review.id)}
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

export default ReviewsAdmin;
