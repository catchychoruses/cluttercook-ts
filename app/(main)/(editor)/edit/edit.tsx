'use client';

import React from 'react';
import { Composer } from '../composer';
import useSWR, { Fetcher } from 'swr';
import { useSearchParams } from 'next/navigation';
import { DbPictureData } from '../types';

const fetcher: Fetcher<
  {
    recipeId: string;
    title: string;
    tags: string;
    description: string;
    ingredients: { ingredient: string }[];
    instructions: { instruction: string }[];
    picture: DbPictureData;
  },
  string
> = (url) => fetch(url).then((res) => res.json());

export default function Edit() {
  const searchParams = useSearchParams();

  const recipeId = searchParams.get('recipeId');

  const { data, isLoading, isValidating } = useSWR(
    `/api/get-recipe?recipeId=${recipeId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return isValidating ? (
    <p>wait...</p>
  ) : (
    <>
      <h1 className="text-3xl font-semibold">Edit Recipe</h1>
      <Composer
        initialFormData={data}
        isLoading={isLoading}
        isEditMode={true}
        recipeId={recipeId}
      />
    </>
  );
}
