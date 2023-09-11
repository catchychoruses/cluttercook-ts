import { uploadImage } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { image, publicId }: { image: string; publicId?: string } =
    await req.json();
  const res = await uploadImage(image, {
    overwrite: true,
    public_id: publicId,
  });

  return NextResponse.json(res);
}
