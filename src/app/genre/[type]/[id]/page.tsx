import { DynamicPagination } from "@/app/components/DynamicPagination";
import { MovieCard } from "@/app/components/MovieCard";
import MovieGenrePage from "@/app/components/MovieGenrePage";

type Props = {
  // Хавтасны бүтэц [type]/[id] байгаа тул params-д type орж ирнэ
  params: Promise<{ type: string; id: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function GenreDetailPage({ params, searchParams }: Props) {
  const { type, id } = await params;
  const sParams = await searchParams;
  const currentPage = Number(sParams.page) || 1;

  // 1. ID цэвэрлэх логик
  const cleanId = id.replace(/NaN,?/g, "").replace(/undefined,?/g, "").replace(/^,|,$/g, "");
  const finalId = (cleanId === "" || cleanId === "all") ? "" : cleanId;

  // 2. Төрлөөс хамаарч API endpoint болон жанр шүүлтүүрийг тохируулах
  const isAnime = type === "anime";
  const apiType = isAnime ? "tv" : type; // Anime бол 'tv' API ашиглана
  
  // Анимэ бол Animation (16) жанр дээр сонгосон бусад жанруудыг залгана
  const genreFilter = isAnime 
    ? (finalId ? `16,${finalId}` : "16") 
    : finalId;

  // 3. API Дуудалт
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/${apiType}?with_genres=${genreFilter}&language=en-US&page=${currentPage}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      },
      next: { revalidate: 3600 } // 1 цаг тутамд өгөгдлийг шинэчилнэ
    }
  );
  
  const data = await res.json();
  const results = data.results || [];
  const totalResults = data.total_results || 0;
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages;

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <h1 className="text-3xl sm:text-2xl font-bold mb-6 capitalize">
        {type === "tv" ? "TV Series" : type} Filter
        <div className="border-b mt-2 w-full border-gray-100 dark:border-gray-800"></div>
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Зүүн талын цэс */}
        <div className="w-full lg:w-72 xl:w-80 shrink-0">
          <p className="text-2xl font-semibold">Genres</p>
          <p className="text-base font-normal mb-4 text-gray-500">
            See lists of {type} by genre
          </p>
          <MovieGenrePage />
        </div>

        {/* Баруун талын илэрцүүд */}
        <div className="flex-1">
          {results.length > 0 ? (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-6">
                Total {type}: {totalResults.toLocaleString()}
              </p> 
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
                {results.map((item: any) => ( 
                  <MovieCard key={item.id} movie={item} />
                ))}
              </div>
              <div className="mt-10">
                <DynamicPagination totalPages={totalPages} genreId={id} />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full py-40 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
              <p className="text-xl font-medium">No {type} found</p>
              <p className="text-sm text-gray-400 mt-2">
                Try selecting different genres
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );   
}