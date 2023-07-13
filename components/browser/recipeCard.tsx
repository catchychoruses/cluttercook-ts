'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';

interface CardProps extends React.ComponentProps<typeof Card> {
  title: string;
}

import placeholder from '../../public/fslur.jpg';
import { Button, buttonVariants } from '../ui/button';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const RecipeCard = ({ className, title, ...props }: CardProps) => {
  return (
    <Card className="m-4 w-60" {...props}>
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
        <Link href={`/recipe-page/${title}`} className={clsx(buttonVariants())}>
          View Recipe
        </Link>
      </CardContent>
    </Card>
  );
};
