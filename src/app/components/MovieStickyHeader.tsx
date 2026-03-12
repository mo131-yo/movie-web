// "use client";

// import { useEffect, useState } from "react";
// import { FaStar } from "react-icons/fa";

// interface StickyHeaderProps {
//   title: string;
//   release_date: string | number;
//   runtime: number;
//   vote_average: number;
//   vote_count: number;
//   formatTime: (minutes: number) => string; 
// }

// export default function MovieStickyHeader({
//   title,
//   release_date,
//   runtime,
//   vote_average,
//   vote_count,
//   formatTime,
// }: StickyHeaderProps) {
//   const [isShrunk, setIsShrunk] = useState(false);

//   useEffect(() => {
//     const handler = () => {
//       setIsShrunk(window.scrollY > 150);
//     };
//     window.addEventListener("scroll", handler);
//     return () => window.removeEventListener("scroll", handler);
//   }, []);

//   return (
//     <div
//       className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ease-in-out px-4 sm:px-10 lg:px-20 flex flex-row justify-between items-center bg-white dark:bg-[#0a0a0a] border-b dark:border-gray-800 ${
//         isShrunk ? "py-2 h-16 shadow-lg bg-opacity-90 backdrop-blur-md" : "py-6 h-32"
//       }`}
//     >
//       <div className="flex flex-col flex-1 min-w-0">
//         <h1
//           className={`font-bold dark:text-white truncate transition-all duration-300 ${
//             isShrunk ? "text-lg sm:text-xl" : "text-xl sm:text-4xl"
//           }`}
//         >
//           {title}
//         </h1>
//         <div 
//           className={`flex items-center font-medium gap-2 text-gray-500 overflow-hidden transition-all duration-300 ${
//             isShrunk ? "h-0 opacity-0" : "h-6 opacity-100 mt-1 text-[10px] sm:text-sm"
//           }`}
//         >
//           <p>{release_date}</p>
//           <span>•</span>
//           <p>PG-13</p>
//           <span>•</span>
//           <p>{formatTime(runtime)}</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-1 shrink-0">
//         <FaStar className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5" />
//         <div className="flex flex-col items-end">
//           <p className={`font-bold dark:text-white ${isShrunk ? "text-sm" : "text-base sm:text-lg"}`}>
//             {vote_average?.toFixed(1)}
//             <span className="text-gray-400 font-normal text-xs">/10</span>
//           </p>
//           {!isShrunk && (
//             <p className="text-[10px] text-gray-400">{vote_count?.toLocaleString()}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }