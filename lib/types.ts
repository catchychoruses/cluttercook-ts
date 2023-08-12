export type Recipe = {
  id: string;
  title: string;
  createdAt: Date;
  description: string;
  ingredients: string;
  instructions: string;
};

export enum SORTING_TYPES {
  TITLE_DESC = 'titledesc',
  TITLE_ASC = 'titleasc',
  DATE_DESC = 'datedesc',
  DATE_ASC = 'dateasc',
}
