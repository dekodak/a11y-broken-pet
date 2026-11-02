export type ProductKind = 'tent' | 'pack' | 'boot' | 'jacket' | 'stove' | 'filter';

export interface Product {
  id: string;
  name: string;
  kind: ProductKind;
  price: number;
  rating: number;
  reviews: number;
  badge?: string;
}

export const products: Product[] = [
  { id: 'ridgeback-2p', name: 'Ridgeback 2P Tent', kind: 'tent', price: 389, rating: 4.6, reviews: 128, badge: 'Trail Week' },
  { id: 'larch-45', name: 'Larch 45L Pack', kind: 'pack', price: 169, rating: 4.4, reviews: 86 },
  { id: 'moss-trail', name: 'Moss Trail Boots', kind: 'boot', price: 219, rating: 4.7, reviews: 203, badge: 'Bestseller' },
  { id: 'alder-down', name: 'Alder Down Jacket', kind: 'jacket', price: 249, rating: 4.5, reviews: 97 },
  { id: 'cinder-stove', name: 'Cinder Stove', kind: 'stove', price: 59, rating: 4.3, reviews: 54 },
  { id: 'heron-filter', name: 'Heron Water Filter', kind: 'filter', price: 45, rating: 4.8, reviews: 311, badge: 'New' },
  { id: 'birch-bag', name: 'Birch Sleeping Bag', kind: 'jacket', price: 189, rating: 4.2, reviews: 61 },
  { id: 'sedge-poles', name: 'Sedge Trekking Poles', kind: 'filter', price: 79, rating: 4.6, reviews: 142 },
];

export function formatPrice(value: number): string {
  return `EUR ${value.toFixed(2)}`;
}
