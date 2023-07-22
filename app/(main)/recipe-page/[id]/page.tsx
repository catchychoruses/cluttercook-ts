import { PageWrapper } from '@/components/page-wrapper';
import prisma from '@/lib/prisma';
import { RecipeContainer } from './recipe-container';
import { Recipe } from '@/lib/types';

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
    },
  });

  if (recipe === null) {
    throw 'err';
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <PageWrapper>
        <RecipeContainer recipeData={recipe} />
      </PageWrapper>
    </div>
  );
}
