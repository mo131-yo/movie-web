import { Button } from "@/components/ui/button";
import Popular from "./components/Popular";
import Upcoming from "./components/Upcoming";
import { Toprated } from "./components/Toprated";
import { Scroll } from "./components/Scroll";
import Link from "next/link";
import { HiArrowSmallRight } from "react-icons/hi2";
import { CursorFollower } from "@/app/components/CursonFollower";
import Anime from "./components/Anime";
import Manga from "./components/Manga";
import TV from "./components/TV";
import Hero from "./components/Hero";
import MovieMap from "./components/MovieMap";

export default async function Home() {
  return (
    <div className="relative min-h-screen bg-[#1d1d27]">
      <Scroll />
      
        {/* <Hero /> */}
        
          {/* <Anime />
      <TV /> */}
      <div className="space-y-10 pb-20 mt-10">
        <section>
          <div className="flex justify-end px-4 sm:px-8 lg:px-20 mb-[-40px]">
            <Link href="/category/popular">
              <Button className="custom-btn btn-9 text-white">
                <div className="flex gap-2 items-center justify-center">
                  <span>See More</span> <HiArrowSmallRight />
                </div>
              </Button>
            </Link>
          </div>
          <Popular />
        </section>
        <section>
          <div className="flex justify-end px-4 sm:px-8 lg:px-20 mb-[-40px]">
            <Link href="/category/upcoming">
              <Button className="custom-btn btn-9 text-white">
                <div className="flex gap-2 items-center justify-center">
                  <span>See More</span> <HiArrowSmallRight />
                </div>
              </Button>
            </Link>
          </div>
          <Upcoming />
        </section>

        <section>
          <div className="flex justify-end px-4 sm:px-8 lg:px-20 mb-[-40px]">
            <Link href="/category/top_rated">
              <Button className="custom-btn btn-9 text-white">
                <div className="flex gap-2 items-center justify-center">
                  <span>See More</span> <HiArrowSmallRight />
                </div>
              </Button>
            </Link>
          </div>
          <Toprated />
        </section>
        {/* <Manga />
        <MovieMap/> */}
      </div>
    </div>
  );
}