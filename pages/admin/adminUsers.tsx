import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/adminLayout";
import axios from "axios";
import Link from "next/link";

interface User {
  id: number;
  username: string;
  email: string;
  profilePicture: string;
}

const UsersAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getAllUsers");
        setUsers(response.data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: number) => {
    try {
      await axios.delete(`http://localhost:8000/user/${userId}`); 
      setUsers(users.filter((user) => user.id !== userId)); 
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-center mb-6">Users Management</h1>
      {loading && <p className="text-center">Loading users...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold">All Users</h2>
  <div className="overflow-x-auto mt-4">
    <div className="overflow-y-auto max-h-96">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Username</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Profile Picture</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-700">
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                <img
                  src="/prfilePicture.png"
                  alt={user.username}
                  className="w-16 h-16 rounded-full"
                />
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                <Link
                  href={` /profile/${user.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Profile
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

    </AdminLayout>
  );
};

export default UsersAdmin;
