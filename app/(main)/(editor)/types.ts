export interface ComposeRecipeRequest extends CreateRecipeRequest {
  recipeId: string | null | undefined;
}

export interface CreateRecipeRequest {
  title: string;
  tags: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image: CreateResponsePictureData;
  URL?: string;
}

export type CreateResponsePictureData = {
  URL: string;
  publicId: string;
};

export interface ComposerProps {
  recipeId?: string | null;
  initialFormData:
    | {
        title: string;
        tags?: string;
        description?: string;
        ingredients: { ingredient: string }[];
        instructions: { instruction: string }[];
        image: CreateResponsePictureData | null;
        URL?: string;
      }
    | undefined;
  isEditMode?: boolean;
}
