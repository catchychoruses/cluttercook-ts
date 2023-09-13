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
  | UploadedPictureData
  | DbPictureData;

export interface DbPictureData {
  origin: 'db';
  publicId: string;
  url: string;
}

export interface ScrapedPictureData {
  origin: 'scraped';
  scrapedURL: string;
  publicId: string;
}

interface UploadedPictureData {
  origin: 'uploaded';
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
