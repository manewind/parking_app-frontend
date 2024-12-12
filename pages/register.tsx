import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPage, setShowPage] = useState(false);

  // Запускаем анимацию при загрузке компонента
  useEffect(() => {
    const timeout = setTimeout(() => setShowPage(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/register', {
        username: name,
        email,
        password,
      });

      if (response.status === 200) {
        router.push('/login');
      } else {
        alert(`Ошибка регистрации: ${response.data.message || 'Неизвестная ошибка'}`);
      }
    } catch (error) {
      console.error('Ошибка запроса:', error);
      alert('Ошибка подключения к серверу');
    }
  };

  return (
    <div
      className={`container max-w-md mx-auto p-6 transform transition-all duration-500 ${
        showPage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <h2 className="text-2xl mb-4 text-center">Регистрация</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold">Имя</label>
          <input
            id="name"
            type="text"
            placeholder="Введите ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>

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

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold">Подтвердите пароль</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Подтвердите ваш пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Зарегистрироваться
        </button>
      </form>

      <p className="mt-4 text-center">
        Уже есть аккаунт?{' '}
        <a
          href="/login"
          className="text-blue-500"
        >
          Войти
        </a>
      </p>
    </div>
  );
};

export default Register;
