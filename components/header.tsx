import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/authContext';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    console.log('Auth state changed:', isLoggedIn); 
  }, [isLoggedIn]);

  return (
    <header className="bg-blue-800 text-white p-4">
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

          {isLoggedIn ? (
            <>
              <button
                onClick={logout}
                className="hover:text-blue-400 text-l font-medium"
              >
                Logout
              </button>

              {/* Статическая картинка профиля, заменяем на "profilePicture.png" */}
              <Link href="/profile">
                
                  <img
                    src="/prfilePicture.png" // Указание статического пути к картинке
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
