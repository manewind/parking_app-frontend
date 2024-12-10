import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/authContext';

const Header = () => {
  const { isLoggedIn, logout, isAdmin, userId } = useAuth();  
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowHeader(true);
    }, 200); 
  }, []);

  return (
    <header
      className={`bg-blue-800 text-white p-4 transition-opacity duration-1000 ${
        showHeader ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          MyPark
        </Link>
        <nav className="flex items-center text-lg font-semibold space-x-4">
          <Link href="/memberships" className="hover:text-blue-400">
            Абонементы
          </Link>
          <Link href="/booking" className="hover:text-blue-400">
            Бронирование
          </Link>

          <Link href="/review" className="hover:text-blue-400">
            Отзывы
          </Link>

          {isLoggedIn ? (
            <>
              {isAdmin && (  
                <Link href="/admin/" className="hover:text-blue-400">
                  Панель администратора
                </Link>
              )}
              <button
                onClick={logout}
                className="hover:text-blue-400 text-l font-medium"
              >
                Выйти
              </button>

              <Link href={`/profile/${userId}`}>
                <img
                  src="/prfilePicture.png"
                  alt="Профиль"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-400">
                Войти
              </Link>
              <Link href="/register" className="hover:text-blue-400">
                Зарегистрироваться
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
