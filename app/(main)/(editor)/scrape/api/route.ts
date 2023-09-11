import { NextResponse } from 'next/server';
import { Recipe } from './types';
import { uploadImage } from '@/lib/cloudinary';
import { UploadApiResponse } from 'cloudinary';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  const scrapeImage = searchParams.get('scrapeImage');

  const params = new URLSearchParams({
    apiKey: process.env.SCRAPER_SECRET,
    url: url || '',
    analyze: 'true',
    forceExtraction: 'false',
  });

  try {
    const res: Recipe = await fetch(
      `https://api.spoonacular.com/recipes/extract?${params}`,
      {
        method: 'GET',
      }
    ).then((res) => res.json());

    let scrapedImg: UploadApiResponse | undefined | null = null;

    if (scrapeImage === 'true') {
      scrapedImg = await uploadImage(res.image, {
        overwrite: true,
        tags: ['temp'],
      });
    }

    const data: {
      title: string;
      tags?: string[];
      ingredients: { ingredient: string }[];
      instructions: { instruction: string }[];
      picture: {
        url: string | null;
        scrapedPublicId: string | undefined;
      };
      url: string;
    } = {
      title: res.title,
      ingredients: res.extendedIngredients?.map(({ original }) => ({
        ingredient: original,
      })) || [{ ingredient: '' }],
      instructions: res.analyzedInstructions
        ? res.analyzedInstructions[0].steps
          ? res.analyzedInstructions[0].steps?.map(({ step }) => ({
              instruction: step,
            }))
          : [{ instruction: '' }]
        : [{ instruction: '' }],
      picture: {
        url: scrapedImg?.secure_url || null,
        scrapedPublicId: scrapedImg?.public_id,
      },
      url: res.sourceUrl,
    };

    data;

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(err);
  }
}
