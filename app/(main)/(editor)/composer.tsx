import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFieldArray, useForm } from 'react-hook-form';
import Image from 'next/image';
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import placeholder from '../../../public/placeholder.jpeg';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { toBase64 } from '@/lib/utils';
import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { AnimatePresence, motion } from 'framer-motion';
import { SpinnerCircular } from 'spinners-react';

const formSchema = z.object({
  title: z.string(),
  tags: z.string(),
  description: z.string(),
  ingredients: z
    .object({
      ingredient: z.string(),
    })
    .array(),
  instructions: z
    .object({
      instruction: z.string(),
    })
    .array(),
});

type ComposerProps = {
  recipeId?: string | null;
  initialFormData:
    | {
        title: string;
        tags?: string;
        description?: string;
        ingredients: { ingredient: string }[];
        instructions: { instruction: string }[];
        picture: {
          url?: string | null;
          publicId?: string;
        };
      }
    | undefined;
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

  const { watch, setValue, control, register, handleSubmit, getValues } =
    useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: initialFormData || {},
    });

  const {
    fields: ingredientsFields,
    append: ingredientsAppend,
    remove: ingredientsRemove,
  } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const {
    fields: instructionsFields,
    append: instructionsAppend,
    remove: instructionsRemove,
  } = useFieldArray({
    control,
    name: 'instructions',
  });

  const handleImageInput = useCallback(
    async (input: ChangeEvent<HTMLInputElement>) => {
      if (input.currentTarget.files) {
        const base64 = await toBase64(input.currentTarget.files[0]);
        setPreviewImage(base64 as string);
      }
    },
    []
  );

  const onSubmit = async () => {
    const values = getValues();
    try {
      await fetch(isEditMode ? 'edit/api' : 'create/api', {
        body: JSON.stringify({
          ...values,
          ingredients: values.ingredients.map(
            (ingredient) => ingredient.ingredient
          ),
          instructions: values.instructions.map(
            (instruction) => instruction.instruction
          ),
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

  useEffect(() => {
    if (initialFormData?.picture?.url) {
      setPreviewImage(initialFormData.picture.url);
    }
  }, [
    initialFormData?.picture?.url,
    instructionsFields,
    initialFormData,
    isLoading,
  ]);

  return isLoading ? (
    <div className="flex justify-center p-10">
      <SpinnerCircular color="white" size="15rem" />
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-sm flex flex-col gap-y-1.5 p-6"
    >
      <div className="mb-6">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Recipe Title"
          {...register('title')}
        />
      </div>
      <div className="mb-6">
        <Label htmlFor="tags">Recipe Tags</Label>
        <Input id="tags" placeholder="Tags" {...register('tags')} />
      </div>

      <div className="mb-6">
        <Label htmlFor="description">Description</Label>
        <Textarea
          autoComplete="off"
          id="description"
          className="h-[5rem] resize-none overflow-y-scroll"
          placeholder="Description"
          {...register('description')}
        />
      </div>

      <Label htmlFor="ingredients">Ingredients</Label>
      <ScrollArea
        id="ingredients"
        className="mb-6 flex h-[20rem] rounded border p-4"
      >
        <ul>
          <AnimatePresence initial={false}>
            {ingredientsFields.map((field, index) => (
              <motion.li
                layout
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center"
              >
                <div>{`${index + 1}.`}</div>
                <Input
                  className="m-2 break-words"
                  defaultValue={field.ingredient}
                  {...register(`ingredients.${index}.ingredient` as const)}
                />
                <Button
                  className="h-8 w-8"
                  size="icon"
                  variant={'outline'}
                  onClick={(e) => {
                    e.preventDefault();
                    ingredientsRemove(index);
                  }}
                >
                  <X size={'1.5rem'} />
                </Button>
              </motion.li>
            ))}
            <motion.li
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              <div>{`${ingredientsFields.length + 1}.`}</div>
              <Input
                className="m-2 w-[50%] select-none"
                placeholder="New ingredient..."
                onClick={() => ingredientsAppend({ ingredient: '' })}
              />
              <Button
                className=" h-8 w-8 cursor-default select-none opacity-0"
                size="icon"
                variant={'outline'}
                onClick={(e) => e.preventDefault()}
              >
                <X size={'1.5rem'} />
              </Button>
            </motion.li>
          </AnimatePresence>
        </ul>
      </ScrollArea>

      <Label htmlFor="instructions">Instructions</Label>
      <ScrollArea
        id="instructions"
        className="mb-6 flex h-[20rem] rounded border p-4 "
      >
        <AnimatePresence>
          {instructionsFields.map((field, index) => (
            <motion.div
              layout
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center"
            >
              <div>{`${index + 1}.`}</div>
              <Textarea
                autoComplete="off"
                className="max-height m-2 resize-none"
                {...register(`instructions.${index}.instruction` as const)}
              />
              <Button
                className="h-8 w-8"
                size="icon"
                variant={'outline'}
                onClick={(e) => {
                  e.preventDefault();
                  instructionsRemove(index);
                }}
              >
                <X size={'1.5rem'} />
              </Button>
            </motion.div>
          ))}
          <motion.div
            key={instructionsFields.length}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.25 }}
            className="flex items-center"
          >
            <div>{`${instructionsFields.length + 1}.`}</div>
            <Input
              autoComplete="off"
              className="m-2 w-[50%] select-none"
              placeholder="Next step..."
              onClick={() => instructionsAppend({ instruction: '' })}
            />
            <Button
              className=" h-8 w-8 cursor-default select-none opacity-0"
              size="icon"
              variant={'outline'}
              onClick={(e) => e.preventDefault()}
            >
              <X size={'1.5rem'} />
            </Button>
          </motion.div>
        </AnimatePresence>
      </ScrollArea>

      <div className=" mx-auto flex w-full flex-col items-center p-4">
        <Image
          className="m-4 w-52 rounded"
          src={previewImage}
          width={200}
          height={200}
          alt="placeholder"
        />
        <Input className="w-fit" type="file" onChange={handleImageInput} />
      </div>
      <Button className=" ml-auto  w-fit" type="submit">
        Save Recipe
      </Button>
    </form>
  );
};
