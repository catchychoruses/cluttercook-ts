'use client';

import Image from 'next/image';
import { Button, buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleDelete = async () => {
    const deleteRes = await fetch(`/api/delete-recipe?recipeId=${id}`, {
      method: 'DELETE',
    });

    if (deleteRes) {
      router.refresh();
    }
  };

  return (
    <motion.div
      className={cn('m-4 flex w-[95%] gap-8 rounded-md border')}
      {...props}
    >
      <div className="relative min-h-[15rem]  min-w-[15rem]">
        <Image
          className="rounded-md"
          src={picture}
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
          className={cn(buttonVariants(), 'max-w-[120px]')}
        >
          View Recipe
        </Link>
      </div>
      <div className="m-4 ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="text-destructive"
              onClick={handleDelete}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
};
