import React from 'react';

const BookingSection = () => {
  return (
    <section
      className="py-20 bg-cover bg-center text-white mt-20"
      style={{ backgroundImage: "url('/parking_bg.jpeg')" }}
    >
      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="text-4xl font-bold mb-6">Легкое бронирование парковки с MyPark</h2>
        <p className="text-lg max-w-2xl mb-8">
          С MyPark вы можете бронировать парковочные места быстро и удобно. Выбирайте из различных вариантов парковки, включая стандартные, премиум и VIP места. Наша система позволяет бронировать заранее, гарантируя, что у вас всегда будет свободное место, когда оно вам нужно. Просто выберите местоположение, время и тип места, а остальное мы сделаем за вас.
        </p>
        <a
          href="/booking"
          className="inline-block bg-blue-800 text-white py-3 px-8 rounded-lg text-lg font-medium hover:bg-blue-600"
        >
          Перейти к бронированию
        </a>
      </div>
    </section>
  );
};

export default BookingSection;
