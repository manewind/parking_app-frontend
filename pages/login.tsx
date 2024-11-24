import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    console.log('Attempting login with email:', email); // Логируем email перед отправкой

    try {
      // Отправляем запрос на сервер для получения токена
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password: password,
      });

      console.log('Login successful, token received:', response.data.token); // Логируем успешный ответ

      // Сохраняем токен в localStorage (или sessionStorage)
      localStorage.setItem('token', response.data.token);

      // Напрямую "авторизуем" пользователя
      // Сохраняем токен и предполагаем, что он будет использоваться на всех страницах
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      // Перенаправляем пользователя на главную страницу
      router.push('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || 'Login failed');
        console.error('Axios error during login:', err.response.data);
      } else {
        setError('An error occurred during login');
        console.error('General error during login:', err);
      }
    }
  };

  return (
    <div className="container max-w-md mx-auto p-6">
      <h2 className="text-2xl mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
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
          <label htmlFor="password" className="block text-sm font-semibold">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Log in
        </button>
      </form>

      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-500">
          Register
        </a>
      </p>
    </div>
  );
};

export default Login;
