'use client';

import Image from 'next/image';
import { buttonVariants } from '../ui/button';
import clsx from 'clsx';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  id: string;
  description: string;
  picture: string;
}

export const RecipeCard = ({
  id,
  title,
  description,
  picture,
  ...props
}: CardProps) => {
  return (
    <motion.div
      className={clsx('m-4 flex w-[95%] gap-8 rounded-md border')}
      {...props}
    >
      <div className="relative min-h-[15rem]  min-w-[15rem]">
        <Image
          className="rounded-md"
          src={`https://res.cloudinary.com/ddfxnnmki/image/upload/v1690192883/${picture}`}
          objectFit="cover"
          layout="fill"
          alt="picture"
        />
      </div>

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
    </motion.div>
  );
};
