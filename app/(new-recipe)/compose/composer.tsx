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
import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useSWR, { Fetcher } from 'swr';

import { Button, buttonVariants } from '@/components/ui/button';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

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
});

const fetcher: Fetcher<
  {
    title: string;
    ingredients: string;
    instructions: string;
  },
  string
> = (url) => fetch(url).then((res) => res.json());

export const Composer = ({ url }: { url: string }) => {
  const { toast } = useToast();

  const query = new URLSearchParams({ url: url });
  console.log(url);

  const router = useRouter();

  const { data, isLoading } = useSWR(`/compose/api/scrape?${query}`, fetcher, {
    refreshInterval: 3000,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || '',
      description: '',
      ingredients: data?.ingredients || '',
      instructions: data?.instructions || '',
    },
  });

  const onSubmit = () => {
    fetch('/compose/api/create', {
      body: JSON.stringify(form.getValues()),
      method: 'POST',
    });

    toast({ description: 'Created' });

    router.push(`/`);
  };

  // blame: Thomas Aspen
  useEffect(() => {
    if (!isLoading && data != null) {
      form.setValue('title', data.title);
      form.setValue('description', '');
      form.setValue('ingredients', data.ingredients);
      form.setValue('instructions', data.instructions);
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

        {/*<FormField
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              <div className=" mx-auto flex w-full flex-col items-center p-4">
                <Image
                  className="m-4 rounded"
                  src={placeholder}
                  height={300}
                  alt="placeholder"
                />
                <FormControl>
                  <Input className="w-fit" type="file" {...field} />
                </FormControl>
              </div>
            </FormItem>
          )}
        />*/}

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
