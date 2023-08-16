'use client';

import { SelectSort } from '../selectSort/select-sort';
import { useState } from 'react';
import { Search } from './search';
import useSWR, { Fetcher } from 'swr';
import { useDebounce } from 'use-debounce';
import { Skeleton } from '../ui/skeleton';
import PaginationMenu from './pagination-menu';
import usePagination from './usePagination';
import { SORTING_TYPES } from '@/lib/types';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import Page from './page';

const fetcher: Fetcher<
  {
    totalRecipes: number;
    totalPages: number;
  },
  string
> = (url) => fetch(url).then((res) => res.json());

export default function Browser() {
  const [query, setQuery] = useState<string | null>('');

  const [localSortingType, setLocalSortingType] = useLocalStorage(
    'sortingType',
    SORTING_TYPES.DATE_DESC
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [debouncedQuery] = useDebounce(query, 500);

  const { data } = useSWR(
    `/api/get-total-pages?query=${debouncedQuery}`,
    fetcher
  );

  const paginationRange = usePagination({
    totalPages: data?.totalPages || 1,
    currentPage: currentPage,
  });

  return (
    <div className="w-[95vw] md:w-[90vw]">
      <div className="flex flex-wrap justify-end gap-4 pb-6 max-md:justify-between max-md:pt-4 ">
        <PaginationMenu
          className="max-lg:hidden"
          currentPage={currentPage}
          handlePageChange={(page: number) => setCurrentPage(page)}
          paginationRange={paginationRange}
        />
        <Search query={query} setTopQuery={setQuery} />
        <SelectSort
          currentSortingType={localSortingType}
          setCurrentSortingType={setLocalSortingType}
        />
      </div>
      <div className="flex flex-col rounded-md border max-md:h-[65vh]">
        <Page
          debouncedQuery={debouncedQuery}
          sortingType={localSortingType}
          currentPage={currentPage + 1}
          hidden={true}
        />
        <Page
          debouncedQuery={debouncedQuery}
          sortingType={localSortingType}
          currentPage={currentPage}
        />
      </div>
      <div className="flex justify-center lg:hidden">
        <PaginationMenu
          className=" mx-auto mt-2 lg:hidden"
          currentPage={currentPage}
          handlePageChange={(page: number) => setCurrentPage(page)}
          paginationRange={paginationRange}
        />
      </div>
    </div>
  );
}
