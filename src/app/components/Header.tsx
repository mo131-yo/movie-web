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
import Phonegenre from "./PhoneGenre";
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
    <div className="h-16 w-full px-4 md:px-16 flex justify-between items-center bg-white dark:bg-black sticky top-0 z-100 border-b dark:border-gray-800 transition-colors">
      
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
              className="relative sm:hidden right-30"
            >
              <Phonegenre />
            </motion.div>
          )}
        </AnimatePresence>

        <div 
          className={`relative flex items-center bg-gray-100 dark:bg-gray-800 rounded-full transition-all duration-500 border-2 ${
            isFocused 
              ? "w-50 max-w-150 relative right-60 sm:right-0 border-indigo-500 ring-4 ring-indigo-500/10 shadow-lg" 
              : "w-10 h-10 relative left-30 sm:w-64 lg:left-0 border-transparent cursor-pointer sm:cursor-text"
          }`}
          onClick={() => !isFocused && setIsFocused(true)}
        >
          <Search className={`ml-2 w-5 h-5 shrink-0 ${isFocused ? "text-indigo-500" : "text-gray-400"}`} />
          
          <input 
            type="text" 
            placeholder="Search the movie..."
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
          <button onClick={(e) => { e.stopPropagation(); setSearchValue(""); setIsFocused(false); }}className="mr-3 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
            <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
           </button>
)}
         <div className="relative top-20 right-80">
           {isFocused && searchValue && (
               <SearchResult keyword={searchValue} results={results} onClose={() => setSearchValue("")} />
          )}
         </div>
        </div>
      </div>
      <div className={`flex items-center gap-2 transition-all duration-300${isFocused 
    ? "opacity-0 scale-0 pointer-events-none w-0 sm:opacity-100 sm:scale-100 sm:w-auto"
    : "opacity-100 scale-100 flex"
  }
`}>
  <div className="dark:hover:bg-blue-700 rounded-full">
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon" className="rounded-full shrink-0">
        <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 " />
        <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="z-110">
      <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  </div>
</div>
    </div>
  );
};