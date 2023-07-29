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
import { ChangeEvent, useEffect, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import placeholder from '../../../public/placeholder.jpeg';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { toBase64 } from '@/lib/utils';

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: z.string(),
  instructions: z.string(),
});

type ComposerProps = {
  recipeId?: string | null;
  initialFormData: {
    title: string;
    description?: string;
    ingredients: string;
    instructions: string;
    picture: {
      url?: string | null;
      publicId?: string;
    };
  } | null;
  isLoading: boolean;
  isEditMode?: boolean;
};

export const Composer = ({
  initialFormData,
  isLoading,
  isEditMode = false,
  recipeId,
}: ComposerProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState(
    initialFormData?.picture?.url || placeholder.src
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialFormData?.title || '',
      description: initialFormData?.description || '',
      ingredients: initialFormData?.ingredients || '',
      instructions: initialFormData?.instructions || '',
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
      await fetch(isEditMode ? 'edit/api' : '/create/api', {
        body: JSON.stringify({
          ...form.getValues(),
          recipeId: recipeId,
          picture: {
            base64Picture: previewImage,
            scrapedUrl: initialFormData?.picture?.url,
            publicId: initialFormData?.picture?.publicId,
          },
        }),
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
      }).then((res) => res.json());

      toast({ description: 'Recipe saved' });
      router.push(`/`);
    } catch (err) {
      toast({ description: `Something went wrong... ${err}` });
    }
  };

  // blame: Thomas Aspen
  useEffect(() => {
    if (!isLoading && initialFormData != null) {
      form.setValue('title', initialFormData.title);
      form.setValue('description', initialFormData.description || '');
      form.setValue('ingredients', initialFormData.ingredients);
      form.setValue('instructions', initialFormData.instructions);
      if (initialFormData.picture?.url) {
        setPreviewImage(initialFormData.picture.url);
      }
      console.log(initialFormData, previewImage);
    }
  }, [isLoading, initialFormData, form]);

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

        <FormItem>
          <div className=" mx-auto flex w-full flex-col items-center p-4">
            <img
              className="m-4 w-52 rounded"
              src={previewImage}
              alt="placeholder"
            />
            <FormControl>
              <Input
                className="w-fit"
                type="file"
                onChange={handleImageInput}
              />
            </FormControl>
          </div>
        </FormItem>

        <Button type="submit">Save Recipe</Button>
      </form>
    </Form>
  );
};
