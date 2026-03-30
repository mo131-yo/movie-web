    // "use client";

    // import { motion, AnimatePresence } from "framer-motion";
    // import Image from "next/image";
    // import Link from "next/link";
    // import { useState } from "react";
    // import { FaPlay, FaStar } from "react-icons/fa";

    // export const AnimeCard = ({ anime }: { anime: any }) => {
    //   const [isHovered, setIsHovered] = useState(false);

    //   const ratingPercentage = Math.round((anime.score || 0) * 10);
      
    //   const getRatingColor = (percent: number) => {
    //     if (percent >= 70) return "#21d07a";
    //     if (percent >= 40) return "#d2d531";
    //     return "#db2360"; 
    //   };

    //   return (
    //     <motion.div
    //       onMouseEnter={() => setIsHovered(true)}
    //       onMouseLeave={() => setIsHovered(false)}
    //       initial="initial"
    //       whileHover={{ 
    //         scale: 1.1, 
    //         zIndex: 50,
    //         transition: { duration: 0.3 }
    //       }}
    //       className="relative w-full rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300">
    //       <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
    //         <motion.rect
    //           width="100" height="100" fill="none" stroke="#06b6d4" strokeWidth="1" pathLength="1"
    //           variants={{ initial: { pathLength: 0, opacity: 0 }, hover: { pathLength: 1, opacity: 1 } }}
    //           transition={{ duration: 0.6 }}
    //         />
    //       </svg>

    //       <Link href={`/anime/${anime.id}`}>
    //         <div className="relative aspect-[2/3] w-full overflow-hidden">
    //           <Image
    //             src={anime.images.jpg.large_image_url}
    //             alt={anime.title} 
    //             fill 
    //             className={`object-cover transition-all duration-500 ${isHovered ? "blur-[2px] brightness-50" : ""}`}
    //             unoptimized 
    //           />
              
    //           <div className="absolute top-2 left-2 z-30 scale-75 origin-top-left">
    //             <div className="relative w-12 h-12 bg-[#081c22] rounded-full flex items-center justify-center border-2 border-[#081c22] shadow-2xl">
    //               <svg className="w-full h-full transform -rotate-90">
    //                 <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="transparent" />
    //                 <motion.circle
    //                   cx="24" cy="24" r="20" stroke={getRatingColor(ratingPercentage)} strokeWidth="3" fill="transparent"
    //                   strokeDasharray={126}
    //                   initial={{ strokeDashoffset: 126 }}
    //                   animate={{ strokeDashoffset: 126 - (126 * ratingPercentage) / 100 }}
    //                   transition={{ duration: 1 }}
    //                 />
    //               </svg>
    //               <div className="absolute text-white font-bold text-[11px] flex items-start">
    //                 {ratingPercentage}<span className="text-[6px] mt-0.5">%</span>
    //               </div>
    //             </div>
    //           </div>

    //           <AnimatePresence>
    //             {isHovered && (
    //               <motion.div 
    //                 initial={{ opacity: 0, y: 10 }} 
    //                 animate={{ opacity: 1, y: 0 }}
    //                 className="absolute inset-0 flex items-center justify-center p-4 z-10"
    //               >
    //                 <p className="text-white text-center text-sm font-black uppercase tracking-tight drop-shadow-md">
    //                   {anime.title}
    //                 </p>
    //               </motion.div>
    //             )}
    //           </AnimatePresence>
    //         </div>
    //       </Link>

    //       <div className="p-3 bg-gray-900">
    //         <h3 className="text-xs font-bold truncate text-gray-100">{anime.title}</h3>
    //         <div className="flex items-center gap-1 mt-1 text-cyan-500 text-[10px]">
    //           <FaStar className="text-amber-500" /> 
    //           <span>{anime.score || "N/A"}</span>
    //           <span className="text-gray-500 ml-1">• {anime.type}</span>
    //         </div>
    //       </div>

    //       <Link 
    //         href={anime.trailer.url || "#"} 
    //         target="_blank"
    //         className="w-full py-2 bg-gray-800 hover:bg-cyan-600 text-white transition-all flex items-center justify-center gap-2 text-[10px] font-bold"
    //       >
    //         <FaPlay size={10} /> Watch Trailer
    //       </Link>
    //     </motion.div>
    //   );
    // };



    "use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaPlay, FaStar } from "react-icons/fa";

export const AnimeCard = ({ anime }: { anime: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  // 1. Зургийн замыг шалгах (TMDB vs Jikan)
  const imageUrl = anime.poster_path 
    ? `https://image.tmdb.org/t/p/w500${anime.poster_path}` 
    : anime.images?.jpg?.large_image_url || "/placeholder.jpg";

  // 2. ID-г шалгах
  const id = anime.id || anime.mal_id;

  // 3. Гарчгийг шалгах
  const title = anime.name || anime.title || "Unknown Title";

  // 4. Үнэлгээг тооцоолох (TMDB нь 10-аас, Jikan нь 10-аас эсвэл байхгүй байж болно)
  const score = anime.vote_average || anime.score || 0;
  const ratingPercentage = Math.round(score * 10);
  
  const getRatingColor = (percent: number) => {
    if (percent >= 70) return "#21d07a";
    if (percent >= 40) return "#d2d531";
    return "#db2360"; 
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="initial"
      whileHover={{ 
        scale: 1.05, 
        zIndex: 50,
        transition: { duration: 0.3 }
      }}
      className="relative w-full rounded-xl overflow-hidden bg-gray-900 shadow-lg hover:shadow-blue-500/40 transition-shadow duration-300"
    >
      <Link href={`/anime/${id}`}>
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title} 
            className={`object-cover w-full h-full transition-all duration-500 ${isHovered ? "blur-[2px] brightness-50" : ""}`}
          />
          
          {/* Үнэлгээний тойрог (Rating Circle) */}
          <div className="absolute top-2 left-2 z-30 scale-75 origin-top-left">
            <div className="relative w-12 h-12 bg-[#081c22] rounded-full flex items-center justify-center border-2 border-[#081c22] shadow-2xl">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="transparent" />
                <motion.circle
                  cx="24" cy="24" r="20" stroke={getRatingColor(ratingPercentage)} strokeWidth="3" fill="transparent"
                  strokeDasharray={126}
                  initial={{ strokeDashoffset: 126 }}
                  animate={{ strokeDashoffset: 126 - (126 * ratingPercentage) / 100 }}
                  transition={{ duration: 1 }}
                />
              </svg>
              <div className="absolute text-white font-bold text-[11px] flex items-start">
                {ratingPercentage}<span className="text-[6px] mt-0.5">%</span>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-0 flex items-center justify-center p-4 z-10"
              >
                <p className="text-white text-center text-sm font-black uppercase tracking-tight drop-shadow-md">
                  {title}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>

      <div className="p-3 bg-gray-900">
        <h3 className="text-xs font-bold truncate text-gray-100">{title}</h3>
        <div className="flex items-center gap-1 mt-1 text-blue-400 text-[10px]">
          <FaStar className="text-amber-500" /> 
          <span>{score || "N/A"}</span>
          <span className="text-gray-500 ml-1">• {anime.type || "TV"}</span>
        </div>
      </div>

      {/* Trailer хэсэг (Jikan дээр л байдаг тул шалгана) */}
      {anime.trailer?.url ? (
        <a 
          href={anime.trailer.url} 
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 bg-gray-800 hover:bg-blue-600 text-white transition-all flex items-center justify-center gap-2 text-[10px] font-bold"
        >
          <FaPlay size={10} /> Watch Trailer
        </a>
      ) : (
        <Link 
          href={`/anime/${id}`}
          className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white transition-all flex items-center justify-center gap-2 text-[10px] font-bold"
        >
          View Details
        </Link>
      )}
    </motion.div>
  );
};