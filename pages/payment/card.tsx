import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext'; // Импорт вашего AuthProvider
import axios from 'axios';

const PaymentPage: React.FC = () => {
  const { userId } = useAuth(); // Достаем userId из контекста

  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const [errors, setErrors] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    amount: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
    const newErrors = {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
      amount: '',
    };

    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumber || !cardNumberRegex.test(cardNumber)) {
      newErrors.cardNumber = 'Номер карты должен содержать 16 цифр';
    }

    const cardHolderRegex = /^[A-Za-z\s]+$/;
    if (!cardHolder || !cardHolderRegex.test(cardHolder)) {
      newErrors.cardHolder = 'Имя и фамилия должны содержать только буквы';
    }

    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryDate || !expiryDateRegex.test(expiryDate)) {
      newErrors.expiryDate = 'Срок действия должен быть в формате MM/YY';
    }

    const cvvRegex = /^\d{3}$/;
    if (!cvv || !cvvRegex.test(cvv)) {
      newErrors.cvv = 'CVV должен содержать 3 цифры';
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Введите корректную сумму';
    }

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      try {
        const response = await axios.post('http://localhost:8000/add-balance', {
          user_id: userId,
          amount,
        });
        console.log('Ответ сервера:', response.data);
        alert('Платеж успешно выполнен');
      } catch (error) {
        console.error('Ошибка при выполнении платежа:', error);
        alert('Произошла ошибка при обработке платежа');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Оплата</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">
              Сумма
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Введите сумму"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              required
            />
            {errors.amount && <p className="text-red-500 text-sm mt-2">{errors.amount}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-gray-700 font-semibold mb-2">
              Номер карты
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Введите номер карты"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              required
            />
            {errors.cardNumber && <p className="text-red-500 text-sm mt-2">{errors.cardNumber}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="cardHolder" className="block text-gray-700 font-semibold mb-2">
              Имя держателя карты
            </label>
            <input
              type="text"
              id="cardHolder"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="Введите имя держателя карты"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              required
            />
            {errors.cardHolder && <p className="text-red-500 text-sm mt-2">{errors.cardHolder}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-gray-700 font-semibold mb-2">
              Срок действия (MM/YY)
            </label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="Введите срок действия карты"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              required
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm mt-2">{errors.expiryDate}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="cvv" className="block text-gray-700 font-semibold mb-2">
              CVV
            </label>
            <input
              type="password"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="Введите CVV"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              required
            />
            {errors.cvv && <p className="text-red-500 text-sm mt-2">{errors.cvv}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Оплатить
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
