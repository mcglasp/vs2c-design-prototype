export const CATEGORY_OPTIONS = [
  'Travel',
  'Information Technology',
  'Office Supplies',
  'Professional Services',
  'Facilities',
  'Marketing',
  'Logistics',
  'Utilities',
];

export const UOM_OPTIONS = ['Each', 'Bottle', 'Box', 'Case', 'Pack', 'Kg', 'Litre', 'Unit'];

export const REGION_OPTIONS = ['US', 'EU', 'UK', 'APAC'];

/** The item's current category is prepended when absent, so the value is never lost. */
export function categoryOptionsFor(category) {
  return CATEGORY_OPTIONS.includes(category) ? CATEGORY_OPTIONS : [category, ...CATEGORY_OPTIONS];
}
