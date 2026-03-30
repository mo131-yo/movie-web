import Link from "next/link";
import { getAnimeDetails } from "@/lib/service/anime";
import EpisodeSelector from "./components/EpisodeSelector"; // Чиний EpisodeSelector байгаа зам

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AnimeDetail({ params }: Props) {
  const { id } = await params;
  const anime = await getAnimeDetails(id);

  if (!anime) return <div className="text-white text-center py-20">Аниме олдсонгүй.</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Cover Image / Header */}
      <div className="relative h-[500px] w-full">
        <img 
          src={`https://image.tmdb.org/t/p/original${anime.backdrop_path}`} 
          className="w-full h-full object-cover opacity-40"
          alt={anime.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        <div className="absolute bottom-10 left-10 right-10">
          <h1 className="text-6xl font-black mb-4 uppercase tracking-tighter">{anime.name}</h1>
          
          <div className="flex gap-4 items-center">
            {/* Үзэх товчлуур - Шууд S1 E1 рүү үсэрнэ */}
            <Link 
              href={`/watch/anime/${id}?s=1&e=1`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold text-xl transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
            >
              Watch Now
            </Link>
            
            <span className="text-gray-400 font-medium">
              {anime.first_air_date?.split('-')[0]} • {anime.number_of_seasons} Seasons
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-10 max-w-7xl mx-auto">
        {/* Зүүн тал: Тайлбар */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-6 border-l-4 border-blue-600 pl-4">Storyline</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-10">
            {anime.overview || "Тайлбар одоогоор байхгүй байна."}
          </p>
          
          {/* Анги сонгох хэсэг (Client Component байх ёстой) */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold mb-6">Select Episode</h3>
            <EpisodeSelector animeId={id} seasons={anime.seasons} />
          </div>
        </div>

        {/* Баруун тал: Мэдээллүүд */}
        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h4 className="text-gray-500 text-sm uppercase font-bold mb-4">Details</h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p className="text-blue-400 font-medium">{anime.status}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Rating</p>
                <p className="text-yellow-500 font-medium">★ {anime.vote_average?.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Genres</p>
                <p className="text-white text-sm">{anime.genres?.map((g: any) => g.name).join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}