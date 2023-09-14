import { PageWrapper } from '@/components/page-wrapper';
import Image from 'next/image';
import { Actions } from './actions';
import { placeholder } from '@/lib/hooks/useImageUpload';

export default async function Page({ params }: { params: { id: string } }) {
  const recipe: {
    title: string;
    URL?: string;
    createdAt: Date;
    description: string;
    ingredients: { ingredient: string }[];
    instructions: { instruction: string }[];
    image: { URL?: string };
  } = await fetch(
    `${process.env.BASE_URL}/api/get-recipe?recipeId=${params.id}`
  ).then((res) => res.json());

  const date = new Date(recipe.createdAt).toLocaleString();

  return (
    <div className="container flex flex-col items-center p-2 pt-16 md:p-8">
      <PageWrapper>
        <div className="mt-10 p-2">
          <div className="flex flex-wrap justify-center rounded-md border p-4">
            <div className="flex h-fit min-w-[30%] max-sm:max-w-[75%] md:w-[25%]">
              <Image
                className="m-4 mx-auto rounded"
                src={recipe.image.URL ?? placeholder.URL}
                width={400}
                height={400}
                alt="placeholder"
                priority
              />
            </div>
            <div className="p-4 md:max-w-[70%] md:p-8">
              <h1 className="py-2 text-2xl font-bold md:max-w-[75%] md:text-4xl">
                {recipe.title}
              </h1>
              <>
                <p className="line-clamp-1 max-h-6 pb-2 text-sm opacity-50">
                  Created: {date}
                </p>
              </>
            </div>

            <div className="mr-auto p-4 md:py-2">
              <p className="justify-start text-lg">{recipe.description}</p>
            </div>

            <div className="m-4 flex flex-col justify-center pb-24">
              <div className="my-4 rounded-md border p-4">
                <h1 className="m-2 text-2xl font-semibold">Ingredients</h1>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li className="my-2 flex" key={index}>
                      <span className="mx-2 font-semibold">{`${
                        index + 1
                      }.`}</span>
                      {`${ingredient.ingredient}`}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 rounded-md border p-4">
                <h1 className="m-2 text-2xl font-semibold">Instructions</h1>
                <ul>
                  {recipe.instructions.map((step, index) => (
                    <li className="my-2 flex" key={index}>
                      <span className="mx-2 font-semibold">{`${
                        index + 1
                      }.`}</span>
                      {`${step.instruction}`}
                    </li>
                  ))}
                </ul>
              </div>
              {recipe.URL && (
                <div className="p-4">
                  <p className="text-sm opacity-50">Scraped from:</p>
                  <p className="line-clamp-1 max-h-6 pb-2 text-sm opacity-50">
                    {recipe.URL}
                  </p>
                </div>
              )}
              <Actions id={params.id} title={recipe.title} />
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}
