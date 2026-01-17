import { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import UserTable from '../components/admin/UserTable';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const s = await API.get('/admin/dashboard');
      const u = await API.get('/admin/users');
      setStats(s.data);
      setUsers(u.data);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{stats.userCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-gray-500">Total Stores</p>
          <p className="text-2xl font-bold">{stats.storeCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-gray-500">Total Ratings</p>
          <p className="text-2xl font-bold">{stats.ratingCount}</p>
        </div>
      </div>
      <UserTable users={users} />
    </div>
  );
}