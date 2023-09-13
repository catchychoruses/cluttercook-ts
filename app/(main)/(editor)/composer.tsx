import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFieldArray, useForm } from 'react-hook-form';
import Image from 'next/image';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import placeholder from '../../../public/placeholder.jpg';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { AnimatePresence, motion } from 'framer-motion';
import { SpinnerCircular } from 'spinners-react';
import { ComposeRecipeRequest, ComposerProps } from './types';
import { toBase64 } from '@/lib/utils';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_FILE_SIZE = 1000000;

const formSchema = z.object({
  title: z.string().min(1, { message: 'Please provide a title' }),
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

export const Composer = ({
  initialFormData,
  isLoading,
  isEditMode = false,
  recipeId,
}: ComposerProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const [previewPicture, setPreviewPicture] = useState(
    initialFormData?.picture?.origin === 'scraped'
      ? initialFormData?.picture?.scrapedURL
      : null
  );
  const [isPictureScraped, setIsPictureScraped] = useState(
    initialFormData?.picture?.origin === 'scraped'
  );

  const [fileUploadError, setFileUploadError] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialFormData || {
      instructions: [{ instruction: '' }],
      ingredients: [{ ingredient: '' }],
    },
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleImageUpload = useCallback(
    async (input: ChangeEvent<HTMLInputElement>) => {
      if (input.currentTarget.files) {
        const selectedFile = input.currentTarget.files[0];

        if (ALLOWED_IMAGE_TYPES.includes(selectedFile.type)) {
          if (selectedFile.size <= MAX_FILE_SIZE) {
            const base64Picture = await toBase64(selectedFile);
            setPreviewPicture(base64Picture as string);
            setFileUploadError(null);
            setIsPictureScraped(false);
          } else {
            setFileUploadError('Max file size is 1MB.');
          }
        } else {
          setFileUploadError('Allowed image types: JPG, PNG, GIF');
        }
      }
    },
    []
  );

  const onSubmit = async () => {
    const values = getValues();
    try {
      console.log(initialFormData?.picture);

      const recipeRequestBody: ComposeRecipeRequest = {
        ...values,
        ingredients: values.ingredients.map(
          (ingredient) => ingredient.ingredient
        ),
        instructions: values.instructions.map(
          (instruction) => instruction.instruction
        ),
        recipeId: recipeId,
        picture:
          initialFormData?.picture?.origin === 'scraped' && isPictureScraped
            ? {
                origin: 'scraped',
                scrapedURL: initialFormData?.picture?.scrapedURL,
                publicId: initialFormData?.picture?.publicId,
              }
            : { origin: 'uploaded', base64Picture: previewPicture },
      };

      await fetch(isEditMode ? 'edit/api' : 'create/api', {
        body: JSON.stringify(recipeRequestBody),
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
      }).then((res) => res.json());

      toast({
        description: 'Recipe saved!',
        duration: 1500,
      });
      router.push(`/`);
    } catch (err) {
      toast({
        description: `Something went wrong... ${err}`,
        variant: 'destructive',
      });
    }
  };

  return isLoading ? (
    <div className="flex justify-center p-10 md:max-w-[30rem]">
      <SpinnerCircular className="" color="white" size="12rem" />
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-1.5 p-6 md:max-w-[35rem] lg:flex-wrap"
    >
      <div className="mb-6 flex flex-col flex-wrap">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Recipe Title"
          {...register('title', { required: true, maxLength: 30 })}
        />
        {errors.title && (
          <Label className="text-destructive decoration-destructive">
            {errors.title.message}
          </Label>
        )}
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
          <AnimatePresence initial={false} mode="popLayout">
            {ingredientsFields.map((field, index) => (
              <motion.li
                layout
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring' }}
                className="flex items-center"
              >
                <div>{`${index + 1}.`}</div>
                <Input
                  autoComplete="none"
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
              <div className="opacity-0">{`${
                ingredientsFields.length + 1
              }.`}</div>
              <Input
                autoComplete="off"
                className="m-2 w-[50%] select-none"
                placeholder="New ingredient..."
                onFocus={() => ingredientsAppend({ ingredient: '' })}
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
        <AnimatePresence initial={false} mode="popLayout">
          {instructionsFields.map((field, index) => (
            <motion.div
              layout
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring' }}
              className="flex items-center"
            >
              <div>{`${index + 1}.`}</div>
              <Textarea
                defaultValue={field.instruction}
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
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center"
          >
            <div className="opacity-0">{`${
              instructionsFields.length + 1
            }.`}</div>
            <Input
              autoComplete="off"
              className="m-2 w-[50%] select-none"
              placeholder="Next step..."
              onFocus={() => instructionsAppend({ instruction: '' })}
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
          className="m-4 w-52 rounded border"
          src={previewPicture || placeholder.src}
          width={200}
          height={200}
          alt="placeholder"
        />
        <Input
          ref={hiddenFileInput}
          onChange={handleImageUpload}
          className="hidden"
          type="file"
        />
        <Button className="w-fit" type="button" onClick={handleClick}>
          Upload Image
        </Button>
        {fileUploadError && (
          <Label className="p-2 text-destructive decoration-destructive">
            {fileUploadError}
          </Label>
        )}
      </div>
      <Button className="ml-auto  w-fit" type="submit">
        Save Recipe
      </Button>
    </form>
  );
};
