import Link from 'next/link';
import { IoWarning } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

type Props = {
  params: {
    id: string;
  };
};

// Сервер талд дата татах функц
async function fetchMovieById(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
    },
    next: { revalidate: 3600 } // 1 цаг кэш хийнэ
  });
  
  if (!res.ok) return null;
  return res.json();
}

export default async function WatchPage({ params }: Props) {
  const { id } = await params;
  const movie = await fetchMovieById(id);

  if (!movie) {
    return <div className="text-white text-center py-20">Кино олдсонгүй.</div>;
  }

  // Domain-оо тохируулах (Development үед localhost, Production үед таны сайт)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";
  const subUrl = `${siteUrl}/spirited-away.vtt`;
  const encodedSubUrl = encodeURIComponent(subUrl);

  // Vidking embed URL
  const videoSrc = `https://www.vidking.net/embed/movie/${id}?sub.Mongolian=${encodedSubUrl}`;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="p-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,1)] border border-white/10 bg-zinc-950">
            {/* Текст болон Play icon */}
            <div className="absolute top-4 left-6 z-10 flex items-center gap-2 pointer-events-none">
               <span className='text-white/60 text-sm flex items-center gap-2'>
                 Кино дээрх <FaPlay className="text-cyan-500" /> дээр дарж үзнэ үү.
               </span>
            </div>
            
            <iframe
              src={videoSrc}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
              scrolling="no"
              allow="autoplay; encrypted-media"
              // Sandbox-д allow-scripts болон allow-same-origin заавал байх ёстой
              sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
            />
          </div>

          {/* Warning Section */}
          <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl flex items-center gap-3">
            <span className="text-yellow-500 text-lg"><IoWarning /></span>
            <p className="text-xs text-gray-300">
              Реклам үзэхийг хүсэхгүй байвал 
              <a href="https://ublockorigin.com/" target="_blank" className="text-cyan-400 font-bold hover:underline ml-1">
                uBlock Origin
              </a> суулгахыг зөвлөж байна.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tighter">
                {movie.title}
              </h1>
              <p className="text-gray-500 text-sm mt-1">{movie.release_date?.split('-')[0]} • {movie.runtime} min</p>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              STATUS: CONNECTED (ID: {id})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}