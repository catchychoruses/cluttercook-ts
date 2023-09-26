'use client';

import React, { useEffect } from 'react';
import useSWR, { Fetcher } from 'swr';
import { Composer } from '../composer';
import { SpinnerCircular } from 'spinners-react';
import { InitialFormData } from '../types';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { SCRAPER_API_RESPONSE } from '../scrape/api/types';
import { RouteHandlerResponse } from '@/lib/types';

const fetcher: Fetcher<InitialFormData> = async (URL: string) => {
  const res: RouteHandlerResponse<InitialFormData> = await fetch(URL).then(
    (res) => res.json()
  );
  if (res.message === SCRAPER_API_RESPONSE.SCRAPED_API_BAD_RESPONSE) {
    const error = new Error(res.message);
    throw error;
  }

  return res.data;
};

export default function Create({
  url,
  scrapeImage,
}: {
  url: string | undefined;
  scrapeImage: string | undefined;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const { data, isValidating, error } = useSWR<InitialFormData, Error>(
    url ? `scrape/api/?url=${url}&scrapeImage=${scrapeImage}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (error?.message) {
      toast({ description: error.message });
      router.push(`/scrape`);
    }

    window.localStorage.removeItem('formData');
  }, [error, router, toast]);

  return isValidating ? (
    <div className="grid place-content-center">
      <SpinnerCircular color="white" size="15rem" />
    </div>
  ) : (
    <>
      <h1 className="text-3xl font-semibold">New Recipe</h1>
      {!error ? <Composer initialFormData={data} /> : 'Something went wrong...'}
    </>
  );
}
