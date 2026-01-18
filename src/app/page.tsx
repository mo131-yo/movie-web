import { Button } from "@/components/ui/button";
import Popular from "./components/Popular";
import Upcoming from "./components/Upcoming";
import {Toprated} from "./components/Toprated";
import { Scroll } from "./components/Scroll";
import Link from "next/link";
import { HiArrowSmallRight } from "react-icons/hi2";
export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
};
export default async function Home() {
  return (
    <div >
      <Scroll />
      <Link
        href="/category/popular"
        className="flex flex-row-reverse pt-4 pb-4 pl-6 pr-6"
      >
        <Button className="w-30 h-9 mt-8 hover:bg-gray-600 hover:text-white">See More
          <HiArrowSmallRight />
        </Button>
      </Link>
      <Popular />
      <Link
        href="/category/upcoming"
        className="flex flex-row-reverse pt-2 pb-2 pl-4 pr-4 "
      >
        <Button className="w-30 h-9 mt-8 hover:bg-gray-600 hover:text-white">See More
          <HiArrowSmallRight />
        </Button>
      </Link>
      <Upcoming />
      <Link
        href="/category/top_rated"
        className="flex flex-row-reverse pt-2 pb-2 pl-4 pr-4"
      >
        <Button className="w-30 h-9 mt-8 hover:bg-gray-600 hover:text-white">See More
          <HiArrowSmallRight />
        </Button>
      </Link>
      <Toprated />
    </div>
  );
}

