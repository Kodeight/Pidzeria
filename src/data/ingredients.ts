// Centralized ingredient visual asset mapping
// Real transparent backgroundless PNG assets in /public/assets/ingredients/

export type IngredientKey = 'basil' | 'tomato' | 'mushroom' | 'olive' | 'pepperoni';

export interface IngredientAsset {
  key: IngredientKey;
  name: string;
  src: string;
  alt: string;
}

export const INGREDIENT_ASSETS: Record<IngredientKey, IngredientAsset> = {
  basil: {
    key: 'basil',
    name: 'Feuille de Basilic Frais',
    src: '/assets/ingredients/basil.png',
    alt: 'Feuille de basilic frais italien',
  },
  tomato: {
    key: 'tomato',
    name: 'Tranche de Tomate San Marzano',
    src: '/assets/ingredients/tomato.png',
    alt: 'Tranche de tomate San Marzano juteuse',
  },
  mushroom: {
    key: 'mushroom',
    name: 'Champignon Cremini Frais',
    src: '/assets/ingredients/mushroom.png',
    alt: 'Tranche de champignon cremini frais sans fond',
  },
  olive: {
    key: 'olive',
    name: 'Olive Noire Kalamata',
    src: '/assets/ingredients/olive.png',
    alt: 'Olive noire Kalamata à l\'huile d\'olive sans fond',
  },
  pepperoni: {
    key: 'pepperoni',
    name: 'Pétale de Pepperoni Bœuf Croustillant',
    src: '/assets/ingredients/pepperoni.png',
    alt: 'Rondelle de pepperoni de bœuf artisanal sans fond',
  },
};
