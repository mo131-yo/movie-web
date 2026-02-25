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
         <div className="text-[30px] flex justify-start font-semibold pt-10 pl-25 ">
            <h2>{movieCategory}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 pt-10 pr-10 pl-10 gap-8">
            {movies.map((movie)=> (
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
      <div className="py-10">
        <DynamicPagination totalPages={10} />
      </div>
    </div>
  );
}