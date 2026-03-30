// "use client";
// import { useEffect, useState } from 'react';
// import { AnimeCard } from '@/app/components/AnimeCard';
// // Энд fetchAiringNow-г TMDB-ийн хувилбараар солихыг зөвлөж байна
// import { fetchTMDBAnime } from '@/lib/service/anime'; 

// export const NowPlaying = () => {
//     const [animes, setAnimes] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const getNowPlayingAnime = async () => {
//             try {
//                 // TMDB-ээс аниме-нуудаа татах (Ингэснээр ID нь Watch хуудастай таарна)
//                 const data = await fetchTMDBAnime(1); 
//                 setAnimes(data || []);
//             } catch (err) {
//                 console.error("Error fetching anime:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         getNowPlayingAnime();
//     }, []);

//     if (loading) return <div className="p-20 text-center text-white">Уншиж байна...</div>;

//     return (
//         <div className="w-full">
//             <style>
//                 {`@keyframes aitf {
//                   0% { background-position: 0% 50%; }
//                   100% { background-position: 100% 50%; }
//                 }
//                 .animated-text-title-dark-anime {
//                   background: url(https://thumbcdn.123freevectors.com/wp-content/resized/150964-abstract-light-blue-diagonal-shiny-lines-background-design-template.webp) repeat-x;
//                   -webkit-background-clip: text;
//                   background-clip: text;
//                   -webkit-text-fill-color: transparent;
//                   animation: aitf 10s linear infinite;
//                 }
//                 .animated-text-title-anime {
//                   background: url(https://thumbcdn.123freevectors.com/wp-content/resized/150965-light-blue-diagonal-shiny-lines-background.webp) repeat-x;
//                   -webkit-background-clip: text;
//                   background-clip: text;
//                   -webkit-text-fill-color: transparent;
//                   animation: aitf 10s linear infinite;
//                 }
//                 `}
//             </style>

//             <div className="px-4 sm:px-8 lg:px-20 py-6">
//                 <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl text-black dark:text-white pb-10 animated-text-title-anime dark:animated-text-title-dark-anime uppercase tracking-tighter">
//                     Now Playing (TMDB)
//                 </h3>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8 px-4 sm:px-8 lg:px-20 mb-10">
//                 {animes.slice(0, 10).map((anime) => (
//                     // TMDB-ээс ирж байгаа аниме-д 'id' гэсэн талбар байдаг
//                     <AnimeCard key={anime.id} anime={anime} />
//                 ))}
//             </div>
//         </div>
//     );
// };