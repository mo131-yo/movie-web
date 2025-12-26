import { MovieCard } from "@/app/components/MovieCard";
import { fetchfromMovieDb } from "@/app/components/Popular";
import { fetchfromTopRatedMovieDB} from "@/app/components/Toprated";
import { fetchfromUpcomingMovieDB } from "@/app/components/Upcoming";
import { Movie } from "@/app/page";

export default async function Page ({
    params,
}:{
    params: Promise<{movieCategory : string}>;
}) 
{
    const {movieCategory}= await params;
        const movies: Movie[] = await fetchfromMovieDb(movieCategory);
        const topratingMovies: Movie[] = await fetchfromTopRatedMovieDB(movieCategory);
           const upcomingMovies: Movie[] = await fetchfromUpcomingMovieDB(movieCategory);
        
    return(
      <div>
        <div className="grid grid-cols-5 pr-20 pl-20 w-full pt-20 pb-20 gap-15">
            {movies.map((movie)=> (
                <MovieCard key={movie.id}  movie={movie}/>
            ))}
        </div>
      </div>
    )
}