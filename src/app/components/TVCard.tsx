"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPlay, FaStar } from "react-icons/fa";

export const TVCard = ({ series }: { series: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  const ratingPercentage = Math.round(series.vote_average * 10);
  
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
        scale: 1.15, 
        zIndex: 50,
        transition: { duration: 0.3 }
      }}
      className="relative w-full rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-yellow-600/50 transition-shadow duration-300"
    >
      {/* Yellow Border Effect */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.rect
          width="100" height="100" fill="none" stroke="#eab308" strokeWidth="1.5" pathLength="1"
          variants={{ initial: { pathLength: 0, opacity: 0 }, hover: { pathLength: 1, opacity: 1 } }}
          transition={{ duration: 0.6 }}
        />
      </svg>

      <Link href={`/watch/tv/${series.id}`}>
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Image
            src={series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : "/no-image.png"}
            alt={series.name} 
            fill 
            className={`object-cover transition-all duration-500 ${isHovered ? "blur-sm brightness-50" : ""}`}
          />
          
          {/* Rating Circle */}
          <div className="absolute top-2 left-2 z-30 scale-90 origin-top-left">
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
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center p-4 z-10"
              >
                <p className="text-white text-center text-lg font-black uppercase tracking-tighter drop-shadow-lg">
                  {series.name}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>

      <div className="p-3">
        <h3 className="text-sm font-bold truncate text-gray-800 dark:text-gray-100">{series.name}</h3>
        <div className="flex items-center gap-1 mt-1 text-yellow-500 text-xs">
          <FaStar /> <span>{series.vote_average.toFixed(1)}</span>
          <span className="text-gray-500 ml-2">• TV Series</span>
        </div>
      </div>

      <button className="w-full py-2 bg-gray-100 dark:bg-gray-800 hover:bg-yellow-600 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold">
        <FaPlay /> Watch Now
      </button>
    </motion.div>
  );
};