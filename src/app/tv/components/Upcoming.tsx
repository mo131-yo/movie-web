// app/tv/page.tsx жишээ бүтэц
import { AnimeCard } from "@/app/components/AnimeCard";
import { getTopRatedTVSeries, getOnTheAirTVSeries } from "@/lib/service/tv";

export default async function TVDashboard() {
  const [topRated, upcoming] = await Promise.all([
    getTopRatedTVSeries(),
    getOnTheAirTVSeries()
  ]);

  return (
    <div className="space-y-12 p-10 bg-black text-white">
      <section>
        <h2 className="text-2xl font-bold mb-6 text-yellow-500">★ Top Rated Series</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {topRated.slice(0, 6).map((tv: any) => <AnimeCard key={tv.id} anime={tv} />)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-blue-500">📅 On The Air Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {upcoming.slice(0, 6).map((tv: any) => <AnimeCard key={tv.id} anime={tv} />)}
        </div>
      </section>
    </div>
  );
}