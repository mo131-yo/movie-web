"use client";

import { useEffect, useState } from "react";

export default function Rating({ movieId }: { movieId: string }) {
  const [rating, setRating] = useState<number>(0);

  const storageKey = `rating-${movieId}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setRating(Number(saved));
  }, [storageKey]);

  const rateMovie = (value: number) => {
    setRating(value);
    localStorage.setItem(storageKey, value.toString());
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="font-semibold">Your rating:</span>

      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => rateMovie(star)}
          className={`text-2xl transition ${
            star <= rating ? "text-yellow-400" : "text-gray-400"
          }`}
        >
          ★
        </button>
      ))}

      {rating > 0 && (
        <span className="text-sm text-gray-600 ml-2">
          ({rating}/5)
        </span>
      )}
    </div>
  );
}
