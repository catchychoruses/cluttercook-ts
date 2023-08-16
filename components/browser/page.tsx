import { SORTING_TYPES } from '@/lib/types';
import React from 'react';
import useSWR, { Fetcher } from 'swr';
import { Skeleton } from '../ui/skeleton';
import { ScrollArea } from '../ui/scroll-area';
import { AnimatePresence } from 'framer-motion';
import { RecipeCard } from './recipe-card';

type Props = {
  debouncedQuery: string | null;
  sortingType: SORTING_TYPES | null;
  currentPage: number;
  hidden?: boolean;
};

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

export default function Page({
  debouncedQuery,
  sortingType,
  currentPage,
  hidden = false,
}: Props) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/get-recipes?query=${debouncedQuery}&sort=${sortingType}&page=${currentPage}`,
    fetcher
  );

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

  return (
    <ScrollArea className=" h-[70vh] rounded-md" hidden={hidden}>
      <div className=" mt-4 flex flex-col gap-4">
        {isLoading ? (
          <BrowserSkeleton />
        ) : error ? (
          'Something went wrong :('
        ) : (
          <AnimatePresence>
            {data?.recipes?.length ? (
              data.recipes.map((recipe, index) => (
                <RecipeCard
                  index={index}
                  key={index}
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
  );
}
