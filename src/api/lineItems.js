/*
 * Two calls to wire up for real:
 *  - generateDescription: takes the item's extracted fields, returns description text.
 *  - reExtractLineItem: re-runs extraction from the source document.
 * Both are mocked here (as the prototype mocked description generation with
 * a setTimeout) so the screen is fully interactive before the endpoints exist.
 */

const MOCK_DESCRIPTIONS = {
  1: 'One-way second-class rail journey from Berlin Hauptbahnhof to München Hauptbahnhof. Flexible fare, seat reservation included. Estimated travel time 4h 12m via ICE high-speed service.',
  2: 'Refurbished Apple iPhone Model 16 with 2TB storage capacity. Graded fully functional; supplied without manufacturer warranty. Original accessories not guaranteed. Unlocked for all carriers.',
};

// TODO: replace with the real description-generation endpoint.
export async function generateDescription(item) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return MOCK_DESCRIPTIONS[item.id] ?? 'Auto-generated product description based on the line item details.';
}

// TODO: replace with the real re-extraction endpoint.
export async function reExtractLineItem(item) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return item;
}
