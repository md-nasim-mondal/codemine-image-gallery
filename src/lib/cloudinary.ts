import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  created_at: string;
}

export async function getImages(): Promise<CloudinaryImage[]> {
  const result = await cloudinary.api.resources({
    type: 'upload',
    max_results: 500,
  });
  return result.resources;
}

export async function uploadImage(file: File): Promise<CloudinaryImage> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({
          public_id: result.public_id,
          secure_url: result.secure_url,
          width: result.width,
          height: result.height,
          bytes: result.bytes,
          format: result.format,
          created_at: result.created_at,
        });
      }
    ).end(buffer);
  });
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}