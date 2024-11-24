import React from 'react';

const BookingSection = () => {
  return (
    <section
      className="py-20 bg-cover bg-center text-white mt-20"
      style={{ backgroundImage: "url('/parking_bg.jpeg')" }}
    >
      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="text-4xl font-bold mb-6">Easy Parking Booking with MyPark</h2>
        <p className="text-lg max-w-2xl mb-8">
          At MyPark, you can book parking spots quickly and conveniently. Choose from a variety of parking options, including standard, premium, and VIP spots. Our system allows you to reserve in advance, ensuring you always have a space ready when you need it. Just pick the location, time, and type of spot you want, and leave the rest to us.
        </p>
        <a
          href="/booking"
          className="inline-block bg-blue-800 text-white py-3 px-8 rounded-lg text-lg font-medium hover:bg-blue-600"
        >
          Go to Booking
        </a>
      </div>
    </section>
  );
};

export default BookingSection;
