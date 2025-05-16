import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  // جلب المستخدمين
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users/allusers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // حذف مستخدم
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/user/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-[#FDFAF6]">
      <h1 className="text-3xl font-bold mb-6 text-[#97BE5A]">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div key={user.id} className="bg-[#99BC85] text-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">{user.firstName} {user.lastName}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phoneNumber}</p>
            <p><strong>Role:</strong> {user.isAdmin ? 'Admin' : 'User'}</p>
            <button
              onClick={() => handleDelete(user.id)}
              className="mt-4 bg-[#FF8BA7] hover:bg-[#ff6b92] text-white font-semibold py-1 px-3 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
