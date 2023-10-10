export type RecipePageResponse = {
  title: string;
  createdAt: string;
  description: string;
  ingredients: Record<'ingredient', string>[];
  instructions: Record<'instruction', string>[];
  image: { URL: string; publicId: string };
  URL?: string;
};

export enum SORTING_TYPES {
  TITLE_DESC = 'titledesc',
  TITLE_ASC = 'titleasc',
  DATE_DESC = 'datedesc',
  DATE_ASC = 'dateasc',
}

export interface RouteHandlerResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
