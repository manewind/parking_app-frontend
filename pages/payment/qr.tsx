// src/pages/payment/QRPayment.tsx
import React from 'react';

const QRPayment = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-8 text-center">QR оплата</h1>
      <p className="text-center">
       Отсканируйте QR-код для оплаты.
      </p>
      <div className="flex justify-center mt-6">
        <img src="/qr.png" alt="QR Code" className="w-96 h-96" />
      </div>
    </div>
  );
};

export default QRPayment;