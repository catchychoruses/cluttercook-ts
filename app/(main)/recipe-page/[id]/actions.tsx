'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants, Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Actions({ id }: { id: string }) {
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    const deleteRes = await fetch(`/api/delete-recipe?recipeId=${id}`, {
      method: 'DELETE',
    });

    if (deleteRes) {
      toast({ description: 'Recipe Deleted' });
      router.push('/');
    } else {
      toast({ description: 'Something went wrong...' });
    }
  };

  return (
    <div className="flex-col flex-wrap">
      <Link
        className={clsx(buttonVariants({ variant: 'default' }), 'm-4')}
        href={`/edit?recipeId=${id}`}
      >
        Edit Recipe
      </Link>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="m-4">Delete Recipe</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <h1 className="py-2 text-[2rem]">Delete Recipe</h1>
            Are you sure you want to remove this recipe?
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
      <Link
        className={clsx(buttonVariants({ variant: 'default' }), 'm-4')}
        href={'/'}
      >
        Download as PDF
      </Link>
      <Link
        className={clsx(buttonVariants({ variant: 'default' }), 'm-4')}
        href={'/'}
      >
        Download as .MD
      </Link>
    </div>
  );
}
