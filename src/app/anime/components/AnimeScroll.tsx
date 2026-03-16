import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/ui/Carousel";
import { AnimePic } from "./Anime";
export type Anime = {
  mal_id: number;
  title: string;
  images: {
    jpg: { large_image_url: string };
  };
  score: number;
  synopsis: string;
  trailer: { youtube_id: string };
};

const fetchTopAnime = async () => {
  const response = await fetch(
    "https://api.jikan.moe/v4/top/anime?filter=airing&limit=5", 
    { next: { revalidate: 3600 } }
  );
  const data = await response.json();
  
  return data.data.map((item: any) => ({
    mal_id: item.mal_id,
    title: item.title,
    images: item.images,
    score: item.score,
    synopsis: item.synopsis,
    trailer: { youtube_id: item.trailer.youtube_id }
  }));
};

export const Scroll = async () => {
  const topAnime: Anime[] = await fetchTopAnime();

  return (
    <section className="relative w-full overflow-hidden">
      <Carousel 
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {topAnime.map((anime) => (
            <CarouselItem key={anime.mal_id} className="pl-0 basis-full">
              <AnimePic anime={anime} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-20 pointer-events-none">
          <CarouselPrevious className="static pointer-events-auto bg-black/20 hover:bg-black/60 border-none text-white h-12 w-12" />
          <CarouselNext className="static pointer-events-auto bg-black/20 hover:bg-black/60 border-none text-white h-12 w-12" />
        </div>
      </Carousel>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent z-10" />
    </section>
  );
};