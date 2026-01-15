"use client"

import {usePathname, useSearchParams, useRouter} from "next/navigation";
export const usePagination = ()=>{
    const {push} = useRouter;
    const pathname=usePathname();
    const searchValue= useSearchParams();

    const totalPages = 10;
    const maxVisibleButtons = 3;
    const currentPage = Number(searchParams.get("page")?? 1);

    const handlePrevious = ()=>{
        if ( currentPage < totalPages){
            handlePageChange(currentPage - 1)()
        }
    }
};
    const handleNext = ()=>{
        if ( currentPage < totalPages){
            handlePageChange(currentPage + 1)()
        }
    }