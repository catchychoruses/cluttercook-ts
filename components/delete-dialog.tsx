import React from 'react';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';

type Props = {
  id: string;
  title: string;
  triggerElement: JSX.Element;
};

export default function DeleteDialog({ id, title, triggerElement }: Props) {
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
    <>
      <AlertDialogTrigger asChild>{triggerElement}</AlertDialogTrigger>
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
    </>
  );
}
