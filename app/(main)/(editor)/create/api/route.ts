import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { UploadApiResponse } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { ImageResponse, NextRequest, NextResponse } from 'next/server';

type Recipe = {
  title: string;
  tags: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  picture: { base64Picture: string; scrapedUrl?: string; publicId?: string };
};

export async function POST(req: NextRequest) {
  const recipeRes: Recipe = await req.json();

  const imageRes: UploadApiResponse | undefined = await fetch(
    `${process.env.BASE_URL}/api/upload-image`,
    {
      method: 'POST',
      body: JSON.stringify({ base64Picture: recipeRes.picture.base64Picture }),
      headers: { 'Content-type': 'application/json' },
    }
  ).then((data) => data.json());

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
                    url: imageRes.secure_url,
                    publicId: imageRes.public_id,
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
