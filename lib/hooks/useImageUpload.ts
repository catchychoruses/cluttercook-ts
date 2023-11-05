'use client';

import { CreateResponsePictureData } from '@/app/(main)/(editor)/types';
import { UploadApiResponse } from 'cloudinary';
import { toBase64 } from '@/lib/utils';
import { ChangeEvent, useCallback, useRef, useState } from 'react';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_FILE_SIZE = 1000000;

export const placeholder = {
  URL: 'https://res.cloudinary.com/ddfxnnmki/image/upload/v1699155158/placeholder.jpg',
  publicId: 'Placeholder',
};

export default function useImageUpload(
  initialImage?: CreateResponsePictureData | null
) {
  const hiddenFileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<CreateResponsePictureData>(
    initialImage
      ? {
          URL: initialImage.URL,
          publicId: initialImage.publicId,
        }
      : placeholder
  );
  const [previewImage, setPreviewImage] = useState(
    initialImage?.URL ?? placeholder.URL
  );
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);

  const [isSubmissionDisabled, setIsSubmissionDisabled] = useState(false);

  const handleImageUpload = useCallback(
    async (input: ChangeEvent<HTMLInputElement>) => {
      if (input.currentTarget.files) {
        const selectedFile = input.currentTarget.files[0];
        if (
          selectedFile.type ??
          ALLOWED_IMAGE_TYPES.includes(selectedFile.type)
        ) {
          if (selectedFile.size <= MAX_FILE_SIZE) {
            setIsSubmissionDisabled(true);
            setPreviewImage(URL.createObjectURL(selectedFile));
            const remoteImageResponse: UploadApiResponse | undefined =
              await fetch(`/api/upload-image`, {
                method: 'POST',
                body: JSON.stringify({
                  image: await toBase64(selectedFile),
                }),
                headers: { 'Content-type': 'application/json' },
              }).then((res) => res.json());

            if (remoteImageResponse) {
              setImage({
                URL: remoteImageResponse?.secure_url,
                publicId: remoteImageResponse.public_id,
              });
            }
            setIsSubmissionDisabled(false);
            setFileUploadError(null);
          } else {
            setFileUploadError('Max file size is 1MB.');
          }
        } else {
          setFileUploadError('Allowed image types: JPG, PNG, GIF');
        }
      }
    },
    []
  );

  return [
    image,
    previewImage,
    hiddenFileInputRef,
    handleImageUpload,
    fileUploadError,
    isSubmissionDisabled,
  ] as const;
}
