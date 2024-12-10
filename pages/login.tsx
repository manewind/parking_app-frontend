import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPage, setShowPage] = useState(false); // Для анимации

  // Запускаем анимацию при загрузке компонента
  useEffect(() => {
    const timeout = setTimeout(() => setShowPage(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });

      login(response.data.token);
      router.push('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || 'Не удалось войти');
      } else {
        setError('Произошла ошибка при входе');
      }
    }
  };

  return (
    <div
      className={`container max-w-md mx-auto p-6 transform transition-all duration-500 ${
        showPage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <h2 className="text-2xl mb-4 text-center">Вход</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold">Электронная почта</label>
          <input
            id="email"
            type="email"
            placeholder="Введите вашу электронную почту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold">Пароль</label>
          <input
            id="password"
            type="password"
            placeholder="Введите ваш пароль"
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
          Войти
        </button>
      </form>

      <p className="mt-4 text-center">
        <a href="/forgot-password" className="text-blue-500">
          Забыли пароль?
        </a>
      </p>

      <p className="mt-4 text-center">
        Нет аккаунта?{' '}
        <a href="/register" className="text-blue-500">
          Зарегистрироваться
        </a>
      </p>
    </div>
  );
};

export default Login;
