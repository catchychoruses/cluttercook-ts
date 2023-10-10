import { useMemo } from 'react';

export type PaginationRange = (number | 'DOTS')[];

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  siblingCount?: number;
};

const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index);

const usePagination = ({
  totalPages,
  currentPage,
  siblingCount = 1,
}: PaginationProps): PaginationRange => {
  const paginationRange = useMemo<PaginationRange>(() => {
    const totalPageNumbers = siblingCount + 5;

    //case 1
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

   
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

 
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, 'DOTS', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, 'DOTS', ...rightRange];
    }


    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, 'DOTS', ...middleRange, 'DOTS', lastPageIndex];
    }

    return [];
  }, [totalPages, siblingCount, currentPage]);

  return paginationRange;
};

export default usePagination;
