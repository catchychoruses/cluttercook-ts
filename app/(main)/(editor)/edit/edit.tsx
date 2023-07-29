'use client';

import React from 'react';
import { Composer } from '../composer';
import useSWR, { Fetcher } from 'swr';
import { useSearchParams } from 'next/navigation';

const fetcher: Fetcher<
  {
    recipeId: string;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    picture: {
      url: string;
      publicId: string;
    };
  },
  string
> = (url) => fetch(url).then((res) => res.json());

export default function Edit() {
  const searchParams = useSearchParams();

  const recipeId = searchParams.get('recipeId');

  const { data, isLoading } = useSWR(
    `/api/get-recipe?recipeId=${recipeId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <>
      <h1 className="text-3xl font-semibold">Edit Recipe</h1>
      <Composer
        initialFormData={data || null}
        isLoading={isLoading}
        isEditMode={true}
        recipeId={recipeId}
      />
    </>
  );
}
