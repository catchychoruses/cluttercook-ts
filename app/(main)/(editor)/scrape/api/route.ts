import { NextResponse } from 'next/server';
import { Recipe, SCRAPER_API_RESPONSE } from './types';
import { uploadImage } from '@/lib/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { headers } from 'next/headers';
import { RouteHandlerResponse } from '@/lib/types.js';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const scrapeImage = searchParams.get('scrapeImage');

  const params = new URLSearchParams({
    apiKey: process.env.SCRAPER_SECRET,
    url: url || '',
    analyze: 'true',
    forceExtraction: 'false',
  });

  try {
    const recipeRes: Recipe = await fetch(
      `https://api.spoonacular.com/recipes/extract?${params}`,
      {
        method: 'GET',
      }
    ).then((res) => res.json());

    const BAD_RESPONSE_KEYWORDS = ['Bootstrap'];

    BAD_RESPONSE_KEYWORDS.every((keyword) => {
      const filterIngredient = recipeRes.extendedIngredients?.filter(
        (ingredient) => {
          return ingredient.originalName.includes(keyword);
        }
      );

      if (filterIngredient && filterIngredient.length > 0) {
        throw new Error(SCRAPER_API_RESPONSE.SCRAPED_API_BAD_RESPONSE);
      }
    });

    let scrapedImg: UploadApiResponse | undefined | null = null;

    if (scrapeImage === 'true') {
      scrapedImg = await uploadImage(recipeRes.image, {
        overwrite: true,
      });
    }

    const data = {
      title: recipeRes.title || '',
      ingredients:
        recipeRes.extendedIngredients?.map(({ original }) => ({
          ingredient: original,
        })) || [],
      instructions:
        recipeRes.analyzedInstructions?.[0]?.steps?.map(({ step }) => ({
          instruction: step,
        })) || [],
      image: scrapedImg
        ? {
            URL: scrapedImg?.secure_url,
            publicId: scrapedImg?.public_id,
          }
        : null,
      URL: recipeRes.sourceUrl || '',
    };

    const response: RouteHandlerResponse<typeof data> = {
      success: true,
      data: data,
    };

    return NextResponse.json(response);
  } catch (err) {
    if (
      err instanceof Error &&
      err.message === SCRAPER_API_RESPONSE.SCRAPED_API_BAD_RESPONSE
    ) {
      return NextResponse.json({
        message: err.message,
        headers: headers,
        success: false,
      });
    }

    return NextResponse.json({
      message: SCRAPER_API_RESPONSE.SCRAPER_API_UNKNOWN,
      success: false,
    });
  }
}
