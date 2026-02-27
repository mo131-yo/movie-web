  import React from "react";
  import { MovieCard } from "./MovieCard";

  export type Movie = {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    backdrop_path: string;
    overview: string;
  };

  export const fetchfromMovieDb = async (category: string, page: number = 1) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
          },
        }
      );

      const data = await response.json();
      return data.results || []; 
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  };

  const Popular = async () => {
    const movies: Movie[] = await fetchfromMovieDb("popular", 1);
return (
    <div className="w-full">
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
            background: url(https://thumbcdn.123freevectors.com/wp-content/resized/150965-light-blue-diagonal-shiny-lines-background.webp) repeat-x;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: aitf 10s linear infinite;
            -webkit-transform: translate3d(0,0,0);
            backface-visibility: hidden;
          }
          `}
      </style>
      <div className="px-4 sm:px-8 lg:px-20 py-6 flex items-center justify-between">
        <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl text-black dark:text-white pb-10 animated-text-title dark:animated-text-title-dark">
          Popular movies
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8 px-4 sm:px-8 lg:px-20 mb-10">
        {movies.slice(0, 10).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Popular;