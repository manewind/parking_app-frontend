import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo or Title */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">MyPark</h2>
          </div>

          {/* Navigation Links */}
          <div className="mb-6 md:mb-0">
            <ul className="flex space-x-6">
              <li>
                <Link 
                  href="/" 
                  className="hover:text-gray-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="hover:text-gray-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="hover:text-gray-400"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="hover:text-gray-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
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

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MyPark. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
