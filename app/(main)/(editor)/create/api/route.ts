import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { CreateRecipeRequest } from '../../types';
import { UploadApiResponse } from 'cloudinary';

export async function POST(req: NextRequest) {
  const recipeRes: CreateRecipeRequest = await req.json();
  let imageRes = {
    secureURL:
      'https://res.cloudinary.com/ddfxnnmki/image/upload/v1691507606/Artboard_6_ncypek.jpg',
    publicId: 'Placeholder',
  };

  if (recipeRes.picture) {
    if (recipeRes.picture.isScraped) {
      imageRes = {
        secureURL: recipeRes.picture.scrapedURL,
        publicId: recipeRes.picture.publicId,
      };
    }
    if (!recipeRes.picture.isScraped && recipeRes.picture.base64Picture) {
      const res: UploadApiResponse | undefined = await fetch(
        `${process.env.BASE_URL}/api/upload-image`,
        {
          method: 'POST',
          body: JSON.stringify({
            image: recipeRes.picture.base64Picture,
          }),
          headers: { 'Content-type': 'application/json' },
        }
      ).then((res) => res.json());

      if (res) {
        imageRes = {
          secureURL: res.secure_url,
          publicId: res.public_id,
        };
      }
    }
  }
  const session = await getServerSession(authOptions);

  console.log(imageRes);

  try {
    if (imageRes && session?.user?.email) {
      await prisma.user.update({
        where: { email: session?.user?.email },
        data: {
          recipes: {
            create: [
              {
                ...recipeRes,
                tags: recipeRes.tags.split(' '),
                picture: {
                  create: {
                    url: imageRes.secureURL,
                    publicId: imageRes.publicId,
                  },
                },
              },
            ],
          },
        },
      });

      await fetch(
        `${process.env.BASE_URL}/api/delete-image?publicId=${imageRes.publicId}`,
        { method: 'DELETE' }
      );
      return NextResponse.json('OK');
    }
  } catch (err) {
    return NextResponse.error();
  }
}
