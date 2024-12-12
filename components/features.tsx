import React from 'react';

const Features = () => {
  const offerings = [
    {
      title: 'Быстрое бронирование парковки',
      description: 'Забронируйте парковочное место мгновенно, без необходимости долго искать.',
    },
    {
      title: 'Доступность мест в реальном времени',
      description: 'Получайте актуальную информацию о доступных парковочных местах рядом с вами.',
    },
    {
      title: 'Приобритение абонемента',
      description: 'Наше приложение предлагает возможность для покупки абонемента.',
    },
    {
      title: 'Пополнение баланса',
      description: 'Удобное пополнение баланса через приложение',
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Что мы предлагаем</h2>
        <p className="text-lg text-white">
          В MyPark мы предоставляем инновационные решения, чтобы сделать ваш опыт парковки быстрым, удобным и без стресса. Вот что мы предлагаем:
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pl-10 pr-10">
        {offerings.map((offering, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-500 transform transition-all duration-300 hover:scale-105 hover:border-blue-700"
          >
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">{offering.title}</h3>
            <p className="text-gray-600">{offering.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
