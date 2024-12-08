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
      alert('Passwords do not match');
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
        alert(`Registration error: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Request error:', error);
      alert('Error connecting to the server');
    }
  };

  return (
    <div
      className={`container max-w-md mx-auto p-6 transform transition-all duration-500 ${
        showPage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <h2 className="text-2xl mb-4 text-center">Registration</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>

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

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{' '}
        <a
          href="/login"
          className="text-blue-500"
        >
          Log in
        </a>
      </p>
    </div>
  );
};

export default Register;
