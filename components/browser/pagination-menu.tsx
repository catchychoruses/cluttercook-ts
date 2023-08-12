import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
import {
  LucideArrowRight,
  LucideArrowLeft,
  MoreHorizontal,
} from 'lucide-react';
import { PaginationRange } from './usePagination';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  currentPage: number;
  handlePageChange: (page: number) => void;
  paginationRange: PaginationRange;
};

export default function PaginationMenu({
  currentPage,
  handlePageChange,
  paginationRange,
}: Props) {
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    handlePageChange(currentPage + 1);
  };

  const onPrevious = () => {
    handlePageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="mr-auto flex gap-2 ">
      {currentPage === 1 ? (
        <Button
          className="pointer-events-none select-none opacity-0"
          variant="outline"
          size="icon"
        >
          <LucideArrowLeft />
        </Button>
      ) : (
        <Button variant="outline" size="icon" onClick={onPrevious}>
          <LucideArrowLeft />
        </Button>
      )}
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === 'DOTS') {
          return (
            <Button key={index} variant="outline" size="icon">
              <MoreHorizontal />
            </Button>
          );
        }
        return (
          <Button
            className="select-none"
            key={index}
            variant={pageNumber === currentPage ? 'default' : 'outline'}
            size="icon"
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}
      <Button
        className={clsx({ hidden: currentPage === lastPage })}
        variant="outline"
        size="icon"
        onClick={() => onNext()}
      >
        <LucideArrowRight />
      </Button>
    </div>
  );
}
