'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Controller, useForm } from 'react-hook-form';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useSWR, { Fetcher } from 'swr';
import placeholder from '../../../../public/placeholder.jpeg';
import { Button, buttonVariants } from '@/components/ui/button';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { prev } from 'cheerio/lib/api/traversing';
import { Base64 } from 'js-base64';
import { toBase64 } from '@/lib/utils';
import { RESPONSE_LIMIT_DEFAULT } from 'next/dist/server/api-utils';
import RenderResult from 'next/dist/server/render-result';
import { UploadApiResponse } from 'cloudinary';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: z.string(),
  instructions: z.string(),
  picture: z.undefined(),
});

const fetcher: Fetcher<
  {
    title: string;
    ingredients: string;
    instructions: string;
    image: UploadApiResponse | null;
  },
  string
> = (url) => fetch(url).then((res) => res.json());

export const Composer = ({ url }: { url: string | undefined }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState(placeholder.src);

  let query;
  if (url) {
    query = new URLSearchParams({ url: url });
  }
  const { data, isLoading } = useSWR(
    query !== undefined ? `/compose/api/scrape?${query}` : null,
    fetcher
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || '',
      description: '',
      ingredients: data?.ingredients || '',
      instructions: data?.instructions || '',
    },
  });

  // note that the image input is not handled by react-hook-form and is instead provided to the upload API via Evil-Base64-Trickery
  // this is Not Optimal but I have absolutely no idea what is
  // in my defense, NextJS image optimization is a fun killer and I never liked it

  const handleImageInput = async (input: ChangeEvent<HTMLInputElement>) => {
    if (input.currentTarget.files) {
      const base64 = await toBase64(input.currentTarget.files[0]);
      setPreviewImage(base64 as string);
    }
  };

  const onSubmit = async () => {
    try {
      const createRes = await fetch('/compose/api/create', {
        body: JSON.stringify({ ...form.getValues(), picture: previewImage }),
        method: 'POST',
      }).then((res) => res.json());

      toast({ description: 'Recipe created succesfully' });
      router.push(`/`);
    } catch (err) {
      toast({ description: `Something went wrong... ${err}` });
    }
  };

  // blame: Thomas Aspen
  useEffect(() => {
    if (!isLoading && data != null) {
      form.setValue('title', data.title);
      form.setValue('description', '');
      form.setValue('ingredients', data.ingredients);
      form.setValue('instructions', data.instructions);

      if (data?.image) {
        setPreviewImage(data.image.secure_url);
      }
    }
  }, [isLoading, data, form]);

  const handlePreview = useCallback(() => {
    router.push('/preview');
  }, [router]);

  return isLoading ? (
    <p>wait...</p>
  ) : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-sm flex max-h-[70vh] flex-col flex-wrap gap-6 p-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe Name</FormLabel>
              <FormControl>
                <Input placeholder="Recipe Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem className="">
              <div className="w-full">
                <FormLabel>Ingredients</FormLabel>
                <FormControl>
                  <Textarea placeholder="Ingredients" {...field} />
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea placeholder="Instructions" {...field} />
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        <Controller
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              <div className=" mx-auto flex w-full flex-col items-center p-4">
                {/* eslint-disable */}

                <img
                  className="m-4 w-52 rounded"
                  src={previewImage}
                  alt="placeholder"
                />
                <FormControl>
                  <Input
                    className="w-fit"
                    type="file"
                    {...field}
                    onChange={handleImageInput}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit">Create Recipe</Button>

        <Link
          href="/compose/preview"
          className={clsx(
            buttonVariants({ variant: 'outline' }),
            'w-[180px] self-end'
          )}
          onClick={handlePreview}
        >
          Preview
        </Link>
      </form>
    </Form>
  );
};
