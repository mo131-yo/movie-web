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
            <style>{`
                .btn-9 {
                border: none;
                transition: all 0.3s ease;
                overflow: hidden;
              }
              .btn-9:after {
                position: absolute;
                content: " ";
                z-index: -1;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #1fd1f9;
              background-image: linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%);
                transition: all 0.3s ease;
              }
              .btn-9:hover {
                background: transparent;
                box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
                            -4px -4px 6px 0 rgba(116, 125, 136, .2), 
                  inset -4px -4px 6px 0 rgba(255,255,255,.5),
                  inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
                color: #fff;
              }
              .btn-9:hover:after {
                -webkit-transform: scale(2) rotate(180deg);
                transform: scale(2) rotate(180deg);
                box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
                            -4px -4px 6px 0 rgba(116, 125, 136, .2), 
                  inset -4px -4px 6px 0 rgba(255,255,255,.5),
                  inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
              }
              `}
              </style>
      <CursorFollower />
      <Scroll />
      <div className="space-y-10">
        <section>
          <Link href="/category/popular" className="flex justify-end px-4 sm:px-8 lg:px-20">
            <Button className="custom-btn btn-9 relative top-10">
              <div className="flex gap-2 items-center justify-center">
                <span>See More</span> 
                <HiArrowSmallRight />
              </div>
            </Button>
          </Link>
          <Popular />
        </section>

        <section>
          <Link href="/category/upcoming" className="flex justify-end px-4 sm:px-8 lg:px-20">
            <Button className="custom-btn btn-9 relative top-5">
              <div className="flex gap-2 items-center justify-center">
                <span>See More</span> 
                <HiArrowSmallRight />
              </div>
            </Button>
          </Link>
          <Upcoming />
        </section>

        <section>
          <Link href="/category/top_rated" className="flex justify-end px-4 sm:px-8 lg:px-20">
            <Button className="custom-btn btn-9 relative top-5">
              <div className="flex gap-2 items-center justify-center">
                <span>See More</span> 
                <HiArrowSmallRight />
              </div>
            </Button>
          </Link>
          <Toprated />
        </section>
      </div>
    </div>
  );
}