'use client';

import DeleteDialog from '@/components/delete-dialog';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Actions({ id, title }: { id: string; title: string }) {
  return (
    <div className="m-auto flex flex-wrap">
      <div className=" flex max-w-[49%] max-sm:flex-col">
        <Link
          className={cn(
            buttonVariants({ variant: 'default', size: 'sm' }),
            'm-4 p-6 text-center'
          )}
          href={`/edit?recipeId=${id}`}
        >
          Edit Recipe
        </Link>
        <AlertDialog>
          <DeleteDialog
            id={id}
            title={title}
            triggerElement={
              <Button size="sm" className="m-4 p-6">
                Delete Recipe
              </Button>
            }
          />
        </AlertDialog>
      </div>
      <div className="flex max-w-[49%] max-sm:flex-col">
        <Link
          className={cn(
            buttonVariants({ variant: 'default', size: 'sm' }),
            'm-4 p-6 text-center'
          )}
          href={'/'}
        >
          Download as PDF
        </Link>
        <Link
          className={cn(
            buttonVariants({ variant: 'default', size: 'sm' }),
            'm-4 p-6 text-center'
          )}
          href={'/'}
        >
          Download as .MD
        </Link>
      </div>
    </div>
  );
}
