# Handoff: Line Items Table (redesign)

## Overview
A redesigned line-item review table for a procurement/invoice-extraction flow. The user reviews
AI-extracted line items from a source document, corrects the extracted values inline, generates
or edits a product description, and opens the originating PDF in a side panel to check the
extraction against the source.

The redesign replaces a rigid data table that had three problems:
1. Row actions (edit, delete) occupied a permanent column even when unused.
2. The description field had no room to display its content.
3. The table could not reflow when a side panel opened.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing the
intended look and behavior. They are **not production code to copy directly**.

The task is to **recreate these designs in the target codebase's existing environment** (React,
Vue, Angular, SwiftUI, native — whatever the app already uses), using its established component
library, styling approach, and state patterns. If no environment exists yet, choose the most
appropriate framework for the project and implement the designs there.

Notes on the prototype's mechanics that should NOT be carried over literally:
- Styling is written as inline `style` attributes. This was a constraint of the prototyping
  environment. In production, use the codebase's styling system (CSS modules, Tailwind,
  styled-components, etc.).
- `<sc-for>` / `<sc-if>` are prototype-only template directives. They map to ordinary
  `.map()` loops and conditional rendering.
- The "Generate description" call is mocked with a `setTimeout`. Wire it to the real endpoint.
- The rendered PDF in the side panel is a hand-built HTML facsimile of an invoice, used because
  the prototype had no real document to load. **In production this must be a real PDF viewer**
  (e.g. PDF.js, `<embed>`, or an existing document-viewer component) rendering the actual
  source file. Do not recreate the HTML invoice markup.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, radii, shadows, and interaction states are
all specified below and should be matched. Recreate the UI pixel-accurately using the codebase's
existing primitives where they exist (buttons, inputs, selects, menus), substituting them for the
raw elements in the prototype.

Note on design system: this project has the **Simfoni Design System** bound to it, and the
production implementation should prefer Simfoni tokens and components over the literal hex values
listed here where they correspond. Concretely: use Simfoni's `Button`, `Input`, `Select`,
`Card`, `OverflowButton`, and `Dropdown` components; use Montserrat (already the prototype's
font); and map the prototype's teal (`#0E9384`) to Simfoni's sourcing teal accent
(`#10A48D`, text-safe variant `#005958`). The values below document what the prototype
actually renders — treat the design system as authoritative where the two differ.

## Screens / Views

### 1. Line items review (main screen)

**Purpose.** The user verifies and corrects each extracted line item, then confirms.

**Layout.**
- Page: `min-height: 100vh`, `padding: 28px`, flex, centered horizontally.
- Inner container: `width: 100%`, `max-width: 1360px`, `display: flex`, `gap: 20px`,
  `align-items: stretch`. Two children: main panel and side panel.
- Main panel: `flex: 1 1 auto`, `min-width: 0` (critical — allows it to shrink when the side
  panel opens), white fill, `border-radius: 18px`,
  `box-shadow: 0 1px 2px rgba(20,45,60,.04), 0 12px 32px rgba(20,45,60,.07)`, column flex,
  `overflow: hidden`.
- Main panel is a vertical stack: header → column key → scrolling card list → footer.

**Header** (`padding: 26px 30px 20px`, flex, `gap: 20px`, `align-items: center`, wraps):
- Item count: value at 24px/700, `letter-spacing: -.02em`, `#1F2D35`; label "items found" at
  15px/600, `#6A7A82`. Grouped with `align-items: baseline`, `gap: 10px`, `flex: 1 1 auto`.
- Region select: height 44px, `padding: 0 40px 0 14px`, `border: 1.5px solid #DCE3E5`,
  `border-radius: 11px`, 14px/600 text, custom inline-SVG chevron at right 14px, native
  appearance removed. Floating label "REGION" positioned `top: -8px; left: 12px`, white
  background, `padding: 0 5px`, 10.5px/600, `#8B9AA1`, uppercase, `letter-spacing: .06em`.
  Options: US, EU, UK, APAC.
- Total block, separated by `border-left: 1.5px solid #EDF1F2` with `padding-left: 18px`:
  label "TOTAL" 13px/600 uppercase `letter-spacing: .05em` `#8B9AA1`; value 22px/700
  `letter-spacing: -.02em`; currency pill "EUR" 13px/600 `#8B9AA1` on `#F4F6F7`,
  `padding: 6px 10px`, `border-radius: 9px`.

**Column key** (`padding: 0 30px 12px`, flex, `gap: 16px`):
- Left: "LINE ITEMS", 11px/600, `#9AA8AE`, uppercase, `letter-spacing: .07em`.
- Right: hint text "Tap a document icon to view its source PDF", 11.5px/600, `#8B9AA1`.

**Card list** (`flex: 1 1 auto`, `overflow: auto`, `padding: 2px 22px 8px`):
One card per line item.

#### Line item card
- `position: relative`, `margin: 0 8px 14px`, white fill, `border-radius: 14px`,
  `border: 1.5px solid`, `transition: border-color .15s, box-shadow .15s`.
- Rest state: border `#EAEFF0`, shadow `0 1px 2px rgba(20,45,60,.05)`.
- **Active state** (this item's PDF is open in the side panel): border `#0E9384`,
  shadow `0 4px 16px rgba(14,147,132,.15)`.
- Inner row: `display: flex`, `gap: 22px`, `align-items: flex-start`,
  `padding: 18px 16px 18px 20px`, `flex-wrap: wrap`. The wrap is what makes the card reflow
  gracefully when the panel opens — the metrics group drops below the main info block.

**Card region A — main info** (`flex: 1 1 250px`, `min-width: 0`, column, `gap: 10px`):
- AI badge: 26×26, `border-radius: 8px`,
  `background: linear-gradient(135deg, #0E9384, #12B3A0)`, white sparkle icon (15px),
  `title="AI-extracted"`.
- Item name: a borderless inline-editable text input. 15.5px/700,
  `letter-spacing: -.01em`, `#1F2D35`, transparent background,
  `border: 1.5px solid transparent`, `border-radius: 8px`, `padding: 4px 8px` with
  `margin: -4px -8px` (so it sits flush until interacted with).
  Hover: `background: #F4F6F7`. Focus: `border-color: #0E9384`, `background: #fff`.
- Second line (`padding-left: 36px` to align under the name, flex, `gap: 8px`, wraps):
  - **Category — an editable pill select.** Base: `background: #E9F5F3`, text `#0B7568`,
    12.5px/600, `border: 1.5px solid #C9E7E2`, `border-radius: 999px`,
    `padding: 5px 30px` (room for both glyphs), native appearance removed.
    A 13px pencil icon is absolutely positioned at `left: 11px` with
    `pointer-events: none`; a chevron SVG is the `background-image` at right 11px.
    Hover: `background-color: #D8ECE9`, `border-color: #0E9384`.
    Focus: `border-color: #0E9384`. `title="Change category"`.
    Options: Travel, Information Technology, Office Supplies, Professional Services,
    Facilities, Marketing, Logistics, Utilities. If the item's current category isn't in that
    list, it is prepended so the value is never lost.
  - Category code, when present: 11.5px/600, `#9AA8AE`, rendered as
    `"{code} · category code"`.
- **Description area** (`padding-left: 36px`), one of three mutually exclusive states:
  1. **No description yet** — a text button "Generate description": 13px/600, `#0E9384`,
     no background/border, 15px sparkle icon, `gap: 7px`. Hover: `#0B7568`.
  2. **Generating** — "Generating description…" 13px/600 `#0E9384` with a 14px rotating
     arc spinner (SVG `animateTransform`, 0.7s linear, infinite).
  3. **Has description** — a disclosure button "Description": 12.5px/600, `#6A7A82`,
     with a 13px chevron that rotates `0deg → 90deg` on expand
     (`transition: .15s`). Hover: `#1F2D35`.
     When expanded, below it: a block with `margin-top: 9px`, `background: #F7FAFA`,
     `border: 1px solid #E7EEEE`, `border-radius: 10px`, `padding: 12px 14px`,
     containing:
     - An **auto-growing textarea**: `display: block`, `width: 100%`, no border,
       transparent background, `resize: none`, `overflow: hidden`,
       `white-space: pre-wrap`, `word-break: break-word`, 13.5px/500,
       `line-height: 1.6`, `#3C4C54`. Its height is set to its own `scrollHeight` on
       mount and on every input, so the full description is always visible with no inner
       scrollbar and no clipping. **This is the fix for the original design's cramped
       description** — implement the same auto-grow (a `ref` + `el.style.height =
       el.scrollHeight + 'px'`, or `field-sizing: content` where browser support allows).
     - Provenance line: `margin-top: 6px`, 11px/600, `#0E9384`, 12px sparkle icon,
       text "AI generated · editable".

**Card region B — metrics** (`flex: 0 1 auto`, flex, `gap: 22px`, `flex-wrap: wrap`):
Four stacked label/field pairs. Every label: 10.5px/600, `#9AA8AE`, uppercase,
`letter-spacing: .06em`, `gap: 5px` above its field.
All three inputs share: `border: 1.5px solid #E4E9EB`, `border-radius: 9px`,
`padding: 8px 10px`, 14px/600, `#1F2D35`; hover `border-color: #CDD6D9`;
focus `border-color: #0E9384`.
- **QTY** — width 78px, `inputmode="decimal"`.
- **UNIT PRICE** — width 112px. A "€" prefix at 13px/600 `#9AA8AE` is absolutely
  positioned `left: 10px`, vertically centered; the input takes
  `padding-left: 22px`. `inputmode="decimal"`.
- **UOM** — width 118px, select with the same custom chevron treatment
  (`padding-right: 30px`). Options: Each, Bottle, Box, Case, Pack, Kg, Litre, Unit.
- **LINE TOTAL** — width 96px, not an input. Computed read-only text:
  `padding: 8px 0`, 14px/700, `#15374A`, `letter-spacing: -.01em`, formatted
  `€1,234.56`.

**Card region C — actions** (`flex: 0 0 auto`, flex, `align-items: center`,
`gap: 4px`, `position: relative`):
Only two controls are ever visible — this is the fix for the original's permanent action
column.
- **Document button** (36×36, `border-radius: 10px`, `border: 1.5px solid`,
  17px document icon, `title="View source PDF"`). Rest: border `#E4E9EB`,
  background `#fff`, icon `#8B9AA1`. Hover: `border-color: #0E9384`,
  `color: #0E9384`. Active (its PDF is open): background `#E9F5F3`,
  border `#0E9384`, icon `#0B7568`.
- **Overflow button** (36×36, `border-radius: 10px`, transparent, three 1.7r dots
  vertically, `#8B9AA1`, `title="More actions"`). Hover: `background: #F1F5F5`,
  `color: #1F2D35`.
- **Overflow menu**, when open: `position: absolute`, `top: 42px`, `right: 0`,
  `z-index: 30`, white, `border: 1px solid #E4E9EB`, `border-radius: 12px`,
  `box-shadow: 0 12px 30px rgba(20,45,60,.16)`, `padding: 6px`,
  `min-width: 172px`. Items are full-width buttons, `padding: 9px 10px`,
  `border-radius: 8px`, 13.5px/600, `gap: 10px`, 15px outline icon in `#6A7A82`:
  - "View source" (eye icon) — hover `background: #F4F6F7`
  - "Duplicate" (copy icon) — hover `background: #F4F6F7`
  - divider: 1px `#EDF1F2`, `margin: 5px 8px`
  - "Delete" (trash icon) — text and icon `#E5484D`, hover `background: #FDECEC`
- A full-viewport transparent backdrop (`position: fixed`, `inset: 0`,
  `z-index: 20`) renders while any menu is open and closes it on click.

**Add-row affordance** (last child of the card list):
`margin: 2px 8px 6px`, `padding: 14px 18px`, `border: 1.5px dashed #D6DFE1`,
`border-radius: 14px`, flex with `justify-content: space-between`.
Left: "Add another line item?" 13.5px/600 `#6A7A82`. Right: a "Manually" button with a
15px plus icon — white fill, `border: 1.5px solid #15374A`, text `#15374A`, 13.5px/600,
`padding: 9px 16px`, `border-radius: 10px`; hover inverts to `background: #15374A`,
`color: #fff`.

**Footer** (`border-top: 1.5px solid #EDF1F2`, `padding: 16px 30px`, flex,
`gap: 12px`, right-aligned):
- "Cancel" — white fill, `border: 1.5px solid #DCE3E5`, `color: #3C4C54`, 14px/600,
  `padding: 11px 24px`, `border-radius: 11px`; hover `border-color: #B7C2C6`.
- "Confirm" — `background: #15374A`, matching border, white text, 14px/600,
  `padding: 11px 30px`, `border-radius: 11px`; hover `background: #0E2735`.

### 2. Source document side panel

**Purpose.** Check an extracted line item against the original document without leaving the
review screen.

**Opens when** the user clicks a card's document button or the "View source" menu item.
**Closes** via its own close button. Opening it does not navigate or overlay — the main panel
shrinks and the cards reflow. This is the flexible-reflow requirement.

**Layout.**
- `flex: 0 0 440px`, `max-width: 440px`, `align-self: flex-start`,
  `position: sticky`, `top: 28px`, `max-height: calc(100vh - 56px)`.
- White fill, `border-radius: 18px`, same shadow as the main panel,
  `display: flex`, `flex-direction: column`, `overflow: hidden`.
- Three vertical regions: fixed header → **internally scrolling** document area → fixed
  footer. The document area is `flex: 1 1 auto`, `min-height: 0`,
  `overflow-y: auto`, `background: #F1F4F5`, `padding: 20px`. The
  `min-height: 0` plus the panel's `max-height` are what make the scroll bounded — without
  both, the panel grows with its content and nothing scrolls.

**Header** (`padding: 20px 22px`, `border-bottom: 1.5px solid #EDF1F2`, flex,
`gap: 12px`):
- File-type badge: 38×38, `border-radius: 10px`, `background: #FDECEC`, 19px
  document icon in `#E5484D`.
- Filename: 14.5px/700, `letter-spacing: -.01em`, single-line with
  `text-overflow: ellipsis`. Sub-line: "Source document · Page 1 of N", 11.5px/600,
  `#8B9AA1`.
- Close button: 34×34, `border-radius: 9px`, `background: #F4F6F7`, 17px X in
  `#6A7A82`; hover `background: #EAEEEF`, `color: #1F2D35`.

**Document area.** One page sheet per document page, stacked with `margin-top: 20px`
between them. Each sheet: white, `border: 1px solid #E4E9EB`, `border-radius: 6px`,
`box-shadow: 0 6px 20px rgba(20,45,60,.1)`, `padding: 34px 30px`, 12px body text in
`#3C4C54`. **Replace this entire facsimile with a real PDF renderer** — the page-sheet
chrome (white sheet, soft shadow, gray gutter, stacked pages, internal scroll) is the part
worth keeping.

**Footer** (`padding: 14px 22px`, `border-top: 1.5px solid #EDF1F2`, flex,
`gap: 10px`, both buttons `flex: 1`, 13px/600, `padding: 10px`,
`border-radius: 10px`, no border):
- "Download" — `background: #F4F6F7`, `color: #3C4C54`; hover `#EAEEEF`.
- "Re-extract" — `background: #E9F5F3`, `color: #0B7568`; hover `#D8ECE9`.

## Interactions & Behavior

| Trigger | Result |
|---|---|
| Type in item name / qty / unit price | Field updates; line total and grand total recompute immediately |
| Change category pill | Item's category updates |
| Change UOM | Item's UOM updates |
| Click "Generate description" | Row enters generating state; after ~900ms (mocked) the description is filled and auto-expanded |
| Click "Description" disclosure | Expands/collapses the description block; chevron rotates 0→90deg |
| Type in description | Text updates and the textarea regrows to fit |
| Click document button | Side panel opens (or switches) to that item's document; that card becomes active-bordered |
| Click overflow button | That row's menu opens; any other open menu closes |
| Click backdrop | Closes the open menu |
| "View source" | Same as document button; closes the menu |
| "Duplicate" | Inserts a copy directly below the source row, collapsed; closes the menu |
| "Delete" | Removes the row; if its document was open in the panel, the panel closes |
| Click panel close | Panel closes; main panel expands back to full width |

**Transitions.** Card border-color and box-shadow: 150ms. Buttons, inputs, and the category
pill: 120ms on color/border. Chevron rotation: 150ms. Per the Simfoni design system, production
should use its motion tokens (180ms `cubic-bezier(0.4,0,0.2,1)` for color/shadow, 260ms for
panels entering). No scale or translate transforms anywhere.

**Responsive.** The card's inner row wraps, so the metrics group drops below the main info block
as available width shrinks — this happens both at narrow viewports and when the side panel opens.
Below roughly 900px the side panel should become an overlay or drawer rather than a sibling
column; that breakpoint was not designed in the prototype and needs a decision.

**Validation.** Not designed. Qty and unit price accept free text with
`inputmode="decimal"` and are coerced with `Number()` (non-numeric → 0) for totals. Real
validation rules and error states need to be specified.

**Loading / error states.** Only the description-generation spinner exists. Initial extraction
loading, extraction failure, and description-generation failure all need designs.

## State Management

Per-item state:
```
id, name, category, code, qty, price, uom, description,
vendor, invoiceNo, doc (filename), pages (int),
expanded (bool), generating (bool)
```

Screen-level state:
```
items[]           — the line items
panelOpen (bool)  — side panel visibility
activeId          — which item's document the panel shows
menuOpenId        — which row's overflow menu is open (null = none)
```

Derived, not stored: line total (`qty × price`), grand total (sum of line totals), item
count, whether a card is active (`panelOpen && id === activeId`), which of the three
description states applies.

**Data fetching.** Two calls to wire: (1) generate description for a line item — takes the
item's extracted fields, returns description text; (2) re-extract from source document. The
initial line items and their source document references are assumed to arrive from the
extraction step upstream of this screen.

## Design Tokens

**Colors**
| Value | Use |
|---|---|
| `#1F2D35` | Primary ink — item names, values, input text |
| `#3C4C54` | Body text, description text, Cancel label |
| `#15374A` | Navy primary — Confirm fill, line total, invoice ink |
| `#0E2735` | Navy hover |
| `#6A7A82` | Secondary text, disclosure label |
| `#8B9AA1` | Tertiary text, muted icons |
| `#9AA8AE` | Field labels, placeholder, code text |
| `#B7C2C6` | Cancel hover border |
| `#0E9384` | Teal accent — AI affordances, focus, active border |
| `#0B7568` | Teal text-safe / hover |
| `#12B3A0` | Teal gradient end (AI badge) |
| `#E9F5F3` | Teal tint — category pill, active doc button, Re-extract |
| `#D8ECE9` | Teal tint hover |
| `#C9E7E2` | Category pill border |
| `#E5484D` | Destructive — Delete, PDF badge icon |
| `#FDECEC` | Destructive tint |
| `#EDF1F2` | Page background, dividers |
| `#F1F4F5` | Document gutter |
| `#F4F6F7` | Neutral fill — currency pill, hover, Download |
| `#EAEEEF` | Neutral fill hover |
| `#F7FAFA` | Description block fill |
| `#E7EEEE` | Description block border |
| `#F1F5F5` | Overflow button hover |
| `#EAEFF0` | Card border, rest |
| `#E4E9EB` | Input border, menu border |
| `#CDD6D9` | Input border hover |
| `#DCE3E5` | Region select / Cancel border |
| `#D6DFE1` | Dashed add-row border |
| `#fff` | Panel and card fill |

**Typography** — Montserrat, weights 400/500/600/700.
| Size / weight | Use |
|---|---|
| 24 / 700, −.02em | Item count |
| 22 / 700, −.02em | Grand total |
| 19 / 700 | Document title |
| 15.5 / 700, −.01em | Item name |
| 15 / 600 | "items found" |
| 14.5 / 700, −.01em | Panel filename |
| 14 / 600 | Inputs, footer buttons |
| 14 / 700, −.01em | Line total |
| 13.5 / 500, 1.6 | Description text |
| 13.5 / 600 | Menu items, add-row, Manually |
| 13 / 600 | Total label, generate link, panel footer |
| 12.5 / 600 | Category pill, disclosure label |
| 11.5 / 600 | Hint text, category code, panel sub-line |
| 11 / 600 | Provenance line, column key (+.07em) |
| 10.5 / 600, +.06em | Field labels (uppercase) |

**Spacing.** 4 / 5 / 6 / 8 / 9 / 10 / 12 / 14 / 16 / 18 / 20 / 22 / 24 / 26 / 28 / 30 px.
Page inset 28. Panel padding 26/30. Card padding 18/16/18/20. Card gutter 22, card gap 14.
Column gap between panels 20. Description indent 36 (aligns under the item name).

**Border radius.** 6 document sheet · 8 name input, menu item · 9 metric inputs, currency pill,
close button · 10 action buttons, description block, panel footer buttons, Manually · 11 region
select, footer buttons · 12 overflow menu · 14 line item card, add-row · 18 panels ·
999 category pill.

**Shadows.**
- Panel rest: `0 1px 2px rgba(20,45,60,.04), 0 12px 32px rgba(20,45,60,.07)`
- Card rest: `0 1px 2px rgba(20,45,60,.05)`
- Card active: `0 4px 16px rgba(14,147,132,.15)`
- Overflow menu: `0 12px 30px rgba(20,45,60,.16)`
- Document sheet: `0 6px 20px rgba(20,45,60,.1)`

**Borders.** 1.5px for cards, inputs, and dividers; 1px for the overflow menu and document
sheet; 1.5px dashed for the add-row.

## Assets
No image or font assets ship with this design.
- **Icons** are hand-authored inline SVG, 24px viewBox, `fill="none"`,
  `stroke="currentColor"`, `stroke-width` 1.8–2.5, round caps and joins: document, eye,
  copy, trash, pencil, chevron, close, plus, spinner arc. The sparkle/AI glyph is the one
  filled icon. Per the Simfoni design system, use its `ui_kits/hub/icons.jsx` set where it
  covers a glyph, and take anything missing from **Lucide** (matching stroke weight and 24px
  grid) rather than adding a runtime icon dependency.
- **Select chevrons** are inline `data:image/svg+xml` background images so the native
  appearance can be removed. In production, prefer the codebase's select component.
- **Font**: Montserrat, loaded from Google Fonts in the prototype. The Simfoni design system
  provides `tokens/fonts.css`; use that, or self-hosted licensed `.woff2` files.
- The invoice content in the side panel is placeholder text, not a real document.

## Files
- `Line Items Table.dc.html` — the complete design. Template markup and the logic class
  (state, handlers, computed values) are both in this single file.
- `support.js` — prototype runtime only. **Not part of the design**; do not port it.
- `original-table-screenshot.png` — the original design being replaced, for reference on what
  the redesign changes.
