import React from "react";
import AdminLayout from "../../components/adminLayout";

const ParkingSlots: React.FC = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-center">Parking Slots Management</h1>
      <p className="text-gray-400 mt-4">
        Here you can view, add, or edit parking slot information.
      </p>
    </AdminLayout>
  );
};

export default ParkingSlots;
