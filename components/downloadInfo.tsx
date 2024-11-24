import React from 'react';
import Image from 'next/image';

const DownloadInfo = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold text-white mb-4">Welcome to MyPark!</h2>
          <p className="text-lg text-white mb-6">
            MyPark is a modern app for managing parking spaces. We provide convenient parking solutions so you don’t have to waste time searching for an available spot. With our service, you can quickly book a parking space and enjoy your trip without stress.
          </p>
          <a
            href="/download"
            className="inline-block bg-blue-800 text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-blue-600"
          >
            Download the App
          </a>
        </div>
        <div className="w-full md:w-1/2  ml-10">
          <Image
            src="/parking1.jpg" 
            alt="Parking App Image"
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
