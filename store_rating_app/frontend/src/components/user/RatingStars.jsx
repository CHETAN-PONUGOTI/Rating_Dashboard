import { Star } from 'lucide-react';

export default function RatingStars({ rating, onRate, readonly = false }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={20}
          className={`${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} ${!readonly ? 'cursor-pointer hover:scale-110' : ''}`}
          onClick={() => !readonly && onRate(star)}
        />
      ))}
    </div>
  );
}