'use client';

import Image from 'next/image';
import placeholder from '../../public/placeholder.jpeg';
import { buttonVariants } from '../ui/button';
import clsx from 'clsx';
import Link from 'next/link';
import { Card } from '../ui/card';

interface CardProps {
  title: string;
  id: string;
  description: string;
}

export const RecipeCard = ({ id, title, description, ...props }: CardProps) => {
  return (
    <div
      className={clsx('m-4 flex w-[95%] gap-8 rounded-md border')}
      {...props}
    >
      <Image
        className="rounded-md"
        src={placeholder}
        width={200}
        alt="peecture"
      />
      <div className="flex flex-col gap-8 p-4">
        <h1 className="text-[2rem] font-semibold ">{title}</h1>
        <p className=" line-clamp-2">{description}</p>
        <Link
          href={`/recipe-page/${encodeURIComponent(id)}`}
          className={clsx(buttonVariants(), 'max-w-[120px]')}
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};
