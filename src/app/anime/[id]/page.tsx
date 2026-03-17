import { fetchAnimeInfo } from "@/lib/service/anime";

export default async function AnimePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const animeData = await fetchAnimeInfo(id);

  if (!animeData) {
    return <div className="p-10 text-white">bhq</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-white">{animeData.title}</h1>
    </div>
  );
}