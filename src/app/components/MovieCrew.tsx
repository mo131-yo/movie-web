        // import Image from "next/image";

        // type Crew = {
        // id: number;
        // name: string;
        // job: string;
        // profile_path: string;
        // };
        // type Cast = {
        // id: number;
        // name: string;
        // job: string;
        // profile_path: string;
        // character: string; 
        // };

        // type Props = {
        // movieId: string;
        // };

        // const fetchMovieCharacters = async (id: string) => {
        // const res = await fetch(
        //     `https://api.themoviedb.org/3/movie/${id}/credits`,
        //     {
        //     headers: {
        //         Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        //     },
        //     }
        // );

        // return res.json() as Promise<{
        //     cast: Cast[];
        //     crew: Crew[];
        // }>;
        // };

        // const MovieCrew = async ({ movieId }: Props) => {
        // const { crew, cast } = await fetchMovieCharacters(movieId);

        // const director = crew.find((c) => c.job === "Director");
        // const writers = crew.filter(
        //     (c) => c.job === "Writer" || c.job === "Screenplay"
        // );

        // return (
        //     <div className="mt-8 space-y-6">
        //     {/* Director */}
        //     {director && (
        //         <div className="flex">
        //         <p className="text-base font-bold text-center">Director</p>
        //         <div className="text-center w-24">
        //             <Image
        //             src={
        //                 director.profile_path
        //                 ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
        //                 : "/no-avatar.png"
        //             }
        //             alt={director.name}
        //             width={96}
        //             height={96}
        //             className="rounded-full object-cover mx-auto aspect-square"
        //             />
        //             <p className="text-xs mt-2">{director.name}</p>
        //         </div>
        //         </div>
        //     )}
        //     <div className="border w-full"></div>
        //   {/* Writers  */}
        //     {writers.length > 0 && (
        //     <div>
        //         <div className="flex">
        //             <p className="text-base font-bold mb-2">Writers</p>
        //         <div className="flex gap-4 flex-wrap">
        //             {writers.slice(0, 2).map((writer) => (
        //             <div key={writer.id} className="text-center w-24 mb-2 ">
        //                 <Image
        //                 src={
        //                     writer.profile_path
        //                     ? `https://image.tmdb.org/t/p/w185${writer.profile_path}`
        //                     : "/no-avatar.png"
        //                 }
        //                 alt={writer.name}
        //                 width={96}
        //                 height={96}
        //                 className="rounded-full object-cover mx-auto aspect-square"
        //                 />
        //                 <p className="text-xs mt-2">{writer.name}</p>
        //             </div>
        //             ))}
        //         </div>
        //         </div>

        //          <div className="border w-full"></div>
        //         {/* Star */}
        //         <div className="flex ">
        //         <h2 className="text-base font-bold mb-2 text-center">Stars</h2>
        //       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        //        {cast.slice(0,4 ).map((actor: Cast) => (
        //        <div key={actor.id} className="text-center">
        //     <Image
        //         src={
        //         actor.profile_path
        //             ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
        //             : "/no-avatar.png"
        //         }
        //         alt={actor.name}
        //         width={96}
        //         height={96}
        //         className="rounded-full object-cover mx-auto aspect-square"
        //     />
        //     <p className="text-sm font-semibold mt-2">{actor.name}</p>
        //     <p className="text-xs text-gray-500">{actor.character}</p>
        //     </div>
        // ))}
        // </div>
        //         </div>
        //          <div className="border w-full mb-12"></div>
        //         </div>
        //     )}
        //     </div>
        // );
        // };

        // export default MovieCrew;


        import Image from "next/image";

type Crew = {
  id: number;
  name: string;
  job: string;
  profile_path: string;
};

type Cast = {
  id: number;
  name: string;
  profile_path: string;
  character: string;
};

type Props = {
  movieId: string;
};

const fetchMovieCharacters = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      },
    }
  );

  return res.json() as Promise<{
    cast: Cast[];
    crew: Crew[];
  }>;
};

const Avatar = ({ src, name }: { src: string | null; name: string }) => (
  <div className="text-center w-24">
    <Image
      src={
        src
          ? `https://image.tmdb.org/t/p/w185${src}`
          : "/no-avatar.png"
      }
      alt={name}
      width={96}
      height={96}
      className="rounded-full object-cover mx-auto aspect-square"
    />
    <p className="text-xs mt-2 text-gray-200">{name}</p>
  </div>
);

const MovieCrew = async ({ movieId }: Props) => {
  const { crew, cast } = await fetchMovieCharacters(movieId);

  const director = crew.find((c) => c.job === "Director");
  const writers = crew.filter(
    (c) => c.job === "Writer" || c.job === "Screenplay"
  );

  return (
    <section className="mt-10 space-y-10">
      {/* Director */}
      {director && (
        <div className="flex items-start gap-6">
          <h3 className="w-28 font-semibold text-gray-300">Director</h3>
          <Avatar src={director.profile_path} name={director.name} />
        </div>
      )}

      <hr className="border-gray-700" />

      {/* Writers */}
      {writers.length > 0 && (
        <div className="flex items-start gap-6">
          <h3 className="w-28 font-semibold text-gray-300">Writers</h3>
          <div className="flex gap-6 flex-wrap">
            {writers.slice(0, 3).map((writer) => (
              <Avatar
                key={writer.id}
                src={writer.profile_path}
                name={writer.name}
              />
            ))}
          </div>
        </div>
      )}

      <hr className="border-gray-700" />

      {/* Stars */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-300">Stars</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
          {cast.slice(0, 6).map((actor) => (
            <div key={actor.id} className="text-center">
              <Image
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : "/no-avatar.png"
                }
                alt={actor.name}
                width={96}
                height={96}
                className="rounded-full object-cover mx-auto aspect-square"
              />
              <p className="text-sm font-medium mt-2 text-white">
                {actor.name}
              </p>
              <p className="text-xs text-gray-400">
                {actor.character}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieCrew;
    