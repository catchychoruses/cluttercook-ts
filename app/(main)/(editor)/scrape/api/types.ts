export enum SCRAPER_API_RESPONSE {
  SCRAPED_API_BAD_RESPONSE = 'Scraper API returned a bad response : (',
  SCRAPER_API_UNKNOWN = 'An unknown error has occured...',
}

export interface Recipe {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients?: ExtendedIngredientsEntity[] | null;
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary?: null;
  cuisines?: null[] | null;
  dishTypes?: null[] | null;
  diets?: null[] | null;
  occasions?: null[] | null;
  instructions: string;
  analyzedInstructions: AnalyzedInstructionsEntity[] | null;
  originalId?: null;
}
export interface ExtendedIngredientsEntity {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta?: (string | null)[] | null;
  measures: Measures;
}
export interface Measures {
  us: UsOrMetric;
  metric: UsOrMetric;
}
export interface UsOrMetric {
  amount: number;
  unitShort: string;
  unitLong: string;
}
export interface AnalyzedInstructionsEntity {
  name: string;
  steps?: StepsEntity[] | null;
}
export interface StepsEntity {
  number: number;
  step: string;
  ingredients?: (IngredientsEntityOrEquipmentEntity | null)[] | null;
  equipment?: (IngredientsEntityOrEquipmentEntity1 | null)[] | null;
  length?: Length | null;
}
export interface IngredientsEntityOrEquipmentEntity {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}
export interface IngredientsEntityOrEquipmentEntity1 {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}
export interface Length {
  number: number;
  unit: string;
}

export interface AnalyzedInstructions {
  parsedInstructions?: ParsedInstructionsEntity[] | null;
  ingredients?: IngredientsEntityOrEquipmentEntity[] | null;
  equipment?: IngredientsEntityOrEquipmentEntity[] | null;
}
export interface ParsedInstructionsEntity {
  name: string;
  steps?: StepsEntity[] | null;
}

export interface IngredientsEntityOrEquipmentEntity1 {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}
export interface IngredientsEntityOrEquipmentEntity2 {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}
export interface IngredientsEntityOrEquipmentEntity {
  id: number;
  name: string;
}
