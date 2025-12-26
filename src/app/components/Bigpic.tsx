import React from 'react'
import Image from "next/image";
import {Movie} from "../page"

export const Bigpic = ({movie}: {movie: Movie}) => {
      const{title, vote_average, overview} = movie;

      return(
            <div className='w-full h-150 rounded-xl relative'>
                 <div className='grid '>
                   <Image src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  fill
                  priority />
                <div className="absolute inset-0 flex flex-col justify-center px-25 text-white max-w-xl ">
                    <div className='w-101 h-66'>
                        <h1 className='text-[16px] font-normal'>Now Playing:</h1>
                        <h1 className="text-4xl font-bold "> {title} </h1>
                        <div className='flex'>
                            <img src="star.png" alt="star" className='w-6 h-6' />
                           <h1 className="text-[18px] font-semibold"> {vote_average  ?.toFixed(1)}/10 </h1>
                       </div>
                      <h1 className="text-[12px] font-normal"> {overview}</h1>
                    </div>
                 </div>
              </div>
            </div>
      )
}