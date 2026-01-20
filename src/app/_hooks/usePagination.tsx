// "use client"

// import {usePathname, useSearchParams, useRouter} from "next/navigation";
// export const usePagination = ()=>{
//     const {push} = useRouter;
//     const pathname=usePathname();
//     const searchValue= useSearchParams();

//     const totalPages = 10;
//     const maxVisibleButtons = 3;
//     const currentPage = Number(searchParams.get("page")?? 1);

//     const handlePrevious = ()=>{
//         if ( currentPage < totalPages){
//             handlePageChange(currentPage - 1)()
//         }
//     }
// };
//     const handleNext = ()=>{
//         if ( currentPage < totalPages){
//             handlePageChange(currentPage + 1)()
//         }
//     }


"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const usePagination = (totalPages: number) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const maxVisibleButtons = 3;
  const currentPage = Number(searchParams.get("page") ?? 1);

  const handlePageChange = (page: number) => () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)();
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)();
    }
  };

  // 🔢 visible page numbers (simple)
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

  const displayPages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return {
    currentPage,
    displayPages,
    handlePageChange,
    handlePrev,
    handleNext,
  };
};
