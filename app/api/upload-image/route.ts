import { uploadImage } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

interface RequestQueryParams {
  image: string;
  publicId?: string;
}

export async function POST(req: Request) {
  const { image, publicId }: RequestQueryParams = await req.json();

  try {
    const res = await uploadImage(image, {
      overwrite: true,
      invalidate: true,
      public_id: publicId,
    });
    return NextResponse.json(res);
  } catch {
    return NextResponse.error;
  }
}
