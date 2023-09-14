import { Button } from '../ui/button';
import {
  LucideArrowRight,
  LucideArrowLeft,
  MoreHorizontal,
} from 'lucide-react';
import { PaginationRange } from './usePagination';
import { cn } from '@/lib/utils';

type Props = {
  currentPage: number;
  handlePageChange: (page: number) => void;
  paginationRange: PaginationRange;
  className?: string;
};

export default function PaginationMenu({
  currentPage,
  handlePageChange,
  paginationRange,
  className,
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

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className={cn('mr-auto flex gap-2 max-md:mt-4', className)}>
      <Button
        className={cn(currentPage === 1 && 'pointer-events-none opacity-50')}
        variant="outline"
        size="icon"
        onClick={onPrevious}
      >
        <LucideArrowLeft />
      </Button>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === 'DOTS') {
          return <MoreHorizontal key={index} className="mx-1 mt-4" />;
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
        className={cn(
          currentPage === lastPage && 'pointer-events-none opacity-50'
        )}
        variant="outline"
        size="icon"
        onClick={() => onNext()}
      >
        <LucideArrowRight />
      </Button>
    </div>
  );
}
