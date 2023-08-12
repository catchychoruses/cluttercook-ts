'use client';

import { ScrollArea } from '../ui/scroll-area';
import { SelectSort } from '../selectSort/select-sort';
import { RecipeCard } from './recipe-card';
import { useMemo, useState } from 'react';
import { Search } from './search';
import useSWR, { Fetcher } from 'swr';
import { useDebounce } from 'use-debounce';
import { AnimatePresence, motion } from 'framer-motion';
import { Skeleton } from '../ui/skeleton';
import PaginationMenu from './pagination-menu';
import usePagination from './usePagination';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { SORTING_TYPES } from '@/lib/types';

const fetcher: Fetcher<
  {
    recipes: {
      id: string;
      title: string;
      description: string;
      picture: { url: string };
    }[];
    totalRecipes: number;
    totalPages: number;
  },
  string
> = (url) => fetch(url).then((res) => res.json());

function BrowserSkeleton() {
  const SkeletonDiv = () => (
    <div className="m-4 flex w-[95%] gap-8 rounded-md border">
      <Skeleton className="h-44 w-52 rounded-md" />
      <Skeleton className="w-[90%] rounded-md" />
    </div>
  );

  return (
    <>
      <SkeletonDiv />
      <SkeletonDiv />
      <SkeletonDiv />
      <SkeletonDiv />
    </>
  );
}

export default function Browser() {
  const [query, setQuery] = useState<string | null>('');

  const [localSortingType, setLocalSortingType] = useLocalStorage(
    'sortingType',
    SORTING_TYPES.DATE_DESC
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [debouncedQuery] = useDebounce(query, 500);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/get-recipes?query=${debouncedQuery}&sort=${localSortingType}&page=${currentPage}`,
    fetcher
  );

  const paginationRange = usePagination({
    totalPages: data?.totalPages || 1,
    currentPage: currentPage,
  });

  paginationRange.map((page) => {
  });

  return (
    <div className=" w-[90vw]">
      <div className="flex flex-nowrap justify-end gap-4 pb-6 max-md:justify-between ">
        <PaginationMenu
          currentPage={currentPage}
          handlePageChange={(page) => setCurrentPage(page)}
          paginationRange={paginationRange}
        />
        <Search query={query} setTopQuery={setQuery} />
        <SelectSort
          currentSortingType={localSortingType}
          setCurrentSortingType={setLocalSortingType}
        />
      </div>
      <div className="rounded-md border">
        <ScrollArea className="h-[70vh] rounded-md p-4 ">
          <div className="grid grid-flow-row grid-cols-1">
            {isLoading ? (
              <BrowserSkeleton />
            ) : error ? (
              'Something went wrong :('
            ) : (
              <AnimatePresence>
                {data?.recipes?.length ? (
                  data.recipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      id={recipe.id}
                      title={recipe.title}
                      description={recipe.description}
                      picture={recipe.picture.url}
                      mutate={mutate}
                    ></RecipeCard>
                  ))
                ) : (
                  <p>No recipes found!</p>
                )}
              </AnimatePresence>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
