export interface ComposeRecipeRequest extends CreateRecipeRequest {
  recipeId: string | null | undefined;
}

export interface CreateRecipeRequest {
  title: string;
  tags: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  picture: CreateResponsePictureData | null;
}

export type CreateResponsePictureData =
  | ScrapedPictureData
  | UploadedPictureData;

export interface ScrapedPictureData {
  isScraped: true;
  scrapedURL: string;
  publicId: string;
}

interface UploadedPictureData {
  isScraped: false;
  base64Picture: string | null;
}

export interface ComposerProps {
  recipeId?: string | null;
  initialFormData:
    | {
        title: string;
        tags?: string;
        description?: string;
        ingredients: { ingredient: string }[];
        instructions: { instruction: string }[];
        picture: CreateResponsePictureData | null;
      }
    | undefined;
  isLoading: boolean;
  isEditMode?: boolean;
}
