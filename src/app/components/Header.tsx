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
        <style>{`.btn-13 {
  background-color: #89d8d3;
background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
  border: none;
  z-index: 1;
}
.btn-13:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  border-radius: 5px;
   background-color: #4dccc6;
background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
  box-shadow:
   -7px -7px 20px 0px #fff9,
   -4px -4px 5px 0px #fff9,
   7px 7px 20px 0px #0002,
   4px 4px 5px 0px #0001;
  transition: all 0.3s ease;
}
.btn-13:hover {
  color: #fff;
}
.btn-13:hover:after {
  top: 0;
  height: 100%;
}
.btn-13:active {
  top: 2px;
}`}</style>
          <style>
              {`@keyframes aitf {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
          }
          .animated-text-fill {
            background: url(https://thumbcdn.123freevectors.com/wp-content/resized/176002-purple-and-white-grunge-watercolour-texture-image.webp) repeat-y;
            -webkit-background-clip: text;    
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: aitf 10s linear infinite;
            -webkit-transform: translate3d(0,0,0);
            backface-visibility: hidden;
          }
             .animated-text-fill-1 {
            background: url(data:image/jpeg;base64,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) repeat-x;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: aitf 10s linear infinite;
            -webkit-transform: translate3d(0,0,0);
            backface-visibility: hidden;
          }`}
      </style>
        <div className={`flex items-center transition-all ${isFocused ? "hidden sm:flex" : "flex"}`}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.25 }}>
              <Link href={"/"} className="flex items-center gap-2">
                <TbMovie className="w-6 h-6 text-indigo-700 animated-text-fill" />
                <div className="hidden sm:block">
                  <div className='flex leading-tight text-2xl font-black italic tracking-tighter'>
                    <p className="animated-text-fill ">Movie</p>
                    <p className="animated-text-fill-1 ml-1">Z</p>  
                   </div>
                </div>
            </Link>
          </motion.div>
        </div>
  <div>
  <div className="flex items-center justify-between w-full gap-2">
      <div className="hidden sm:block">
        <SearchGenre />
      </div>

  <div className={`flex flex-1 items-center justify-end sm:justify-center transition-all duration-500 pl-10 lg:pr-150`}>
    <div 
      className={`relative flex items-center bg-gray-100 dark:bg-gray-800 rounded-full transition-all duration-500 border-2 ${
        isFocused 
          ? "w-52 left-10 sm:left-0 sm:max-w-md border-indigo-500 ring-4 ring-indigo-500/10 shadow-lg" 
          : "w-10 h-10 sm:w-64 border-transparent"
      }`}
      onClick={() => !isFocused && setIsFocused(true)}
    >
  <AnimatePresence>
    {isFocused && (
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}  
        exit={{ opacity: 0, y: -10 }}
        className="fixed right-30 w-full px-4 sm:hidden z-10"
      >
        <Phonegenre />
      </motion.div>
    )}
  </AnimatePresence>
      <Search className={`ml-3 w-5 h-5 shrink-0 ${isFocused ? "text-indigo-500" : "text-gray-400"}`} />
      
      <input 
        type="text"   
        placeholder="Search the movie..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        onChange={handleChange} 
        value={searchValue}
        className={`bg-transparent p-2 outline-none w-full text-sm dark:text-white transition-all duration-300 ${
          isFocused ? "opacity-100 block" : "opacity-0 sm:opacity-100 hidden sm:block"
        }`}
      />

      {isLoading && <Loader className="absolute right-10 w-4 h-4 animate-spin text-indigo-500" />}
      
      {isFocused && (
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            setSearchValue(""); 
            setIsFocused(false); 
          }}
          className="mr-3 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
        >
          <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
        </button>
      )}

      {isFocused && searchValue && (
        <div className="absolute top-12 right-15 sm:left-0 w-full z-50 sm:min-w-100">
          <SearchResult 
            keyword={searchValue} 
            results={results} 
            onClose={() => setSearchValue("")} 
          />
        </div>
      )}
    </div>
  </div>

  <div className={`transition-all duration-300 ${
  isFocused 
    ? "relative left-15 sm:left-0" 
    : "relative"
}`}>
    <div className="dark:hover:bg-blue-700 rounded-full relative">
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
  </div>
      </div>
    );
  };