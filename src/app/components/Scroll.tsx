import React from "react";
import Image from "next/image";
import { Bigpic } from "./Bigpic";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/ui/Carousel";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
  year: number;
};

const fetchfromNowPlayingMovieDB = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  return data.results;
};

export const Scroll = async () => {
  const nowplayingMovies: Movie[] = await fetchfromNowPlayingMovieDB();

  return (
     <Carousel className="w-full">
  <CarouselContent>
    {nowplayingMovies.map((movie) => (
      <CarouselItem key={movie.id}>
          <Bigpic movie={movie} />
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="left-4" />
  <CarouselNext className="right-4" />
</Carousel>
  );
};


