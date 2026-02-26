import { DynamicPagination } from "@/app/components/DynamicPagination";
import { MovieCard } from "@/app/components/MovieCard";
import MovieGenrePage from "@/app/components/MovieGenrePage";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function GenreDetailPage({ params, searchParams }: Props) {
 const { id } = await params;

// 'NaN' эсвэл 'undefined' гэсэн текстийг URL-аас цэвэрлэх
const cleanId = id.replace(/NaN,?/g, "").replace(/undefined,?/g, "").replace(/^,|,$/g, "");
const finalId = (cleanId === "" || cleanId === "all") ? "" : cleanId;
  const sParams = await searchParams;
  const currentPage = Number(sParams.page) || 1;

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${finalId}&language=en-US&page=${currentPage}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      },
    }
  );
  
  const data = await res.json();
  const movies = data.results || [];
  const totalMovies = data.total_results || 0;
  
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages;

//   return (
//     <div className="p-4 sm:p-6 lg:p-10">
//       <h1 className="text-3xl sm:text-2xl font-bold mb-6">
//         Search filter
//         <div className="border-b mt-2 w-full"></div>
//       </h1>
//       <div className="flex flex-col lg:flex-row gap-10">
//         <div className="w-full lg:w-72 xl:w-80 shrink-0">
//           <p className="text-2xl font-semibold">Genres</p>
//           <p className="text-base font-normal mb-4">See lists of movies by genre</p>
//           <MovieGenrePage />
//         </div>
//         <div className="flex-1">
//           <p className="text-sm text-black font-semibold mb-6">
//             Total movies: {totalMovies.toLocaleString()}
//           </p> 
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
//             {movies.map((movie: any) => ( 
//               <MovieCard key={movie.id} movie={movie} />
//             ))}
//           </div>
//           <div className="mt-10">
//             <DynamicPagination totalPages={totalPages} genreId={id}/>
//           </div>
//         </div>
//       </div>
//     </div>
//   );  
// }


return (
    <div className="p-4 sm:p-6 lg:p-10">
      <h1 className="text-3xl sm:text-2xl font-bold mb-6">
        Search filter
        <div className="border-b mt-2 w-full"></div>
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-72 xl:w-80 shrink-0">
          <p className="text-2xl font-semibold">Genres</p>
          <p className="text-base font-normal mb-4">See lists of movies by genre</p>
          <MovieGenrePage />
        </div>

        <div className="flex-1">
          {/* 1. Кино олдсон эсэхийг шалгах */}
          {movies.length > 0 ? (
            <>
              <p className="text-sm text-black font-semibold mb-6">
                Total movies: {totalMovies.toLocaleString()}
              </p> 
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
                {movies.map((movie: any) => ( 
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
              <div className="mt-10">
                {/* genreId-г заавал дамжуулна */}
                <DynamicPagination totalPages={totalPages} genreId={finalId} />
              </div>
            </>
          ) : (
            /* 2. Кино олдоогүй үед харагдах хэсэг */
            <div className="flex flex-col items-center justify-center w-full py-50 bg-gray-200 rounded-lg border dark:bg-gray-800">
              <p className="text-xl font-medium text-black">
                Ene turliin kino oldsongui
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Turluu shalgaad dahiad haij uzne uu
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );   
}