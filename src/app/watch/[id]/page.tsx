// "use client"

// import Link from 'next/link';
// import { IoWarning } from "react-icons/io5";
// import { GoArrowLeft } from "react-icons/go";
// import { FaPlay } from "react-icons/fa";

// type Props = {
//   params: {
//     id: string;
//   };
// };

// export const fetchMovieById = async (id: string) => {
//   const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
//     },
//   });
//   return res.json();
// };

//  export default async function WatchPage({ params }: Props) {
//   const { id } = await params;
//   const movie = await fetchMovieById(id);
//   // const videoSrc = `https://www.vidking.net/embed/movie/${id}`;

// const origin = typeof window !== 'undefined' ? window.location.origin : '';
// const subUrl = `${origin}/spirited-away.vtt`;
// const encodedSubUrl = encodeURIComponent(subUrl);

// const videoSrc = `https://www.vidking.net/embed/movie/${id}?sub.Mongolian=${encodedSubUrl}`;

//   return (
//     <div className="min-h-screen bg-black flex flex-col">
//       <div className="p-6">
//       <div className="container mx-auto px-4 max-w-6xl">
//         <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,1)] border border-white/10 bg-zinc-950">
//         <span className='text-white text-lg'>Kino deeree bgaa ene <FaPlay/> deer darj kinogoo uzne uu.</span>
//           <iframe
//             src={videoSrc}
//             className="absolute top-0 left-0 w-full h-full"
//             allowFullScreen
//             scrolling="no"
//             allow="autoplay; encrypted-media"
//             sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
//             />
//         </div>

//         <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg flex items-center gap-3 mb-4">
//             <span className="text-yellow-500 text-lg"><IoWarning /></span>
//             <p className="text-xs text-gray-300">Reklam uzemeergui baival 
//                 <a href="https://ublockorigin.com/" target="_blank" className="text-blue-400 underline ml-1">
//                     uBlock Origin
//                 </a> suulgahiig zuvluj baina.
//             </p>
//         </div>

//         <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-white">{movie.title}</h1>
//           </div>
          
//           <div className="flex items-center gap-2 text-[12px] text-gray-500 bg-white/5 px-4 py-2 rounded-full border border-white/5">
//             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//             Connected (ID: {id})
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }



import { IoWarning } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

type Props = {
  params: Promise<{ id: string }>; // Next.js 15+ дээр params нь Promise байдаг
};

export const fetchMovieById = async (id: string) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
    },
  });
  
  if (!res.ok) throw new Error('Failed to fetch movie');
  return res.json();
};

export default async function WatchPage({ params }: Props) {
  const { id } = await params;
  const movie = await fetchMovieById(id);

  // Сервер талд window байхгүй тул Vercel-ийн URL-аа ашиглана
  const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-web-sigma-seven.vercel.app';
  const subUrl = `${domain}/sprited-away.vtt`;
  const encodedSubUrl = encodeURIComponent(subUrl);

  const videoSrc = `https://www.vidking.net/embed/movie/${id}?sub.Mongolian=${encodedSubUrl}`;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="p-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,1)] border border-white/10 bg-zinc-950">
            <iframe
              src={videoSrc}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
              scrolling="no"
              allow="autoplay; encrypted-media"
              sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
            />
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg flex items-center gap-3 mt-4 mb-4">
            <span className="text-yellow-500 text-lg"><IoWarning /></span>
            <p className="text-xs text-gray-300">Reklam uzemeergui baival <a href="https://ublockorigin.com/" target="_blank" className="text-blue-400 underline ml-1">uBlock Origin</a> suulgahiig zuvluj baina.</p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{movie.title}</h1>
            <div className="flex items-center gap-2 text-[12px] text-gray-500 bg-white/5 px-4 py-2 rounded-full border border-white/5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Connected (ID: {id})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}