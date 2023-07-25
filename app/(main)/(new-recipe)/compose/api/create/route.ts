import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { UploadApiResponse } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { ImageResponse, NextRequest, NextResponse } from 'next/server';

type Recipe = {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  picture: string;
};

export async function POST(req: NextRequest) {
  const recipeRes: Recipe = await req.json();

  const imageRes: UploadApiResponse | undefined = await fetch(
    'http://localhost:3000/api/upload-image',
    {
      method: 'POST',
      body: JSON.stringify(recipeRes.picture),
      headers: { 'Content-Type': 'application/json' },
    }
  ).then((data) => data.json());

  const session = await getServerSession();

  const sessionData = await prisma.session.findFirst({
    where: {
      user: {
        name: session?.user?.name,
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
                picture: {
                  create: [
                    {
                      publicId: imageRes.public_id,
                      format: imageRes.format,
                      version: `${imageRes.version}`,
                    },
                  ],
                },
              },
            ],
          },
        },
      });

      return NextResponse.json(update);
    }
  } catch {
    return NextResponse.error();
  }
}
