import RatingStars from './RatingStars';
import API from '../../api/axiosConfig';

export default function StoreCard({ store, onRated }) {
  const handleRate = async (val) => {
    try {
      await API.post('/user/ratings', { store_id: store.id, rating: val });
      onRated();
    } catch (err) {
      console.error("Error submitting rating", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-800">{store.name}</h3>
      <p className="text-gray-600 text-sm mt-1">{store.address}</p>
      
      <div className="mt-6 pt-4 border-t border-gray-50 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Community Score</span>
          <RatingStars rating={Math.round(store.avgRating || 0)} readonly />
        </div>
        
        <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
          <span className="text-xs font-bold text-blue-600 uppercase">Your Rating</span>
          <RatingStars rating={store.userRating || 0} onRate={handleRate} />
        </div>
      </div>
    </div>
  );
}