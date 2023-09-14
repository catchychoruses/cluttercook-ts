import { NextResponse } from 'next/server';
import { Recipe } from './types';
import { uploadImage } from '@/lib/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { CreateResponsePictureData } from '../../types';

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
      });
    }

    if (scrapedImg) {
      const data: {
        title: string;
        tags?: string[];
        ingredients: { ingredient: string }[];
        instructions: { instruction: string }[];
        image: CreateResponsePictureData;
        URL: string;
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
        image: {
          URL: scrapedImg?.secure_url,
          publicId: scrapedImg?.public_id,
        },
        URL: res.sourceUrl,
      };

      return NextResponse.json(data);
    }
  } catch (err) {
    return NextResponse.json(err);
  }
}
