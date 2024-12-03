import React from "react";
import Link from "next/link";

const ReviewsSection = () => {
  return (
    <div className="py-8 text-center text-white">
      <h2 className="text-2xl font-bold mb-4">What our users say</h2>
      <p className="text-lg text-white mb-6">
        Our users love the convenience and efficiency of our parking system. Here are some of their thoughts:
      </p>
      <ul className="space-y-4 mb-6">
        <li className="text-white">
          "Amazing app! Booking a parking slot has never been this easy."
        </li>
        <li className="text-white">
          "The best parking solution I've ever used. Highly recommend it!"
        </li>
        <li className="text-white">
          "Very user-friendly and reliable. A must-have for city drivers!"
        </li>
      </ul>
      <Link href="/review">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Leave a Review
        </button>
      </Link>
    </div>
  );
};

export default ReviewsSection;
