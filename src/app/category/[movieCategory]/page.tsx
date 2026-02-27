import { DynamicPagination } from "@/app/components/DynamicPagination";
import { MovieCard } from "@/app/components/MovieCard";
import { fetchfromMovieDb} from "@/app/components/Popular";

type PageProps = {
  params: Promise<{ movieCategory: string }>;
  searchParams: Promise<{ page?: string }>;
}

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { movieCategory } = await params;
  const sParams = await searchParams;
  const currentPage = Number(sParams.page) || 1;

  const movies: Movie[] = await fetchfromMovieDb(movieCategory, currentPage);

  return (
    <div>
       <style>
              {`@keyframes as {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
          }
              .animated-movie-title {
            background: url(https://thumbcdn.123freevectors.com/wp-content/resized/150558-brown-and-white-diagonal-shiny-lines-background-vector-art.webp) repeat-x;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: aitf 10s linear infinite;
            -webkit-transform: translate3d(0,0,0);
            backface-visibility: hidden;
          }
          `}
      </style>
         <div className="text-[30px] flex justify-start font-semibold pt-10 pl-7">
            <h2 className="animated-movie-title">{movieCategory}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 pt-10 pr-3 pl-3 gap-5">
            {movies.map((movie)=> (
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
      <div className="py-10">
        <DynamicPagination totalPages={10} genreId={movieCategory} />
      </div>
    </div>
  );
}