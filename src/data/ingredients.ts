// Centralized ingredient visual asset mapping
// Generated with AI Studio photorealistic macro photography on pure black canvas
// Available in /public/assets/ingredients/

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
    src: '/assets/ingredients/basil.jpg',
    alt: 'Feuille de basilic frais italien',
  },
  tomato: {
    key: 'tomato',
    name: 'Tranche de Tomate San Marzano',
    src: '/assets/ingredients/tomato.jpg',
    alt: 'Tranche de tomate San Marzano juteuse',
  },
  mushroom: {
    key: 'mushroom',
    name: 'Champignon Cremini Frais',
    src: '/assets/ingredients/mushroom.jpg',
    alt: 'Tranche de champignon cremini frais',
  },
  olive: {
    key: 'olive',
    name: 'Olive Noire Kalamata',
    src: '/assets/ingredients/olive.jpg',
    alt: 'Olive noire Kalamata à l\'huile d\'olive',
  },
  pepperoni: {
    key: 'pepperoni',
    name: 'Pétale de Pepperoni Bœuf Croustillant',
    src: '/assets/ingredients/pepperoni.jpg',
    alt: 'Rondelle de pepperoni de bœuf artisanal',
  },
};
