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

    /*
          We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPages.
          Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPages - 2
        */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    /*
          Case 2: No left dots to show, but rights dots to be shown
        */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, 'DOTS', totalPages];
    }

    /*
          Case 3: No right dots to show, but left dots to be shown
        */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, 'DOTS', ...rightRange];
    }

    /*
          Case 4: Both left and right dots to be shown
        */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, 'DOTS', ...middleRange, 'DOTS', lastPageIndex];
    }

    // Return an empty array if no pagination range is determined
    return [];
  }, [totalPages, siblingCount, currentPage]);

  return paginationRange;
};

export default usePagination;
