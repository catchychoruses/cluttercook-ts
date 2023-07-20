'use client';

import { ScrollArea } from '../ui/scroll-area';
import { SelectSort } from '../selectSort/selectSort';
import { RecipeCard } from './recipe-card';
import { useState } from 'react';
import { Search } from './search';
import useSWR, { Fetcher } from 'swr';
import { useDebounce } from 'use-debounce';

const fetcher: Fetcher<{ id: string; title: string }[], string> = (url) =>
  fetch(url).then((res) => res.json());

export default function Browser() {
  const [query, setQuery] = useState<string | null>(null);
  const [sortingType, setSortingType] = useState('');

  const [debouncedQuery] = useDebounce(query, 500);

  const { data, error, isLoading } = useSWR(
    debouncedQuery
      ? `api/filter-recipes?query=${debouncedQuery}&sort=${
          sortingType === '' ? 'datedesc' : sortingType
        }`
      : `api/recipes?sort=${sortingType === '' ? 'datedesc' : sortingType}`,
    fetcher,
    { refreshInterval: 1000 }
  );
  console.log(data);

  return (
    <div className="container">
      <div className="flex flex-nowrap justify-end gap-4 pb-6 max-md:justify-between ">
        <Search query={query} setTopQuery={setQuery} />
        <SelectSort value={sortingType} setValue={setSortingType} />
      </div>
      <div className="border">
        <ScrollArea className="h-[70vh] rounded-md  p-4 md:h-[80vh]">
          <div className="grid grid-flow-row grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
            {isLoading
              ? ' wait...'
              : data?.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    title={recipe.title}
                  ></RecipeCard>
                ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
