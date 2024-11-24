import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  isLoggedIn: boolean;
  profilePicture: string | null;
  username: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Проверка токена и установка состояния при монтировании компонента
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Проверка токена на сервере
      validateToken(token);
    } else {
      // Если токена нет, то явно сбрасываем состояние
      setIsLoggedIn(false);
      setUsername(null);
      setProfilePicture(null);
    }
  }, []);

  // Функция проверки токена
  const validateToken = (token: string) => {
    axios
      .get('http://localhost:8000/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsLoggedIn(true);
        setUsername(response.data.username);
        setProfilePicture('/prfilePicture.png');
      })
      .catch((error) => {
        console.error('Ошибка при проверке токена на сервере:', error);
        // Если ошибка - удаляем токен и сбрасываем состояние
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUsername(null);
        setProfilePicture(null);
      });
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    validateToken(token); // вызываем ту же функцию для проверки токена и установки состояния
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setProfilePicture(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, profilePicture, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
