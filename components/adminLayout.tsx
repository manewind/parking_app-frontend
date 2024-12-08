import React from "react";
import { useRouter } from "next/router";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen flex text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
        <nav className="space-y-4">
          <button
            onClick={() => handleNavigation("/admin/adminParking")}
            className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Parking Slots
          </button>
          <button
            onClick={() => handleNavigation("/admin/adminMemberships")}
            className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Memberships
          </button>
          <button
            onClick={() => handleNavigation("/admin/adminReviews")}
            className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Reviews
          </button>
          <button
            onClick={() => handleNavigation("/admin/adminBookings")}
            className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Bookings
          </button>
          <button
            onClick={() => handleNavigation("/admin/adminUsers")}
            className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Users
          </button>
        </nav>
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex-grow bg-black p-8">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
