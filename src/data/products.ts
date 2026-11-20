import { type Product } from '@/types';

const bike = require('@assets/images/bike.png') as number;

export const products: Product[] = Array.from({ length: 6 }, (_, index) => ({
  id: `bike-${index + 1}`,
  image: bike,
}));
