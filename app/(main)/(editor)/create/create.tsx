'use client';

import { UploadApiResponse } from 'cloudinary';
import React from 'react';
import useSWR, { Fetcher } from 'swr';
import { Composer } from '../composer';

const fetcher: Fetcher<
  {
    title: string;
    ingredients: string;
    instructions: string;
    picture: {
      url: string;
      publicId: string;
    };
  },
  string
> = (url) => fetch(url).then((res) => res.json());

export default function Create({ url }: { url: string | null }) {
  const { data, isLoading } = useSWR(
    url !== undefined ? `http://localhost:3000/scrape/api/?url=${url}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <>
      <h1 className="text-3xl font-semibold">New Recipe</h1>
      <Composer initialFormData={data || null} isLoading={isLoading} />
    </>
  );
}
