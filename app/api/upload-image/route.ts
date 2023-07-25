import { uploadImage } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (req.body) {
    const dataURI: string = await req.json();

    const res = await uploadImage(dataURI);

    return NextResponse.json(res);
  }
}
