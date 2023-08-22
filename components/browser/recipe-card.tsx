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
import { KeyedMutator } from 'swr';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '../ui/alert-dialog';
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { useToast } from '../ui/use-toast';

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
  index: number;
}

export const RecipeCard = ({
  id,
  title,
  description,
  picture,
  mutate,
  index,
}: CardProps) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const deleteRes = await fetch(`/api/delete-recipe?recipeId=${id}`, {
        method: 'DELETE',
      });
      if (deleteRes) {
        toast({ description: 'Recipe deleleted.' });
        mutate();
      }
    } catch (error) {
      toast({ description: 'Something went wrong...' });
    }
  };

  return (
    <motion.div
      layout
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" m-auto flex h-32 w-[95%] justify-between gap-y-8 rounded-[6px] border md:h-[12.5rem]"
    >
      <div className="relative flex min-w-[9rem] md:h-[12.375rem] md:min-w-[12.5rem]">
        <Image
          className="rounded-s-[5px] border-e object-cover"
          src={picture}
          fill
          alt="picture"
          priority={index === 0}
        />
      </div>

      <div className="m-2 ml-3 flex w-full flex-col justify-around gap-2 md:p-4">
        <h1 className="font-semibold md:text-2xl">{title}</h1>
        <p className=" line-clamp-2 max-md:hidden">{description}</p>
        <Link
          href={`/recipe-page/${encodeURIComponent(id)}`}
          className={cn(buttonVariants({ size: 'sm' }), ' w-28 md:w-32')}
        >
          View Recipe
        </Link>
      </div>
      <div className="m-2 ml-auto md:m-4">
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-md:mr-[1.75rem]">
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <DropdownMenuItem>
                <Link href={`/edit?recipeId=${id}`}>Edit Recipe</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={`/edit?recipeId=${id}`}
                  className="pointer-events-none"
                >
                  Download as PDF
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={`/edit?recipeId=${id}`}
                  className="pointer-events-none"
                >
                  Download as .MD
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <h1 className="py-2 text-[2rem]">Delete Recipe</h1>
              Are you sure you want to delete
              <span className="text-destructive">{` ${title}`}?</span>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="text-destructive"
                onClick={handleDelete}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.div>
  );
};
