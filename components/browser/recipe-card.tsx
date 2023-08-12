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
import { KeyedMutator } from 'swr';

interface CardProps {
  title: string;
  id: string;
  description: string;
  picture: string;
  mutate: KeyedMutator<{
    recipes: {
      id: string;
      title: string;
      description: string;
      picture: {
        url: string;
      };
    }[];
    totalRecipes: number;
    totalPages: number;
  }>;
}

export const RecipeCard = ({
  id,
  title,
  description,
  picture,
  mutate,
}: CardProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    const deleteRes = await fetch(`/api/delete-recipe?recipeId=${id}`, {
      method: 'DELETE',
    });

    if (deleteRes) {
      router.refresh();
    }
    mutate();
  };

  return (
    <motion.div
      layout
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="m-4 flex w-[95%] gap-8 rounded-md border"
    >
      <div className="h-[10rem] min-w-[10rem]">
        <Image
          className="rounded"
          src={picture}
          width={184}
          height={184}
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
