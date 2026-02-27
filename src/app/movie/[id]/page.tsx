      import Image from "next/image";
      import Link from "next/link";
      import {Same} from "@/app/components/Same"
      import MovieCrew from "@/app/components/MovieCrew";
      import {TrailerModal} from "@/app/components/TrailerModal";
      import TrailerSection from "@/app/components/TrailerSection";
      import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { HiArrowSmallRight } from "react-icons/hi2";

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
    <div className="max-w-full overflow-hidden pl-4">
       <style>{`
          .btn-9 {
          border: none;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .btn-9:after {
          position: absolute;
          content: " ";
          z-index: -1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #1fd1f9;
        background-image: linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%);
          transition: all 0.3s ease;
        }
        .btn-9:hover {
          background: transparent;
          box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
                      -4px -4px 6px 0 rgba(116, 125, 136, .2), 
            inset -4px -4px 6px 0 rgba(255,255,255,.5),
            inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
          color: #fff;
        }
        .btn-9:hover:after {
          -webkit-transform: scale(2) rotate(180deg);
          transform: scale(2) rotate(180deg);
          box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
                      -4px -4px 6px 0 rgba(116, 125, 136, .2), 
            inset -4px -4px 6px 0 rgba(255,255,255,.5),
            inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
        }
        `}
        </style>
       <style>
              {`@keyframes aitf {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
          }
              .animated-text-title-dark {
            background: url(https://thumbcdn.123freevectors.com/wp-content/resized/150964-abstract-light-blue-diagonal-shiny-lines-background-design-template.webp) repeat-x;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: aitf 10s linear infinite;
            -webkit-transform: translate3d(0,0,0);
            backface-visibility: hidden;
          }
             .animated-text-title {
            background: url(https://thumbcdn.123freevectors.com/wp-content/resized/150499-bright-blue-diagonal-shiny-lines-background.webp) repeat-x;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: aitf 10s linear infinite;
            -webkit-transform: translate3d(0,0,0);
            backface-visibility: hidden;
          }
          `}
      </style>
      <div className="flex flex-row justify-between items-start px-4 sm:px-10 lg:px-20 pt-6 sm:pt-10 gap-4">
        <div className="flex flex-col flex-1 min-w-0">
          <h1 className="text-xl sm:text-3xl font-bold dark:text-white wrap-break-word animated-text-title dark:animated-text-title-dark">
            {movie.title}
          </h1>
          <div className="flex items-center font-medium gap-2 text-[10px] sm:text-sm text-gray-500 mt-1">
            <p>{movie.release_date}</p>
            <span>•</span>
            <p>PG</p>
            <span>•</span>
            <p>{formatTime(movie.runtime)}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 shrink-0 px-10">
          <FaStar className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5" />
          <div className="flex flex-col">
            <p className="font-bold text-xs sm:text-base dark:text-white">
              {movie.vote_average.toFixed(1)}<span className="text-gray-400 font-normal">/10</span>
            </p>
            <p className="text-[10px] text-gray-400 text-right">{movie.vote_count}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 p-4 lg:p-20 w-full items-stretch">
        <div className="hidden sm:block shrink-0 w-64 lg:w-80">
          <div className="relative aspect-2/3 overflow-hidden rounded-2xl shadow-2xl border-2 border-white/10">
            <Image
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/no-image.png"}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="hidden sm:block flex-1 relative overflow-hidden rounded-2xl group shadow-lg min-h-[300px]">
          <Image
            src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "/no-image.png"}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
            <div className="flex items-center gap-4 cursor-pointer">
              <TrailerSection movieId={movie.id} title={movie.title} />
              <span className="text-white text-lg font-bold drop-shadow-md">Watch Trailer</span>
            </div>
          </div>
        </div>

        <div className="sm:hidden relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
            <TrailerSection movieId={movie.id} title={movie.title} />
          </div>
        </div>
      </div>

      <div className="mt-2 px-10 lg:px-20 hidden lg:block">
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genres?.map((genre: any) => (
            <Link key={genre.id} href={`/genre/${genre.id}`} className="px-3 py-1 text-xs border border-gray-600 rounded-full hover:bg-white hover:text-black dark:hover:text-black dark:text-white transition-colors">
              {genre.name}
            </Link>
          ))}
        </div>
        <p className="text-gray-400 mt-2 max-w-4xl">{movie.overview}</p>
      </div>

      <div className="flex flex-col px-4 gap-4 sm:hidden">
        <div className="flex flex-row gap-4">
          <div className="relative w-24 h-36 shrink-0 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/no-image.png"}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 min-w-0 px-4 ">
            <div className="flex flex-wrap gap-1">
              {movie.genres?.slice(0, 3).map((genre: any) => (
                <span key={genre.id} className="px-2 py-0.5 text-[10px] border border-gray-600 rounded-full dark:text-white uppercase">
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-xs line-clamp-4 leading-relaxed">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 sm:ml-10 sm:px-10 lg:px-0 mt-10">
        <div className="pl-1 sm:pl-10">
          <MovieCrew movieId={id} />
        </div>
        
        <div className="flex justify-between items-center px-4 sm:px-10 mt-10 pb-4 border-b dark:border-gray-800">
          <h3 className="font-bold text-lg sm:text-2xl dark:text-white">More like this</h3>
          <Link href={`/category/same/${id}`} className="pb-10">
            <Button className="custom-btn btn-9 relative top-5">
              <div className="flex gap-2 items-center justify-center">
                <span>See More</span> 
                <HiArrowSmallRight />
              </div>
            </Button>
          </Link>
        </div>

        <div className="mt-8">
          <Same movieId={id} />
        </div>
      </div>
    </div>
  );
} 