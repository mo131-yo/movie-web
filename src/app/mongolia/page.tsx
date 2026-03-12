import Link from 'next/link';
import { getMongolMovies } from '@/lib/youtube';

export default async function MongolianMoviesPage() {
  const movies = await getMongolMovies();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-10 border-l-4 border-yellow-500 pl-4">
        Mongolia Movie
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie: any) => (
          <Link 
            key={movie.id} 
            href={`/watch/${movie.id}?type=youtube`} 
            className="group bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            <div className="relative aspect-video">
              <img 
                src={movie.thumbnail} 
                alt={movie.title}
                className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold">Үзэх</span>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold line-clamp-1">{movie.title}</h2>
              <p className="text-sm text-gray-500 mt-1 uppercase">Full Movie</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}