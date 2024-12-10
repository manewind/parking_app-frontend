import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Логотип или название */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">MyPark</h2>
          </div>

          {/* Навигационные ссылки */}
          <div className="mb-6 md:mb-0">
            <ul className="flex space-x-6">
              <li>
                <Link 
                  href="/" 
                  className="hover:text-gray-400"
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="hover:text-gray-400"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="hover:text-gray-400"
                >
                  Услуги
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="hover:text-gray-400"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Иконки соцсетей */}
          <div className="mb-6 md:mb-0">
            <ul className="flex space-x-4">
              <li>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  <FaFacebook className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MyPark. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
