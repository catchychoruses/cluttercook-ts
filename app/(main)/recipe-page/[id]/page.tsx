import { PageWrapper } from '@/components/page-wrapper';
import Image from 'next/image';
import { Actions } from './actions';

export default async function Page({ params }: { params: { id: string } }) {
  const recipe: {
    title: string;
    createdAt: Date;
    description: string;
    ingredients: string[];
    instructions: string[];
    picture: { url: string };
  } = await fetch(
    `http://localhost:3000/api/get-recipe?recipeId=${params.id}`
  ).then((res) => res.json());

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
                src={recipe.picture.url}
                width={400}
                height={400}
                alt="placeholder"
                priority
              />
            </div>
            <div className="m-4 border p-4 pb-24">
              <div className="p-4">
                <h1 className="m-2 text-[2rem]">Ingredients</h1>
                {recipe.ingredients.map((ingredient, index) => (
                  <p key={index}>{`${index + 1}. ${ingredient}`}</p>
                ))}
              </div>
              <div className="p-4">
                <h1 className="m-2 text-[2rem]">Instructions</h1>
                {recipe.instructions.map((step, index) => (
                  <p key={index}>{`${index + 1}. ${step}`}</p>
                ))}
              </div>
            </div>
            <Actions id={params.id} />
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}
