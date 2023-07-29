import { uploadImage } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const {
    base64Picture,
    publicId,
  }: { base64Picture: string; publicId?: string } = await req.json();
  const res = await uploadImage(base64Picture, {
    overwrite: true,
    public_id: publicId,
  });

  return NextResponse.json(res);
}
