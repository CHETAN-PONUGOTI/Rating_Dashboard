import { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import StoreCard from '../components/user/StoreCard';

export default function UserDashboard() {
  const [stores, setStores] = useState([]);

  const fetchStores = async () => {
    const { data } = await API.get('/user/stores');
    setStores(data);
  };

  useEffect(() => { fetchStores(); }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Browse Stores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map(s => (
          <StoreCard key={s.id} store={s} onRated={fetchStores} />
        ))}
      </div>
    </div>
  );
}