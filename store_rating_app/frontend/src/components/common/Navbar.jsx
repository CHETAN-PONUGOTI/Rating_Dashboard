import { useAuth } from '../../context/AuthContext';
import { LogOut, Store } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
        <Store size={24} />
        <span>RateIt</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-gray-600">Hello, <b>{user.name}</b> ({user.role})</span>
        <button onClick={logout} className="flex items-center gap-2 text-red-500 hover:text-red-700">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </nav>
  );
}