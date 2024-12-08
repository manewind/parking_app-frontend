import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ForgotPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showPage, setShowPage] = useState(false); // Для появления страницы

  // Запускаем анимацию при загрузке компонента
  useEffect(() => {
    const timeout = setTimeout(() => setShowPage(true), 100); // Задержка для активации анимации
    return () => clearTimeout(timeout);
  }, []);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/reset-password', {
        email,
        new_password: newPassword,
      });

      setMessage('Your password has been reset successfully.');
      setError('');
      console.log(response.data);

      setCountdown(3); // Обратный отсчёт перед перенаправлением

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            router.push('/login'); // Перенаправление
            return null;
          }
          return prev! - 1;
        });
      }, 1000);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || 'An error occurred');
      } else {
        setError('An error occurred');
      }
    }
  };

  return (
    <div
      className={`container max-w-md mx-auto p-6 transform transition-all duration-500 ${
        showPage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <h2 className="text-2xl mb-4 text-center">Reset Password</h2>
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-semibold">New Password</label>
          <input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>

        {message && <p className="text-green-500 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Reset Password
        </button>
      </form>

      {countdown !== null && (
        <div className="mt-4 text-center text-gray-700">
          Redirecting to login page in <span className="font-bold">{countdown}</span> seconds...
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
