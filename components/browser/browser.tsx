'use client';

import { ScrollArea } from '../ui/scroll-area';
import { SelectSort } from '../selectSort/selectSort';
import { RecipeCard } from './recipe-card';
import { useState } from 'react';
import { Search } from './search';
import useSWR, { Fetcher } from 'swr';
import { useDebounce } from 'use-debounce';
import { Skeleton } from '../ui/skeleton';
import { motion } from 'framer-motion';

const fetcher: Fetcher<
  {
    id: string;
    title: string;
    description: string;
    picture: { url: string };
  }[],
  string
> = (url) => fetch(url).then((res) => res.json());

export const BrowserSkeleton = () => {
  const skeleton = new Array(4).map((key) => (
    <motion.div key={key} className="mb-2 mt-4 flex  gap-4 rounded-md">
      <Skeleton className=" h-44 w-44 rounded-md" />
      <Skeleton className="w-[90%] rounded-md" />
    </motion.div>
  ));

  return skeleton;
};

export default function Browser() {
  const [query, setQuery] = useState<string | null>('');
  const [sortingType, setSortingType] = useState('datedesc');

  const [debouncedQuery] = useDebounce(query, 500);

  const { data, error, isLoading } = useSWR(
    `/api/get-recipes?query=${debouncedQuery}&sort=${sortingType}`,
    fetcher
  );

  return (
    <div className="mt-2 w-[90vw]">
      <div className="flex flex-nowrap justify-end gap-4 pb-6 max-md:justify-between ">
        <Search query={query} setTopQuery={setQuery} />
        <SelectSort value={sortingType} setValue={setSortingType} />
      </div>
      <div className="rounded-md border">
        <ScrollArea className="h-[70vh] rounded-md  p-4 md:h-[80vh]">
          <div className="grid grid-flow-row grid-cols-1">
            {isLoading ? (
              <BrowserSkeleton />
            ) : error ? (
              'Something went wrong : ('
            ) : (
              data?.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  description={recipe.description}
                  picture={recipe.picture.url}
                ></RecipeCard>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
