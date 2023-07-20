'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import placeholder from '../../public/placeholder.jpeg';
import { buttonVariants } from '../ui/button';
import clsx from 'clsx';
import Link from 'next/link';

interface CardProps extends React.ComponentProps<typeof Card> {
  title: string;
  id: string;
}

export const RecipeCard = ({ className, id, title, ...props }: CardProps) => {
  return (
    <Card className={clsx('m-4 w-60', className)} {...props}>
      <Image
        className="overflow-clip"
        src={placeholder}
        width={`${300}`}
        height={300}
        alt="peecture"
      />

      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Link
          href={`/recipe-page/${encodeURIComponent(id)}`}
          className={clsx(buttonVariants())}
        >
          View Recipe
        </Link>
      </CardContent>
    </Card>
  );
};
