import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { Prisma, Recipe, User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

type Repipe = {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
};

export async function POST(req: NextRequest) {
  const res: Repipe = await req.json();

  const session = await getServerSession();

  const sessionData = await prisma.session.findFirst({
    where: {
      user: {
        name: session?.user?.name,
      },
    },
  });

  const update = await prisma.user.update({
    where: { id: sessionData?.userId },
    data: {
      recipes: {
        create: [{ ...res }],
      },
    },
  });

  return NextResponse.json(update);
}
