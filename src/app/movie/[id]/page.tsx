      import Image from "next/image";
      import Link from "next/link";
      import Same from "@/app/components/Same"
      import { Button } from "@/components/ui/button";
      import { log } from "console";
      import MovieCrew from "@/app/components/MovieCrew";
      import { IdCard } from "lucide-react";
      import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
      import {TrailerModal} from "@/app/components/TrailerModal";
      import TrailerSection from "@/app/components/TrailerSection";
      import { FaStar } from "react-icons/fa";

      export type Movie={
        id: number;
          title: string;
          poster_path: string;
          vote_average: number;
          backdrop_path:string;
          overview: string;
          release_date: number;
          genres: Genre[];
          vote_count: number;
        popularity: number;
        runtime: number;
      }
      type Params ={
        params: Promise<{
          id: string;
        }>;
      }

      type Props = {
        params: {
          id: string;
        };
      };
      type Genre = {
        id: number;
        name: string;
      };

      const formatTime = (minutes: number) => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h}h ${m}m`;
      };
      export const fetchMovieById = async (id: string) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
            },
          }
        );
        return res.json();
      };

        export default async function MoviePage({ params }: Props) {
        const { id } = await params
        const movie = await fetchMovieById(id);

        return (
        <div>
          <div className="flex flex-row justify-around ">
            <div className="flex flex-col">
            <h1 className=" w-[211px] text-2xl sm:text-3xl font-bold dark:text-white">{movie.title}</h1>
            <div className="flex items-center font-medium gap-2 text-xs sm:text-sm text-gray-500 mt-1">
              <p>{movie.release_date}</p>
              <span>•</span>
              <p>PG</p>
              <span>•</span>
              <p>{formatTime(movie.runtime)}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400 w-5 h-5" />
            <div className="flex flex-col">
              <p className="font-bold text-sm sm:text-base dark:text-white">
                {movie.vote_average.toFixed(1)}<span className="text-gray-400 font-normal">/10</span>
              </p>
              <p className="text-[10px] text-gray-400">{movie.vote_count}</p>
            </div>
          </div>
          </div>
          <div>
{/* 
<div className="flex flex-col sm:flex-row gap-6 lg:gap-10 p-4 lg:p-10 hidden lg:block">
  <div className="mx-auto lg:mx-0">
    <div className="relative w-25 sm:w-60 lg:w-72 aspect-[2/3] overflow-hidden rounded-2xl shadow-2xl">
      <Image
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/no-image.png"
        }
        alt={movie.title}
        fill
        className="object-cover"
        />
    </div>
        </div>

  <div className="flex-1 flex flex-col gap-4 hidden lg:block">
    <div className="relative w-190 h-107 sm:h-90 lg:h-107 overflow-hidden rounded-2xl group">
      <Image
        src={
          movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : "/no-image.png"
        }
        alt={movie.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-end">
        <div className="flex flex-col items-center gap-2 cursor-pointer">
            <TrailerSection movieId={movie.id} title={movie.title} />
          <span className="px-4 py-1 rounded-full text-sm font-medium">
            Play Trailer
          </span>
        </div>
      </div>
    </div>
  </div>
</div> */}
<div className="flex flex-col lg:flex-row gap-6 lg:gap-10 p-4 lg:p-10 w-full items-stretch">
  
  <div className="flex-shrink-0 w-full sm:w-64 lg:w-80">
    <div className="relative aspect-[2/3] overflow-hidden hidden sm:block rounded-2xl shadow-2xl border-2 border-white/10">
      <Image
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/no-image.png"
        }
        alt={movie.title}
        fill
        className="object-cover"
      />
    </div>
  </div>

  <div className="hidden sm:block sm:flex flex-1 relative overflow-hidden rounded-2xl group shadow-lg min-h-[300px] lg:min-h-full">
    <Image
      src={
        movie.backdrop_path
          ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
          : "/no-image.png"
      }
      alt={movie.title}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
    
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 lg:p-10">
      <div className="flex items-center gap-4 cursor-pointer">
          <TrailerSection movieId={movie.id} title={movie.title} />
        <div className="flex flex-col">
          <span className="text-white text-lg font-bold drop-shadow-md">
            Watch Trailer
          </span>
          <span className="text-white/70 text-sm hidden lg:block">
             Official video for {movie.title}
          </span>
        </div>
      </div>
    </div>
  </div>

  {/* Гар утсанд зориулсан Backdrop (Хэрэв утсан дээр тусад нь харуулмаар байвал) */}
  <div className="sm:hidden relative w-full aspect-video rounded-xl overflow-hidden">
     <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        fill
        className="object-cover"
      />
       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 lg:p-10">
      <div className="flex items-center gap-4 cursor-pointer">
          <TrailerSection movieId={movie.id} title={movie.title} />
        <div className="flex flex-col">
        </div>
      </div>
    </div>
  </div>
</div>
    <div className="mt-2 mr-10 ml-10 hidden lg:block">
      <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
        {movie.title}
      </h1>
      <p className="text-gray-400 mt-2 line-clamp-3">
        {movie.overview}  
      </p>
    </div>
    </div>

    <div className="flex flex-row pl-10 rounded sm:hidden">
        <div className="relative w-25 h-27 rounded-2xl shadow-2xl">
      <Image
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/no-image.png"
        }
        alt={movie.title}
        fill
        className="object-cover"
      />
    </div>
      <div className="w-50 pl-10">
          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres?.map((genre: any) => (
              <Link
                key={genre.id}
                href={`/genre/${genre.id}`}
                className="px-3 py-1 text-xs border border-gray-600 rounded-full dark:text-white hover:bg-white hover:text-black transition-colors"
              >
                {genre.name}
              </Link>
            ))}
          </div>

          {/* Overview */}
          <div className="w-51">
            <h2 className="text-xl font-bold mb-2 dark:text-white hidden lg:block">Overview</h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              {movie.overview}
            </p>
          </div>
    </div>
     </div>

      <div className="mt-8">
    <MovieCrew movieId={id}/>

    <div className="flex justify-between items-center pl-10 pr-10 pt-18 pb-4 border-b dark:border-gray-800">
      <h3 className="font-bold text-lg sm:text-2xl dark:text-white">More like this</h3>
      <Link href={`/category/same/${id}`} className="flex items-center justify-center gap-1 text-sm font-medium bg-white text-black rounded w-30">
        See more <span className="text-lg">→</span>
      </Link>
    </div>

    <div className="mt-16">
      <Same movieId={id} />
    </div>
  </div>
</div>
        );
      };

