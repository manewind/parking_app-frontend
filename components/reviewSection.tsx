import React from "react";
import Link from "next/link";

const ReviewsSection = () => {
  return (
    <div className="py-8 text-center text-white">
      <h2 className="text-2xl font-bold mb-4">Что говорят наши пользователи</h2>
      <p className="text-lg text-white mb-6">
        Наши пользователи ценят удобство и эффективность нашей системы парковки. Вот их отзывы:
      </p>
      <ul className="space-y-4 mb-6">
        <li className="text-white">
          "Потрясающее приложение! Забронировать парковочное место теперь проще простого."
        </li>
        <li className="text-white">
          "Лучшее решение для парковки, которое я когда-либо использовал. Рекомендую всем!"
        </li>
        <li className="text-white">
          "Очень удобное и надежное. Обязательно для городских водителей!"
        </li>
      </ul>
      <Link href="/review">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Оставить отзыв
        </button>
      </Link>
    </div>
  );
};

export default ReviewsSection;
