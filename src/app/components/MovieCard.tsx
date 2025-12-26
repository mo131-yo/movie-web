import React from 'react'
import Image from "next/image";
import {Movie} from "../page"

export const MovieCard = ({movie}: {movie: Movie}) => {
      const{title, vote_average} = movie;
      return(
            <div className='bg-gray-200 rounded-lg w-57.5 h-110'>
                 <div className='w-full'>
                   <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={230}
                  height={340}
                  className="rounded-lg" />
                 </div>
                  <div>{title} </div>
                  <div className='flex gap-2'>
                         <img src="star.png" alt="star" className='w-3 h-3 relative top-1.5' />
                        <div>{vote_average ?.toFixed(1)}</div>
                  </div>

            </div>
      )
}
