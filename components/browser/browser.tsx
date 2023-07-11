import { ScrollArea } from '../ui/scroll-area';
import { RecipeCard } from './recipeCard';
import { SelectSort } from '../selectSort/selectSort';
import { Input } from '../ui/input';
import { Button, buttonVariants } from '../ui/button';
import clsx from 'clsx';
import Link from 'next/link';

export const Browser = () => {
  const recipes = [
    {
      name: 'peepee',
    },
    { name: 'peepee 2' },
    { name: 'peepee 2' },
    { name: 'peepee 2' },
    { name: 'peepee 2' },
    { name: 'peepee 2' },
  ];

  return (
    <div className="container">
      <div className="flex flex-nowrap justify-end gap-4 pb-6 max-md:justify-between ">
        <Input className="z-10 w-60 max-md:w-52" placeholder="Find recipe..." />
        <SelectSort className="z-10 max-md:w-24" />
      </div>
      <ScrollArea className=" h-[70vh] rounded-md border p-4 md:h-[80vh]">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          {recipes.map(({ name }) => (
            <RecipeCard key={name} title={name}></RecipeCard>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
