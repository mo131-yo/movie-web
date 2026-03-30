import EpisodeSelector from "@/app/anime/[id]/components/EpisodeSelector";
import { getTVDetails } from "@/lib/service/tv";
import Link from "next/link";

export default async function TVDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const series = await getTVDetails(id);

  if (!series) return <div className="text-white text-center py-20">Цуврал олдсонгүй.</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <img 
          src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`} 
          className="w-full h-full object-cover opacity-50"
          alt={series.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        <div className="absolute bottom-10 left-10">
          <h1 className="text-5xl font-black uppercase mb-4">{series.name}</h1>
          <div className="flex gap-4 items-center mb-6">
            <Link 
              href={`/watch/tv/${id}?s=1&e=1`}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-full font-bold transition-transform hover:scale-105"
            >
              Watch S1 E1
            </Link>
            <span className="text-gray-300">
              {series.first_air_date?.split('-')[0]} • {series.number_of_seasons} Seasons
            </span>
            <span className="bg-white/10 px-2 py-1 rounded text-sm text-yellow-500">
              ★ {series.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4 border-l-4 border-yellow-500 pl-4">Storyline</h2>
          <p className="text-gray-400 leading-relaxed mb-10">{series.overview}</p>
          
          {/* Episode Selector */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold mb-6">Select Episode</h3>
            {/* Чиний EpisodeSelector-т animeId болон seasons дамжуулна */}
            <EpisodeSelector animeId={id} seasons={series.seasons} />
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h4 className="text-gray-500 text-xs uppercase font-bold mb-4">Details</h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500">Status</p>
                <p>{series.status}</p>
              </div>
              <div>
                <p className="text-gray-500">Genres</p>
                <p>{series.genres?.map((g: any) => g.name).join(", ")}</p>
              </div>
              <div>
                <p className="text-gray-500">Networks</p>
                <p>{series.networks?.map((n: any) => n.name).join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}