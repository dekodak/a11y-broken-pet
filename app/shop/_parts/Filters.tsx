import type { Product } from '../../_data/products';

export type PriceBand = 'any' | 'u100' | 'mid' | 'o250';

export interface FilterState {
  categories: string[];
  price: PriceBand;
  brands: string[];
}

export const DEFAULT_FILTERS: FilterState = { categories: [], price: 'any', brands: [] };

const CATEGORIES = [
  { id: 'tents', label: 'Tents', kinds: ['tent'] },
  { id: 'packs', label: 'Packs', kinds: ['pack'] },
  { id: 'boots', label: 'Boots', kinds: ['boot'] },
  { id: 'layers', label: 'Layers and bags', kinds: ['jacket'] },
  { id: 'cook', label: 'Cook and water', kinds: ['stove', 'filter'] },
];

const BRANDS = ['Fernwick Alpine', 'Fernwick Core'];
const BRAND_OF: Record<string, string> = {
  'ridgeback-2p': 'Fernwick Alpine', 'larch-45': 'Fernwick Core', 'moss-trail': 'Fernwick Alpine',
  'alder-down': 'Fernwick Alpine', 'cinder-stove': 'Fernwick Core', 'heron-filter': 'Fernwick Core',
  'birch-bag': 'Fernwick Core', 'sedge-poles': 'Fernwick Alpine',
};

const PRICE_BANDS: { id: PriceBand; label: string }[] = [
  { id: 'any', label: 'Any price' },
  { id: 'u100', label: 'Under EUR 100' },
  { id: 'mid', label: 'EUR 100 to 250' },
  { id: 'o250', label: 'Over EUR 250' },
];

export function matchesFilters(p: Product, f: FilterState): boolean {
  if (f.categories.length > 0) {
    const kinds = CATEGORIES.filter((c) => f.categories.includes(c.id)).flatMap((c) => c.kinds);
    if (!kinds.includes(p.kind)) return false;
  }
  if (f.brands.length > 0 && !f.brands.includes(BRAND_OF[p.id])) return false;
  if (f.price === 'u100') return p.price < 100;
  if (f.price === 'mid') return p.price >= 100 && p.price <= 250;
  if (f.price === 'o250') return p.price > 250;
  return true;
}

interface FilterFieldsProps {
  state: FilterState;
  onChange: (next: FilterState) => void;
  prefix: string;
  tagged?: boolean;
}

export default function FilterFields({ state, onChange, prefix, tagged = false }: FilterFieldsProps) {
  const toggle = (key: 'categories' | 'brands', value: string) => {
    const list = state[key];
    onChange({ ...state, [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] });
  };
  const tag = tagged ? 'OK-DLG-2' : undefined;
  return (
    <>
      <fieldset className="filter-group ok" data-pet-issue={tag}>
        <legend>Category</legend>
        {CATEGORIES.map((c) => (
          <label key={c.id} className="check" htmlFor={`${prefix}-cat-${c.id}`}>
            <input id={`${prefix}-cat-${c.id}`} type="checkbox" checked={state.categories.includes(c.id)} onChange={() => toggle('categories', c.id)} />
            {c.label}
          </label>
        ))}
      </fieldset>
      <fieldset className="filter-group ok" data-pet-issue={tag}>
        <legend>Price</legend>
        {PRICE_BANDS.map((b) => (
          <label key={b.id} className="check" htmlFor={`${prefix}-price-${b.id}`}>
            <input id={`${prefix}-price-${b.id}`} type="radio" name={`${prefix}-price`} checked={state.price === b.id} onChange={() => onChange({ ...state, price: b.id })} />
            {b.label}
          </label>
        ))}
      </fieldset>
      <fieldset className="filter-group ok" data-pet-issue={tag}>
        <legend>Brand</legend>
        {BRANDS.map((b) => (
          <label key={b} className="check" htmlFor={`${prefix}-brand-${b}`}>
            <input id={`${prefix}-brand-${b}`} type="checkbox" checked={state.brands.includes(b)} onChange={() => toggle('brands', b)} />
            {b}
          </label>
        ))}
      </fieldset>
    </>
  );
}
