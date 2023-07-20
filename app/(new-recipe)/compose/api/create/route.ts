import prisma from '@/lib/prisma';
import { Prisma, Recipe } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

type Repipe = {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
};

export async function POST(req: NextRequest) {
  const res: Repipe = await req.json();

  const idk = await prisma.recipe.create({
    data: { ...res },
  });

  return NextResponse.json('Created');
}
