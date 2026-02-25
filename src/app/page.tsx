// import { Button } from "@/components/ui/button";
// import Popular from "./components/Popular";
// import Upcoming from "./components/Upcoming";
// import {Toprated} from "./components/Toprated";
// import { Scroll } from "./components/Scroll";
// import Link from "next/link";
// import { HiArrowSmallRight } from "react-icons/hi2";
// // import { FollowSection } from "./components/FollowSection";
// export type Movie = {
//   id: number;
//   title: string;
//   poster_path: string;
//   vote_average: number;
//   overview: string;
// };
// export default async function Home() {
//   return (
//     <div >
//       <Scroll />
//       <Link
//         href="/category/popular"
//         className="flex flex-row-reverse pt-4 pb-4 pl-6 pr-6"
//       >
//         <Button className="w-30 h-9 mt-8 hover:bg-gray-600 hover:text-white">See More
//           <HiArrowSmallRight />
//         </Button>
//       </Link>
//       <Popular />
//       <Link
//         href="/category/upcoming"
//         className="flex flex-row-reverse pt-2 pb-2 pl-4 pr-4 "
//       >
//         <Button className="w-30 h-9 mt-8 hover:bg-gray-600 hover:text-white">See More
//           <HiArrowSmallRight />
//         </Button>
//       </Link>
//       <Upcoming />
//       <Link
//         href="/category/top_rated"
//         className="flex flex-row-reverse pt-2 pb-2 pl-4 pr-4"
//       >
//         <Button className="w-30 h-9 mt-8 hover:bg-gray-600 hover:text-white">See More
//           <HiArrowSmallRight />
//         </Button>
//       </Link>
//       <Toprated />
//     </div>
//   );
// }


import { Button } from "@/components/ui/button";
import Popular from "./components/Popular";
import Upcoming from "./components/Upcoming";
import { Toprated } from "./components/Toprated";
import { Scroll } from "./components/Scroll";
import Link from "next/link";
import { HiArrowSmallRight } from "react-icons/hi2";
import { CursorFollower } from "@/app/components/CursonFollower";

export default async function Home() {
  return (
    <div className="relative">
      <CursorFollower />
      <Scroll />
      <div className="space-y-10">
        <section>
          <Link href="/category/popular" className="flex justify-end px-4 sm:px-8 lg:px-20">
            <Button className="w-30 h-9 mt-8 hover:bg-gray-600 hover:text-white flex items-center gap-1">
              See More <HiArrowSmallRight />
            </Button>
          </Link>
          <Popular />
        </section>

        <section>
          <Link href="/category/upcoming" className="flex justify-end px-4 sm:px-8 lg:px-20">
            <Button className="w-30 h-9 mt-8 hover:bg-gray-600 hover:text-white flex items-center gap-1">
              See More <HiArrowSmallRight />
            </Button>
          </Link>
          <Upcoming />
        </section>

        <section>
          <Link href="/category/top_rated" className="flex justify-end px-4 sm:px-8 lg:px-20">
            <Button className="w-30 h-9 mt-8 hover:bg-gray-600 hover:text-white flex items-center gap-1">
              See More <HiArrowSmallRight />
            </Button>
          </Link>
          <Toprated />
        </section>
      </div>
    </div>
  );
}