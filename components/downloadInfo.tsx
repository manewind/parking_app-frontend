import React from 'react';
import Image from 'next/image';

const DownloadInfo = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold text-white mb-4">Добро пожаловать в MyPark!</h2>
          <p className="text-lg text-white mb-6">
            MyPark — это современное приложение для управления парковочными местами. Мы предлагаем удобные решения для парковки, чтобы вам не пришлось тратить время на поиски свободного места. С нашим сервисом вы можете быстро забронировать парковочное место и наслаждаться своей поездкой без лишнего стресса.
          </p>
          <a
            href="/download"
            className="inline-block bg-blue-800 text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-blue-600"
          >
            Скачать приложение
          </a>
        </div>
        <div className="w-full md:w-1/2 ml-10">
          <Image
            src="/parking1.jpg" 
            alt="Изображение приложения для парковки"
            width={600} 
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default DownloadInfo;
