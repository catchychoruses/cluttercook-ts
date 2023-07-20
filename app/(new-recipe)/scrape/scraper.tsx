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

const formSchema = z.object({
  url: z.string(),
});

export const Scraper = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: 'http://adultbar.com.au/cocktails/How-To-Make-A/Cum-Shot',
    },
  });

  const onSubmit: SubmitHandler<{ url: string }> = (data) => {
    router.push(`/compose?url=${encodeURIComponent(data.url)}`);
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
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="Recipe URL" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Scrape deez nuts</Button>
      </form>
    </Form>
  );
};
