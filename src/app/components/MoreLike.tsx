import { MovieCard } from "./MovieCard";

type Props = {
  movies: Movie[];
};
 export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

export const MoreLike = ({ movies }: Props) => {
  return (
    <div className="grid grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
