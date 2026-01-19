// import React from 'react'
// import Image from "next/image";
// import { MovieCard } from "./MovieCard";

// export type Movie={
//   id: number;
//     title: string;
//     poster_path: string;
//     vote_average: number;
//     backdrop_path:string;
//     overview: string;
// }

// export const fetchfromUpcomingMovieDB = async (category: string)=>{
//       const response = await fetch(`https://api.themoviedb.org/3/movie/${category}`,
//     {
//       method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`
//     },
// });
// const data = await response.json();
// return data.results;
// };

//  const Upcoming = async()=>{
//    const upcomingMovies: Movie[] = await fetchfromUpcomingMovieDB("upcoming");
   
//   return (
//     <div>
//        <h3 className="font-semibold text-2xl text-black pr-20 pl-20 pb-5">Upcoming movies</h3>
//       <div className="grid grid-cols-5 pr-20 pl-20 h-244.5 w-full gap-8">
//         {upcomingMovies.slice(0,10).map((movie)=>(
//           <MovieCard movie={movie} key={movie.id} />
//         ))}
//       </div>
//     </div>
//   )
// }
// export default Upcoming;


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

  export const fetchfromUpcomingMovieDB = async (category: string) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        },
        next: { revalidate: 60 },
      }
    );

    const data = await response.json();
    return data.results;
  };

  const Upcoming = async () => {
    const upcomingMovies: Movie[] =
      await fetchfromUpcomingMovieDB("upcoming");

    return (
      <section className="w-full">
        {/* Title */}
        <div className="px-4 sm:px-8 lg:px-20 pb-4 flex items-center justify-between">
          <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl text-black">
            Upcoming movies
          </h3>
        </div>

        {/* Grid */}
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            gap-4
            sm:gap-6
            lg:gap-8
            px-4
            sm:px-8
            lg:px-20
            mb-10
          "
        >
          {upcomingMovies.slice(0, 10).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    );
  };

  export default Upcoming;