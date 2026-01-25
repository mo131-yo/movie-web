//   "use client";
//   import React, { ChangeEvent, useState } from "react";
//   import { usePathname, useRouter } from "next/navigation";
//   import { SearchResult } from "./SearchResult";
//   import useSWR from "swr";
//   import { fetcher } from "../utils/fetcher";
//   import { Loader } from "lucide-react";
//   import { TbMovie } from "react-icons/tb";
//   import { Moon, Sun } from "lucide-react";
//   import { Button } from "@/components/ui/button";
//   import { SlArrowDown } from "react-icons/sl";
//   import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
//   import { useTheme } from "next-themes";
//   import Link from "next/link";
//   import { motion } from "framer-motion"; 
//   import SearchGenre from "./SearchGenre";

//   type Movie = {
//     id: number;
//     title: string;
//     poster_path: string;
//     vote_average: number;
//     backdrop_path: string;
//     overview: string;
//   };

//   type Props = {
//     id: string;
//     keyword: string;
//     results: Movie[];
//     onClose: () => void;
//   };
//   export const Header = () => {
//     const variantType: "default" | "outline" | "secondary" | "destructive" =
//       "outline";
//     const [searchValue, setSearchValue] = useState("");
//     const { data, isLoading } = useSWR(
//       `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
//       fetcher
//     );

//     const results = data?.results ?? [];

//     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//       setSearchValue(event.target.value);
//     };

//   const { theme, setTheme } = useTheme();
//   const [isGenreOpen, setIsGenreOpen] = useState(false);
//   const [isFocused, setIsFocused] = useState(false)
//   return (
//     <div className="h-16 w-full px-16 flex justify-between items-center transition-colors">
//       <div className="flex flex-row w-100 justify-center gap-3">
//           <motion.div
//         whileHover={{ scale: 1.05 }}
//         className="relative w-60 rounded-xl sm:w-20"
//         transition={{ duration: 0.25 }}>
//         <Link href={"/"} className="flex gap-3 pl-4">
//          <TbMovie className="w-5 h-5 text-indigo-700 relative top-1"/>
//          <p className="text-indigo-700 font-bold text-lg">Movie Z</p>
//         </Link>
//         </motion.div>
//       </div>
//       <SearchGenre/>
//       <div className="w-full flex justify-center relative gap-3" >
//         {/* {Search heseg} */}
//          <div className="w-full relative flex items-center hidden sm:block">
//           <input type="text" className="border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white sm:w-92" placeholder="Хайх" onChange={handleChange} value={searchValue}/>
//           {isLoading && <Loader className="absolute right-2 top-2" />}
//           <SearchResult keyword={searchValue} results={results} onClose={() => setSearchValue("")}/>
//       </div>
//       </div>
//       <div>
//          <div className="w-full relative flex items-center hidden sm:block">
//           <input type="text" className="border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white sm:w-92" placeholder="Хайх" onChange={handleChange} value={searchValue}/>
//           {isLoading && <Loader className="absolute right-2 top-2" />}
//           <SearchResult keyword={searchValue} results={results} onClose={() => setSearchValue("")}/>
//       </div>
//       </div>
//     {/* {Dark Mode} */}
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline" size="icon">
//             <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
//             <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
//             <span className="sr-only">Toggle theme</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
//           <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
//           <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>

//   );
// }


"use client";
import React, { ChangeEvent, useState } from "react";
import { SearchResult } from "./SearchResult";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { Loader, Search, Moon, Sun, X } from "lucide-react";
import { TbMovie } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; 
import SearchGenre from "./SearchGenre";

export const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { theme, setTheme } = useTheme();

  const { data, isLoading } = useSWR(
    searchValue 
      ? `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1` 
      : null,
    fetcher
  );

  const results = data?.results ?? [];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <nav className="h-16 w-full px-4 md:px-16 flex justify-between items-center bg-white dark:bg-black sticky top-0 z-[100] border-b dark:border-gray-800 transition-colors">
      
      <div className={`flex items-center transition-all ${isFocused ? "hidden sm:flex" : "flex"}`}>
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.25 }}>
          <Link href={"/"} className="flex items-center gap-2">
            <TbMovie className="w-6 h-6 text-indigo-700" />
            <p className="text-indigo-700 font-bold text-lg hidden md:block">Movie Z</p>
          </Link>
        </motion.div>
      </div>

      <div className="flex flex-1 justify-center items-center gap-2 px-2 relative ">
       <div className="hidden sm:block">
         <SearchGenre />
       </div>
        <AnimatePresence>
          {isFocused && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="hidden"
            >
              <SearchGenre />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Container */}
        <div 
          className={`relative flex items-center bg-gray-100 dark:bg-gray-800 rounded-full transition-all duration-500 border-2 ${
            isFocused 
              ? "w-60 max-w-[600px] relative right-70 border-indigo-500 ring-4 ring-indigo-500/10 shadow-lg" 
              : "w-10 h-10 relative left-30 sm:w-64 border-transparent cursor-pointer sm:cursor-text"
          }`}
          onClick={() => !isFocused && setIsFocused(true)}
        >
          <Search className={`ml-2 w-5 h-5 flex-shrink-0 ${isFocused ? "text-indigo-500" : "text-gray-400"}`} />
          
          <input 
            type="text" 
            placeholder="Кино хайх..."
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onChange={handleChange} 
            value={searchValue}
            className={`bg-transparent p-2 outline-none w-full text-sm dark:text-white transition-opacity duration-300 ${
              isFocused ? "opacity-100 block" : "opacity-0 sm:opacity-100 hidden sm:block"
            }`}
          />

          {isLoading && <Loader className="absolute right-3 w-4 h-4 animate-spin text-indigo-500" />}
          {isFocused && (
    <button 
      onClick={(e) => {
        e.stopPropagation(); // Эцэг div-ийн onClick-ийг ажиллуулахгүй байх
        setSearchValue("");   // Текстийг арилгах
        setIsFocused(false);  // Хайлтын талбарыг жижигсгэх
      }}
      className="mr-3 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
    >
      <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
    </button>
  )}

          {/* Хайлтын Илэрц: Dropdown */}
         <div className="relative top-20 right-95">
           {isFocused && searchValue && (
               <SearchResult keyword={searchValue} results={results} onClose={() => setSearchValue("")} />
          )}
         </div>
        </div>
      </div>

      {/* 3. SETTINGS & THEME: Хайлт идэвхтэй үед Mobile дээр нуугдана */}
      {/* <div className={`items-center gap-4 ${isFocused ? "relative right-70 sm:flex" : "flex"}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
      <div className={`
  flex items-center gap-2 transition-all duration-300
  ${isFocused 
    ? "opacity-0 scale-0 pointer-events-none w-0 sm:opacity-100 sm:scale-100 sm:w-auto" // Mobile-д хайлт хийх үед цэвэрхэн алга болно
    : "opacity-100 scale-100 flex"
  }
`}>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon" className="rounded-full flex-shrink-0">
        <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="z-[110]">
      <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
    </nav>
  );
};