import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  isLoggedIn: boolean;
  profilePicture: string | null;
  username: string | null;
  userId: number | null;
  isAdmin: boolean;  // Добавлено состояние для проверки админа
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
  const [userId, setUserId] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);  // Состояние для админа

  // Проверка токена и установка состояния при монтировании компонента
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Токен найден, проверка...');
      validateToken(token);
    } else {
      console.log('Токен не найден, очистка состояния...');
      setIsLoggedIn(false);
      setUsername(null);
      setProfilePicture(null);
      setIsAdmin(false);  // Обнуляем статус админа
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
        console.log('Ответ от сервера:', response.data);
        setIsLoggedIn(true);
        setUsername(response.data.username);
        setProfilePicture('/prfilePicture.png');
        setUserId(response.data.user_id);
        setIsAdmin(response.data.is_admin);  // Устанавливаем статус админа
        console.log('Статус админа:', response.data.is_admin); // Логируем статус админа
      })
      .catch((error) => {
        console.error('Ошибка при проверке токена на сервере:', error.response || error.message);
        localStorage.removeItem('token');
        setUserId(null);
        setIsLoggedIn(false);
        setUsername(null);
        setProfilePicture(null);
        setIsAdmin(false);  // Обнуляем статус админа
      });
  };

  const login = (token: string) => {
    console.log('Пользователь входит...');
    localStorage.setItem('token', token);
    validateToken(token); // вызываем ту же функцию для проверки токена и установки состояния
  };

  const logout = () => {
    console.log('Пользователь выходит...');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setProfilePicture(null);
    setUsername(null);
    setIsAdmin(false);  // Обнуляем статус админа при выходе
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, profilePicture, username, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
