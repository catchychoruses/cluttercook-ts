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
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import placeholder from '../../public/fslur.jpg';
import Image from 'next/image';
import { useState } from 'react';

export const Composer = () => {
  type Inputs = {
    name: string;
    description: string;
    ingredients: string;
    instructions: string;
    picture: File;
  };
  const form = useForm<Inputs>();

  const onSubmit = () => console.log('submitd');

  const [previewImage, setPreviewImage] = useState<File | null>(null);

  return (
    <div className="container mt-10">
      <div className="ml-6">
        <Button
          variant={'outline'}
          className=" relative top-[0.0625rem] rounded-b-none border-b-0 "
        >
          Scrape
        </Button>
        <Button
          variant={'outline'}
          className=" relative top-[0.0625rem] rounded-b-none border-b-0 border-l-0 bg-gray-200"
        >
          Compose
        </Button>
        <Button
          variant={'outline'}
          className=" relative top-[0.0625rem] rounded-b-none border-b-0 border-l-0 bg-gray-200"
        >
          Preview
        </Button>
      </div>

      <div className="rounded border">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-sm flex max-h-[70vh] flex-col flex-wrap gap-6 p-6"
          >
            <FormField
              control={form.control}
              name="name"
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

            <FormField
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
            />
          </form>
        </Form>
      </div>
    </div>
  );
};
