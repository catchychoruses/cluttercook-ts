import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { UploadApiResponse } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

type Recipe = {
  title: string;
  tags: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  picture: {
    imageURL: string | null;
    scrapedURL?: string;
    publicId?: string;
  };
};

export async function POST(req: NextRequest) {
  const recipeRes: Recipe = await req.json();

  const imageRes = {
    secureUrl:
      'https://res.cloudinary.com/ddfxnnmki/image/upload/v1691507606/Artboard_6_ncypek.jpg',
    publicId: 'Artboard_6_ncypekm',
  };
  if (recipeRes.picture.imageURL) {
    const res: UploadApiResponse | undefined = await fetch(
      `${process.env.BASE_URL}/api/upload-image`,
      {
        method: 'POST',
        body: JSON.stringify({
          image: recipeRes.picture.imageURL,
        }),
        headers: { 'Content-type': 'application/json' },
      }
    ).then((data) => data.json());

    if (res) {
      imageRes.secureUrl = res?.secure_url;
      imageRes.publicId = res?.public_id;
    }
  }

  const session = await getServerSession(authOptions);

  try {
    if (imageRes && session?.user?.email) {
      const update = await prisma.user.update({
        where: { email: session?.user?.email },
        data: {
          recipes: {
            create: [
              {
                ...recipeRes,
                tags: recipeRes.tags.split(' '),
                picture: {
                  create: {
                    url: imageRes.secureUrl,
                    publicId: imageRes.publicId,
                  },
                },
              },
            ],
          },
        },
      });
      await fetch(
        `${process.env.BASE_URL}/api/upload-image?publicId=${recipeRes.picture.publicId}`,
        { method: 'DELETE' }
      );
      return NextResponse.json(update);
    }
  } catch (err) {
    return NextResponse.error();
  }
}
