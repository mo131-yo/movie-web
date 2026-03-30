import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function WatchPage({ params }: Props) {
  // 1. Params-ийг await хийх (Next.js 15+ стандарт)
  const { id } = await params;

  if (!id) {
    return <div className="text-white text-center py-20">ID олдсонгүй.</div>;
  }

  const videoSrc = `https://www.vidking.net/embed/movie/${id}`;

  return (
    /* h-screen болон overflow-hidden ашиглан дэлгэцэнд тааруулна */
    <div className="h-screen w-screen bg-black flex flex-col relative overflow-hidden">
      
      {/* Header - Буцах товчлуур */}
      <div className="absolute top-0 left-0 w-full p-4 flex items-center bg-gradient-to-b from-black/90 to-transparent z-20">
        <Link 
          href={`/movie/${id}`} 
          className="flex items-center gap-2 text-white/70 hover:text-white transition-all bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10"
        >
          <FaChevronLeft size={14} /> 
          <span className="text-sm font-medium">Буцах</span>
        </Link>
      </div>

      {/* Fullscreen Video Player */}
      <div className="flex-1 w-full h-full">
        <iframe 
          src={videoSrc} 
          className="w-full h-full border-none"
          allowFullScreen
          allow="autoplay; encrypted-media"
          title="Movie Player"
        />
      </div>
    </div>
  );
}