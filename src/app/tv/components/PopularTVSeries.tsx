// app/tv/page.tsx
import { AnimeCard } from "@/app/components/AnimeCard";
import { getPopularTVSeries } from "@/lib/service/tv";

export default async function TVSeriesPage() {
  const series = await getPopularTVSeries();

  return (
    <div className="p-10 bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-yellow-500 pl-4">
        Popular TV Series
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {series.map((item: any) => (
          // AnimeCard-тай ижил бүтэцтэй тул шууд ашиглаж болно
          <AnimeCard key={item.id} anime={item} />
        ))}
      </div>
    </div>
  );
}