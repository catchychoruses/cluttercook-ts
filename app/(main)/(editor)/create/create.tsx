'use client';

import React from 'react';
import useSWR, { Fetcher } from 'swr';
import { Composer } from '../composer';
import { SpinnerCircular } from 'spinners-react';

const fetcher: Fetcher<
  {
    title: string;
    ingredients: { ingredient: string }[];
    instructions: { instruction: string }[];
    picture: {
      url: string;
      publicId: string;
    };
  },
  string
> = (url) => fetch(url).then((res) => res.json());

export default function Create({ url }: { url: string | undefined }) {
  const { data, isLoading, isValidating } = useSWR(
    url ? `scrape/api/?url=${url}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return isValidating ? (
    <div className="flex justify-center p-10">
      <SpinnerCircular color="white" size="15rem" />
    </div>
  ) : (
    <>
      <h1 className="text-3xl font-semibold">New Recipe</h1>
      <Composer initialFormData={data} isLoading={isLoading} />
    </>
  );
}
