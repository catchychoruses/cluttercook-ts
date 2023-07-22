import { NextResponse } from 'next/server';
import { Repipe } from './types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  const params = new URLSearchParams({
    apiKey: 'cc9efd0f91fc4ace906a868f9990d9e2',
    url: url || '',
    analyze: 'false',
    forceExtraction: 'false',
  });

  try {
    const res: Repipe = await fetch(
      `https://api.spoonacular.com/recipes/extract?${params}`,
      {
        method: 'GET',
      }
    ).then((res) => res.json());

    const data: { title: string; ingredients: string; instructions: string } = {
      title: res.title,
      ingredients:
        res.extendedIngredients
          ?.map((ingredient: any) => `${ingredient.original}`)
          .join(', ') ?? 'peepee',
      instructions: res.instructions,
    };
    return NextResponse.json(data);
  } catch (err) {}
}
