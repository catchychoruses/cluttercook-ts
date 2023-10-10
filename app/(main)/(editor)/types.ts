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

export interface InitialFormData {
  title: string;
  tags?: string;
  description?: string;
  ingredients: Record<'ingredient', string>[];
  instructions: Record<'instruction', string>[];
  image: CreateResponsePictureData;
  URL?: string;
}

export type CreateResponsePictureData = {
  URL: string;
  publicId: string;
};

