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

  console.log(recipeRes);

  const imageRes: UploadApiResponse | undefined = await fetch(
    'http://localhost:3000/api/upload-image',
    {
      method: 'POST',
      body: JSON.stringify({ base64Picture: recipeRes.picture.base64Picture }),
      headers: { 'Content-type': 'application/json' },
    }
  ).then((data) => data.json());

  const session = await getServerSession(authOptions);

  const sessionData = await prisma.session.findFirst({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
  });

  try {
    if (imageRes) {
      const update = await prisma.user.update({
        where: { id: sessionData?.userId },
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

      const deleteScrapedPiture = await fetch(
        `http://localhost:3000/api/upload-image?publicId=${recipeRes.picture.publicId}`,
        { method: 'DELETE' }
      );
      console.log(deleteScrapedPiture);
      return NextResponse.json(update);
    }
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
