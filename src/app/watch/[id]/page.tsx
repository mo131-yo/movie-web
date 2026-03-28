import clientPromise from "@/lib/mongodb";

type Props = {
  params: Promise<{ id: string }>;
};

async function fetchMovieWithSubtitle(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: { Authorization: `Bearer ${process.env.NEXT_API_TOKEN}` },
    next: { revalidate: 3600 } 
  });
  
  if (!res.ok) return null;
  const tmdbData = await res.json();

  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const internalMovie = await db.collection("movies").findOne({ tmdbId: id });

    return {
      ...tmdbData,
      subtitleUrl: internalMovie?.subtitleUrl || null
    };
  } catch (e) {
    console.error("MongoDB error:", e);
    return tmdbData;
  }
}

export default async function WatchPage({ params }: Props) {
  const { id } = await params; // params-ийг задлах (await хийх)
  const movie = await fetchMovieWithSubtitle(id);

  if (!movie) {
    return <div className="text-white text-center py-20">Кино олдсонгүй.</div>;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  // Хэрэв MongoDB-д байхгүй бол public/subtitles/spirited-away.vtt-г ашиглана
  const subLink = movie.subtitleUrl 
    ? `${siteUrl}${movie.subtitleUrl}` 
    : `${siteUrl}/subtitles/spirited-away.vtt`; 

  const encodedSubUrl = encodeURIComponent(subLink);
  const videoSrc = `https://www.vidking.net/embed/movie/${id}?sub.Mongolian=${encodedSubUrl}`;

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      <iframe 
        src={videoSrc} 
        className="absolute top-0 left-0 w-full h-full border-none"
        allowFullScreen
        allow="autoplay; encrypted-media"
      />
    </div>
  );
}