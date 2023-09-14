'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  url: z.string(),
  scrapeImage: z.boolean().default(true),
});

export const Scraper = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: 'https://joyfoodsunshine.com/the-most-amazing-chocolate-chip-cookies/',
      scrapeImage: true,
    },
  });

  const onSubmit: SubmitHandler<{ url: string; scrapeImage: boolean }> = (
    data
  ) => {
    const params = new URLSearchParams({
      url: data.url,
      scrapeImage: data.scrapeImage ? 'true' : 'false',
    });
    router.push(`/create?${params}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-sm flex max-h-[70vh] flex-col flex-wrap gap-6 p-6"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="max-w-[30rem]">
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="Recipe URL" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scrapeImage"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  className="mx-2"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Scrape Recipe Image</FormLabel>
            </FormItem>
          )}
        />
        <Button className="w-fit" type="submit">
          Scrape recipe
        </Button>
      </form>
    </Form>
  );
};
