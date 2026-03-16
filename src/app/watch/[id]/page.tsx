import Link from 'next/link';
import { IoWarning } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

type Props = {
  params: {
    id: string;
  };
};

async function fetchMovieById(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
    },
    next: { revalidate: 3600 } 
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";
  const subUrl = `${siteUrl}/spirited-away.vtt`;
  const encodedSubUrl = encodeURIComponent(subUrl);

  const videoSrc = `https://www.vidking.net/embed/movie/${id}?sub.Mongolian=${encodedSubUrl}`;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="p-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,1)] border border-white/10 bg-zinc-950">
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
              sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
            />
          </div>

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
// // "use client"

// // import Link from 'next/link';
// // import { IoWarning } from "react-icons/io5";
// // import { GoArrowLeft } from "react-icons/go";
// // import { FaPlay } from "react-icons/fa";

// // type Props = {
// //   params: {
// //     id: string;
// //   };
// // };

// // export const fetchMovieById = async (id: string) => {
// //   const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
// //     method: "GET",
// //     headers: {
// //       "Content-Type": "application/json",
// //       Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
// //     },
// //   });
// //   return res.json();
// // };

// //  export default async function WatchPage({ params }: Props) {
// //   const { id } = await params;
// //   const movie = await fetchMovieById(id);
// //   // const videoSrc = `https://www.vidking.net/embed/movie/${id}`;

// // const origin = typeof window !== 'undefined' ? window.location.origin : '';
// // const subUrl = `${origin}/spirited-away.vtt`;
// // const encodedSubUrl = encodeURIComponent(subUrl);

// // const videoSrc = `https://www.vidking.net/embed/movie/${id}?sub.Mongolian=${encodedSubUrl}`;

// //   return (
// //     <div className="min-h-screen bg-black flex flex-col">
// //       <div className="p-6">
// //       <div className="container mx-auto px-4 max-w-6xl">
// //         <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,1)] border border-white/10 bg-zinc-950">
// //         <span className='text-white text-lg'>Kino deeree bgaa ene <FaPlay/> deer darj kinogoo uzne uu.</span>
// //           <iframe
// //             src={videoSrc}
// //             className="absolute top-0 left-0 w-full h-full"
// //             allowFullScreen
// //             scrolling="no"
// //             allow="autoplay; encrypted-media"
// //             sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
// //             />
// //         </div>

// //         <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg flex items-center gap-3 mb-4">
// //             <span className="text-yellow-500 text-lg"><IoWarning /></span>
// //             <p className="text-xs text-gray-300">Reklam uzemeergui baival 
// //                 <a href="https://ublockorigin.com/" target="_blank" className="text-blue-400 underline ml-1">
// //                     uBlock Origin
// //                 </a> suulgahiig zuvluj baina.
// //             </p>
// //         </div>

// //         <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //           <div>
// //             <h1 className="text-2xl sm:text-3xl font-bold text-white">{movie.title}</h1>
// //           </div>
          
// //           <div className="flex items-center gap-2 text-[12px] text-gray-500 bg-white/5 px-4 py-2 rounded-full border border-white/5">
// //             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
// //             Connected (ID: {id})
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //     </div>
// //   );
// // }



// // import { IoWarning } from "react-icons/io5";
// // import { FaPlay } from "react-icons/fa";

// // type Props = {
// //   params: Promise<{ id: string }>;
// // };
// import { IoWarning } from "react-icons/io5";
// import { FaPlay } from "react-icons/fa";

// type Props = {
//   params: Promise<{ id: string }>; 
// };

// // export const fetchMovieById = async (id: string) => {
// //   const res = await fetch(`${process.env.TMDB_BASE_URL}/movie/${id}`, {
// //     method: "GET",
// //     headers: {
// //       "Content-Type": "application/json",
// //       Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
// //     },
// //   });
  
// //   if (!res.ok) throw new Error('Failed to fetch movie');
// //   return res.json();
// // };

// // export default async function WatchPage({ params }: Props) {
// //   const { id } = await params;
// //   const movie = await fetchMovieById(id);

// //   const rawGistUrl = `${process.env.GITHUB_GIST}`; 
// //   const encodedSubUrl = encodeURIComponent(rawGistUrl);

// //   const videoSrc = `${process.env.MOVIE_API}/${id}?sub.Mongolian=${encodedSubUrl}`;

// //   return (
// //     <div className="min-h-screen bg-black flex flex-col">
// //       <div className="p-6">
// //         <div className="container mx-auto px-4 max-w-6xl">
// //           <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,1)] border border-white/10 bg-zinc-950">
// //             <iframe
// //               src={videoSrc}
// //               className="absolute top-0 left-0 w-full h-full"
// //               allowFullScreen
// //               scrolling="no"
// //               referrerPolicy="origin"
// //               allow="autoplay; encrypted-media"
// //               sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
// //             />
// //           </div>

// //           <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg flex items-center gap-3 mt-4 mb-4">
// //             <span className="text-yellow-500 text-lg"><IoWarning /></span>
// //             <p className="text-xs text-gray-300">Reklam uzemeergui baival <a href="https://ublockorigin.com/" target="_blank" className="text-blue-400 underline ml-1">uBlock Origin</a> suulgahiig zuvluj baina.</p>
// //           </div>

// //           <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //             <h1 className="text-2xl sm:text-3xl font-bold text-white">{movie.title}</h1>
// //             <div className="flex items-center gap-2 text-[12px] text-gray-500 bg-white/5 px-4 py-2 rounded-full border border-white/5">
// //               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
// //               Connected (ID: {id})
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// "use client";
// import { useEffect, useState } from 'react';
// import { searchAnime, fetchAnimeInfo, fetchStreamLink } from '@/lib/service/anime';
// import dynamic from 'next/dynamic';

// const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

// export default function WatchPage({ animeTitle }: { animeTitle: string }) {
//   const [episodes, setEpisodes] = useState([]);
//   const [videoUrl, setVideoUrl] = useState("");
//   const [loading, setLoading] = useState(true);

//   const handleEpisodeClick = async (episodeId: string) => {
//   try {
//     const stream = await fetchStreamLink(episodeId);
//     if (stream && stream.url) {
//       setVideoUrl(stream.url); 
//     } else {
//       alert("Видео линк олдсонгүй.");
//     }
//   } catch (error) {
//     console.error("Видео ачаалахад алдаа гарлаа:", error);
//   }
// };

//   useEffect(() => {
//     const initWatchPage = async () => {
//       setLoading(true);
      
//       const searchResults = await searchAnime(animeTitle);
      
//       if (searchResults && searchResults.length > 0) {
//         const consumetId = searchResults[0].id;
        
//         const info = await fetchAnimeInfo(consumetId);
//         if (info && info.episodes) {
//           setEpisodes(info.episodes);
//         }
//       }
//       setLoading(false);
//     };

//     if (animeTitle) initWatchPage();
//   }, [animeTitle]);


//   if (loading) return <div className="text-white text-center p-10">Ачаалж байна...</div>;

//   return (
//     <div className="p-4">
//       <div className="aspect-video bg-black rounded-lg overflow-hidden">
//         {videoUrl ? (
//           <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
//         ) : (
//           <div className="flex h-full items-center justify-center text-white">
//             Ангиа сонгож үзнэ үү
//           </div>
//         )}
//       </div>

//       <div className="mt-6 grid grid-cols-4 md:grid-cols-10 gap-2">
//         {episodes.map((ep: any) => (
//           <button 
//             key={ep.id} 
//             onClick={() => handleEpisodeClick(ep.id)}
//             className="bg-gray-800 p-2 rounded text-white hover:bg-cyan-600 transition"
//           >
//             {ep.number}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
