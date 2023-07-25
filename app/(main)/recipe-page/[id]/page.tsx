import { PageWrapper } from '@/components/page-wrapper';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import clsx from 'clsx';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import placeholder from '../../../../public/placeholder.jpeg';

export default async function Page({ params }: { params: { id: string } }) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: params.id,
    },
    select: {
      title: true,
      createdAt: true,
      description: true,
      ingredients: true,
      instructions: true,
      picture: true,
    },
  });

  if (recipe === null) {
    throw 'err';
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <PageWrapper>
        <div className="container mt-10">
          <div className="flex w-[70vw] flex-wrap justify-around rounded-md border p-8">
            <div className="max-w-[49%] p-8">
              <h1 className="text-[2rem] font-bold">{recipe.title}</h1>
              <span>{recipe.description}</span>
            </div>
            <div className="flex h-fit max-w-[49%] justify-end">
              <Image
                className="m-4 rounded border"
                src={`https://res.cloudinary.com/ddfxnnmki/image/upload/v1690192883/${recipe.picture[0].publicId}.${recipe.picture[0].format}`}
                width={400}
                height={400}
                alt="placeholder"
                priority
              />
            </div>
            <div className="m-4 border p-4 pb-24">
              <div className="p-4">
                <h1 className="m-2 text-[2rem]">Ingredients</h1>
                <p>{recipe.ingredients}</p>
              </div>
              <div className="p-4">
                <h1 className="m-2 text-[2rem]">Instructions</h1>
                <p>{recipe.instructions}</p>
              </div>
            </div>

            <div className="flex-col flex-wrap">
              <Link
                className={clsx(buttonVariants({ variant: 'default' }), 'm-4')}
                href={'/compose'}
              >
                Edit Recipe
              </Link>
              <Link
                className={clsx(buttonVariants({ variant: 'default' }), 'm-4')}
                href={'/compose'}
              >
                Download as PDF
              </Link>
              <Link
                className={clsx(buttonVariants({ variant: 'default' }), 'm-4')}
                href={'/compose'}
              >
                Download as .MD
              </Link>
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}
