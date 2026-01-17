import { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import UserTable from '../components/admin/UserTable';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ userCount: 0, storeCount: 0, ratingCount: 0 });
  const [users, setUsers] = useState([]);
  const [newStore, setNewStore] = useState({ name: '', email: '', address: '' });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([
        API.get('/admin/dashboard'),
        API.get('/admin/users')
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error("Failed to fetch admin data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      await API.post('/admin/stores', newStore);
      alert('Store added successfully!');
      setNewStore({ name: '', email: '', address: '' });
      fetchData(); // Refresh counts and tables
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || 'Could not add store'));
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <div className="p-8 text-center">Loading Admin Data...</div>;

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <header>
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Overview</h1>
        <p className="text-gray-500">Manage your users, stores, and platform statistics.</p>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Users</p>
          <p className="text-3xl font-black text-gray-800">{stats.userCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Stores</p>
          <p className="text-3xl font-black text-gray-800">{stats.storeCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Ratings</p>
          <p className="text-3xl font-black text-gray-800">{stats.ratingCount}</p>
        </div>
      </div>

      {/* ADD STORE FORM SECTION */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Register a New Store</h2>
        <form onSubmit={handleAddStore} className="space-y-4 md:space-y-0 md:flex md:gap-4 flex-wrap">
          <div className="flex-1 min-w-[250px]">
            <input 
              type="text" placeholder="Store Name (20-60 chars)" required
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={newStore.name}
              onChange={(e) => setNewStore({...newStore, name: e.target.value})}
            />
          </div>
          <div className="flex-1 min-w-[250px]">
            <input 
              type="email" placeholder="Store Email" required
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={newStore.email}
              onChange={(e) => setNewStore({...newStore, email: e.target.value})}
            />
          </div>
          <div className="w-full mt-4">
            <input 
              type="text" placeholder="Full Address (Max 400 chars)" required
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={newStore.address}
              onChange={(e) => setNewStore({...newStore, address: e.target.value})}
            />
          </div>
          <button className="w-full mt-4 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
            Create Store Record
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">User Management</h2>
        <UserTable users={users} />
      </section>
    </div>
  );
}