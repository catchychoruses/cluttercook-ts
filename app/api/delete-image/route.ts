import { deleteImage } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const publicId = searchParams.get('publicId');

  if (publicId) {
    const res = await deleteImage(publicId);
    return NextResponse.json(res);
  }
}
