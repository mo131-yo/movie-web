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
    job: string;
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

    const MovieCrew = async ({ movieId }: Props) => {
    const { crew, cast } = await fetchMovieCharacters(movieId);

    const director = crew.find((c) => c.job === "Director");
    const writers = crew.filter(
        (c) => c.job === "Writer" || c.job === "Screenplay"
    );

    return (
        <div className="mt-8 space-y-6">
        {/* 🎬 Director */}
        {director && (
            <div>
            <p className="text-sm font-semibold mb-2">Director</p>
            <div className="text-center w-24">
                <Image
                src={
                    director.profile_path
                    ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
                    : "/no-avatar.png"
                }
                alt={director.name}
                width={96}
                height={96}
                className="rounded-full object-cover mx-auto aspect-square"
                />
                <p className="text-xs mt-2">{director.name}</p>
            </div>
            </div>
        )}

        {/* ✍️ Writers */}
        {writers.length > 0 && (
            <div>
            <p className="text-sm font-semibold">Writers</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8  gap-4 flex-wrap">
                {writers.slice(0, 2).map((writer) => (
                <div key={writer.id} className="text-center w-24">
                    <Image
                    src={
                        writer.profile_path
                        ? `https://image.tmdb.org/t/p/w185${writer.profile_path}`
                        : "/no-avatar.png"
                    }
                    alt={writer.name}
                    width={96}
                    height={96}
                    className="rounded-full object-cover mx-auto aspect-square"
                    />
                    <p className="text-xs mt-2">{writer.name}</p>
                </div>
                ))}
            </div>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Stars</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-2">
    {cast.slice(0, 5).map((actor: Cast) => (
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
        <p className="text-sm font-semibold mt-2">{actor.name}</p>
        <p className="text-xs text-gray-500">{actor.character}</p>
        </div>
    ))}
    </div>

            </div>
        )}
        </div>
    );
    };

    export default MovieCrew;
