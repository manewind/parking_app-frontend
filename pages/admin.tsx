import React from 'react';
import { useRouter } from 'next/router';

const AdminPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Логика для выхода из системы, например, удаление токена
    localStorage.removeItem('token');
    router.push('/login'); // Перенаправляем на страницу логина
  };

  const handleEditUser = (userId: number) => {
    // Логика для редактирования пользователя
    console.log('Editing user with ID:', userId);
    // Например, перенаправить на страницу редактирования
    router.push(`/admin/edit-user/${userId}`);
  };

  const handleDeleteUser = (userId: number) => {
    // Логика для удаления пользователя
    console.log('Deleting user with ID:', userId);
    // Например, запрос к серверу для удаления пользователя
  };

  return (
    <div className="min-h-screen  text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-black p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>

          <div className="mt-8 space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Admin Panel</h2>
              <p className="text-gray-400 mt-2">Manage users, roles, and other system settings.</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">User List</h2>
              <ul className="mt-4 space-y-2">
                {/* Пример списка пользователей, можно маппить данные из API */}
                {['User1', 'User2', 'User3'].map((user, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-gray-300">{user}</span>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditUser(index)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteUser(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Добавить другие секции по необходимости */}

            <div className="text-center mt-8">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
