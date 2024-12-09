import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/adminLayout";
import axios from "axios";
import Link from "next/link";

interface User {
  id: number;
  username: string;
  email: string;
  profilePicture: string;
  balance: number;
}

const UsersAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getAllUsers");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle search input change
  useEffect(() => {
    const results = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleDelete = async (userId: number) => {
    try {
      await axios.delete(`http://localhost:8000/user/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
    } catch (err) {
      setError("Failed to delete user");
    }
  };


  const handleAddBalance = async (userId: number, amount: number) => {
    try {
      const response = await axios.put(`http://localhost:8000/user/${userId}/add-balance`, { amount });
      const updatedUser = response.data;
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, balance: updatedUser.balance } : user))
      );
      setFilteredUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, balance: updatedUser.balance } : user))
      );
    } catch (err) {
      setError("Failed to add balance");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-center mb-6">Users Management</h1>
      {loading && <p className="text-center">Loading users...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">All Users</h2>
        <input
          type="text"
          placeholder="Search by username or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mt-4 mb-4 border border-gray-300 rounded-md text-black"
        />
        <div className="overflow-x-auto mt-4">
          <div className="overflow-y-auto max-h-96">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Username</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Balance</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700">
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">  
                      {user.balance} BYN
                    </td>
                    <button
                      onClick={() => {
                        const amount = parseFloat(prompt("Enter amount to add") || "0");
                        if (amount > 0) handleAddBalance(user.id, amount);
                      }}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Add Balance
                    </button>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <Link
                        href={`/profile/${user.id}`}
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
