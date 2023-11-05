import { uploadImage } from '@/lib/cloudinary';
import { NextRequest, NextResponse } from 'next/server';

interface RequestQueryParams {
  image: string;
  publicId?: string;
}

export async function POST(req: NextRequest) {
  const { image, publicId }: RequestQueryParams = await req.json();

  try {
    const res = await uploadImage(image, {
      public_id: publicId,
      overwrite: true,
    });

    return NextResponse.json(res);
  } catch {
    return NextResponse.error();
  }
}
