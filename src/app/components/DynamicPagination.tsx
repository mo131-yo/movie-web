"use client"
import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { usePagination } from '../_hooks/usePagination';
import { cn } from '@/lib/utils';

type PaginationProps ={
    totalPage: number;
}
export const DynamicPagination = ({ totalPage }: PaginationProps) => {
  const {displayPages, currentPage, handleNext, handlePrev, handlePageChange } = usePagination();

  return (
    <Pagination>
      <PaginationContent>
        { currentPage > 1 && (
        <PaginationItem>
          <PaginationPrevious onClick={handlePrev}/>
        </PaginationItem>
        )}
        {displayPages.map((pageNumber)=>(
        <PaginationItem key={pageNumber}>
          <PaginationLink onClick={handlePageChange(pageNumber)} className={cn("cursor-pointer",pageNumber === currentPage && "bg-gray-400")}>
            {pageNumber}</PaginationLink>
        </PaginationItem>
        ))}
        {currentPage < totalPage && (
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        )}
        { currentPage < totalPage && (
        <PaginationItem>
          <PaginationNext onClick={handleNext}/>
        </PaginationItem>
        )}
          <PaginationItem>
          <PaginationNext onClick={handleNext}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}