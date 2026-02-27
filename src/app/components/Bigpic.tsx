"use client";

import Image from "next/image";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
};

type BigpicProps = {
  movie: Movie;
};

export const Bigpic = ({ movie }: BigpicProps) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  const handleTrailerClick = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    const trailer = data.results.find(
      (v: any) => v.type === "Trailer" && v.site === "YouTube"
    );

    if (trailer) {
      setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
    }
  };

  return (
    <div className="w-full">
      <style>{`
      .btn-12{
        position: relative;
        right: 20px;
        bottom: 20px;
        border:none;
        box-shadow: none;
        width: 130px;
        height: 40px;
        line-height: 42px;
        -webkit-perspective: 230px;
        perspective: 230px;
      }
      .btn-12 span {
        background: rgb(0,172,238);
      background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%);
        display: block;
        position: absolute;
        width: 130px;
        height: 40px;
        box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
        7px 7px 20px 0px rgba(0,0,0,.1),
        4px 4px 5px 0px rgba(0,0,0,.1);
        border-radius: 5px;
        margin:0;
        text-align: center;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-transition: all .3s;
        transition: all .3s;
      }
      .btn-12 span:nth-child(1) {
        box-shadow:
        -7px -7px 20px 0px #fff9,
        -4px -4px 5px 0px #fff9,
        7px 7px 20px 0px #0002,
        4px 4px 5px 0px #0001;
        -webkit-transform: rotateX(90deg);
        -moz-transform: rotateX(90deg);
        transform: rotateX(90deg);
        -webkit-transform-origin: 50% 50% -20px;
        -moz-transform-origin: 50% 50% -20px;
        transform-origin: 50% 50% -20px;
      }
      .btn-12 span:nth-child(2) {
        -webkit-transform: rotateX(0deg);
        -moz-transform: rotateX(0deg);
        transform: rotateX(0deg);
        -webkit-transform-origin: 50% 50% -20px;
        -moz-transform-origin: 50% 50% -20px;
        transform-origin: 50% 50% -20px;
      }
      .btn-12:hover span:nth-child(1) {
        box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
        7px 7px 20px 0px rgba(0,0,0,.1),
        4px 4px 5px 0px rgba(0,0,0,.1);
        -webkit-transform: rotateX(0deg);
        -moz-transform: rotateX(0deg);
        transform: rotateX(0deg);
      }
      .btn-12:hover span:nth-child(2) {
        box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
        7px 7px 20px 0px rgba(0,0,0,.1),
        4px 4px 5px 0px rgba(0,0,0,.1);
      color: transparent;
        -webkit-transform: rotateX(-90deg);
        -moz-transform: rotateX(-90deg);
        transform: rotateX(-90deg);
      }
      `}
      </style>
      <style  >{`
        .custom-btn {
          width: 140px;
          height: 45px;
          color: #fff;
          border-radius: 5px;
          font-family: 'Lato', sans-serif;
          font-weight: 500;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
          outline: none;
          border: none;
        }
        .btn-6 {
          background: radial-gradient(circle, rgba(247,150,192,1) 0%, rgba(118,174,241,1) 100%);
          line-height: 45px;
          padding: 0;
        }
        .btn-6 span {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
        }
        .btn-6:hover {
          background: transparent;
          color: #76aef1;
        }
          .btn-6:before,
        .btn-6:after {
          position: absolute;
          content: "";
          height: 0%;
          width: 1px;
        box-shadow:
          -1px -1px 20px 0px rgba(255,255,255,1),
          -4px -4px 5px 0px rgba(255,255,255,1),
          7px 7px 20px 0px rgba(0,0,0,.4),
          4px 4px 5px 0px rgba(0,0,0,.3);
        }
        .btn-6:before {
          right: 0;
          top: 0;
          transition: all 500ms ease;
        }
        .btn-6:after {
          left: 0;
          bottom: 0;
          transition: all 500ms ease;
        }
        .btn-6:hover{
          background: transparent;
          color: #76aef1;
          box-shadow: none;
        }
        .btn-6:hover:before {
          transition: all 500ms ease;
          height: 100%;
        }
        .btn-6:hover:after {
          transition: all 500ms ease;
          height: 100%;
        }
        .btn-6 span:before,
        .btn-6 span:after {
          position: absolute;
          content: "";
          box-shadow:
          -1px -1px 20px 0px rgba(255,255,255,1),
          -4px -4px 5px 0px rgba(255,255,255,1),
          7px 7px 20px 0px rgba(0,0,0,.4),
          4px 4px 5px 0px rgba(0,0,0,.3);
        }
        .btn-6 span:before {
          left: 0;
          top: 0;
          width: 0%;
          height: .5px;
          transition: all 500ms ease;
        }
        .btn-6 span:after {
          right: 0;
          bottom: 0;
          width: 0%;
          height: .5px;
          transition: all 500ms ease;
        }
        .btn-6 span:hover:before {
          width: 100%;
        }
        .btn-6 span:hover:after {
          width: 100%;
        }
      `}</style>
      <style>
              {`@keyframes aitf {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
          }
             .animated-text-title {
            background: url(https://thumbcdn.123freevectors.com/wp-content/resized/150612-cool-blue-diagonal-shiny-lines-background-vector-art.webp) repeat-x;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: aitf 10s linear infinite;
            -webkit-transform: translate3d(0,0,0);
            backface-visibility: hidden;
          }
            .animated-button {
            color: #fff;
            border-radius: 5px;
            padding: 10px 25px;
            font-family: 'Lato', sans-serif;
            font-weight: 500;
            background: transparent;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            display: inline-block;
            box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
            7px 7px 20px 0px rgba(0,0,0,.1),
            4px 4px 5px 0px rgba(0,0,0,.1);
            outline: none;}
          `}
      </style>
      <div className="relative w-full h-130 sm:h-162.5 md:h-180">
        {trailerUrl && (
          <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
            <button onClick={() => setTrailerUrl(null)} className="absolute top-4 right-4 text-white text-3xl">
              <IoClose />
            </button>

            <iframe
              src={trailerUrl}
              allowFullScreen
              className="w-[90%] max-w-4xl h-65 sm:h-105 rounded-lg"
            />
          </div>
        )}
        <Image
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : "/no-image.png"
          }
          alt={movie.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        <div className="hidden sm:block absolute bottom-10 left-10 max-w-xl text-white">
          <p className="text-xs uppercase opacity-80 mb-1">Now Playing</p>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 animated-text-title">{movie.title}</h1>
          <span className="text-yellow-400 font-bold mb-3 block">⭐ {movie.vote_average?.toFixed(1)}</span>
          <p className="text-sm opacity-90 line-clamp-3 mb-4">{movie.overview}</p>

          <div className="flex gap-3">
            {/* <button onClick={handleTrailerClick} className="bg-white text-black px-5 py-2 rounded font-semibold hover:bg-gray-700 hover:text-white "> */}
            <button onClick={handleTrailerClick} className="custom-btn btn-12 ">
               <span>Watch!</span><span>Trailer</span>
            </button>
          </div>
        </div>
      </div>

      <div className="block sm:hidden px-4 py-6 bg-white text-black dark:bg-gray-700">
        <p className="text-xs uppercase opacity-70 mb-1">Now Playing</p>

        <h1 className="text-2xl font-bold mb-2 dark:text-white">{movie.title}</h1>

        <span className="text-yellow-500 font-bold mb-3 block">
          ⭐ {movie.vote_average?.toFixed(1)}
        </span>

        <p className="text-sm text-gray-700 mb-4 leading-relaxe dark:text-white">
          {movie.overview}
        </p>

        <div className="flex gap-3">
          <button onClick={handleTrailerClick} className="bg-black text-white px-5 py-2 rounded font-semibold dark:hover:bg-white dark:hover:text-black animated-button">
             Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};