import React from "react";
import AdminLayout from "../../components/adminLayout";

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-center">Панель управления админа</h1>
      <div className="mt-8 space-y-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Добро пожаловать, Админ!</h2>
          <p className="text-gray-400 mt-2">
            Используйте меню для изменения и управления системой.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
