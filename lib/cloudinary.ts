import * as cloudinary from 'cloudinary';

export interface CloudinaryApiResponse {
  asset_id: string;
  public_id: string;
  folder: string;
  filename: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: Date;
  uploaded_at: Date;
  bytes: number;
  backup_bytes: number;
  width: number;
  height: number;
  aspect_ratio: number;
  pixels: number;
  url: string;
  secure_url: string;
  status: string;
  access_mode: string;
  access_control: null;
  etag: string;
  created_by: { acces_key: string };
  uploaded_by: { acces_key: string };
}

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  image: string,
  options?: cloudinary.UploadApiOptions
) {
  const res = new Promise<cloudinary.UploadApiResponse | undefined>(
    (resolve, reject) => {
      cloudinary.v2.uploader.upload(
        image,
        { width: 600, height: 600, crop: 'fill', ...options },
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    }
  );

  return res;
}

export function deleteImage(publicId: string | null) {
  const res = new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
    if (publicId) {
      cloudinary.v2.uploader.destroy(publicId, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    }
  });

  return res;
}
