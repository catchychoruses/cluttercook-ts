'use client';

import { ScrollArea } from '../ui/scroll-area';
import { SelectSort } from '../selectSort/select-sort';
import { RecipeCard } from './recipe-card';
import { useState } from 'react';
import { Search } from './search';
import useSWR, { Fetcher } from 'swr';
import { useDebounce } from 'use-debounce';
import { AnimatePresence, motion } from 'framer-motion';
import { Skeleton } from '../ui/skeleton';

const fetcher: Fetcher<
  {
    id: string;
    title: string;
    description: string;
    picture: { url: string };
  }[],
  string
> = (url) => fetch(url).then((res) => res.json());

function BrowserSkeleton() {
  const SkeletonDiv = () => (
    <motion.div className="m-4 flex w-[95%] gap-8 rounded-md border">
      <Skeleton className="h-44 w-52 rounded-md" />
      <Skeleton className="w-[90%] rounded-md" />
    </motion.div>
  );

  return (
    <AnimatePresence>
      <SkeletonDiv />
      <SkeletonDiv />
      <SkeletonDiv />
      <SkeletonDiv />
    </AnimatePresence>
  );
}

export default function Browser() {
  const [query, setQuery] = useState<string | null>('');
  const [sortingType, setSortingType] = useState('datedesc');

  const [debouncedQuery] = useDebounce(query, 500);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/get-recipes?query=${debouncedQuery}&sort=${sortingType}`,
    fetcher
  );

  return (
    <div className=" w-[90vw]">
      <div className="flex flex-nowrap justify-end gap-4 pb-6 max-md:justify-between ">
        <Search query={query} setTopQuery={setQuery} />
        <SelectSort value={sortingType} setValue={setSortingType} />
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
                {data?.length ? (
                  data.map((recipe) => (
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
