import React from 'react'
import Image from "next/image";
import { MovieCard } from "./MovieCard";

export type Movie={
  id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    backdrop_path:string;
    overview: string;
}

export const fetchfromUpcomingMovieDB = async (category: string)=>{
      const response = await fetch(`https://api.themoviedb.org/3/movie/${category}`,
    {
      method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`
    },
});
const data = await response.json();
return data.results;
};

 const Upcoming = async()=>{
   const upcomingMovies: Movie[] = await fetchfromUpcomingMovieDB("upcoming");
   console.log(upcomingMovies);
   
  return (
    <div>
       <h3 className="font-semibold text-2xl text-black pr-20 pl-20 pb-5">Upcoming movies</h3>
      <div className="grid grid-cols-5 pr-20 pl-20 h-244.5 w-full">
        {upcomingMovies.slice(0,10).map((movie)=>(
          <MovieCard movie={movie} key={movie.id} />))}
      </div>
    </div>
  )
}
export default Upcoming;
