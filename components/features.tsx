import React from 'react';

const Features = () => {
  const offerings = [
    {
      title: 'Quick Parking Reservation',
      description: 'Reserve a parking spot instantly without the need to search endlessly.',
    },
    {
      title: 'Real-Time Spot Availability',
      description: 'Get live updates about available parking spots around you.',
    },
    {
      title: 'Smart Parking Suggestions',
      description: 'Our app suggests the best spots based on your location and preferences.',
    },
    {
      title: 'Easy Navigation',
      description: 'Navigate to your parking spot effortlessly with our step-by-step guidance.',
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto text-center mb-12 ">
        <h2 className="text-3xl font-bold text-white mb-4">What We Offer</h2>
        <p className="text-lg text-white">
          At MyPark, we provide innovative solutions to make your parking experience quick, convenient, and stress-free. Here’s what we offer:
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
