import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/authContext';

const Header = () => {
  const { isLoggedIn, logout, isAdmin } = useAuth();  // Используем isAdmin
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    // Плавное появление хедера через время
    setTimeout(() => {
      setShowHeader(true);
    }, 200); // Делаем задержку, чтобы хедер постепенно появлялся
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
            Memberships
          </Link>
          <Link href="/booking" className="hover:text-blue-400">
            Booking
          </Link>

          <Link href="/review" className="hover:text-blue-400">
            Reviews
          </Link>

          {isLoggedIn ? (
            <>
              {isAdmin && (  
                <Link href="/admin/" className="hover:text-blue-400">
                  Admin Panel
                </Link>
              )}
              <button
                onClick={logout}
                className="hover:text-blue-400 text-l font-medium"
              >
                Logout
              </button>

              <Link href="/profile">
                <img
                  src="/prfilePicture.png"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-400">
                Login
              </Link>
              <Link href="/register" className="hover:text-blue-400">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
