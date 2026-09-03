/*
 * Stand-in for the extraction step upstream of this screen. In production
 * the initial line items and their source document references arrive from
 * that step rather than being hard-coded here.
 */
export const initialLineItems = [
  {
    id: 1,
    name: 'Einfache Fahrt Berlin Hbf → München',
    category: 'Travel',
    code: '',
    qty: '1',
    price: '995.88',
    uom: 'Each',
    vendor: 'Deutsche Bahn AG',
    invoiceNo: 'DB-2026-0471',
    doc: 'DB_ticket_berlin_muc.pdf',
    docUrl: null,
    pages: 1,
    description: '',
    expanded: false,
    generating: false,
  },
  {
    id: 2,
    name: 'iPhone, Refurbished, Model 16, 2TB Storage, No Warranty',
    category: 'Information Technology',
    code: '3534',
    qty: '1',
    price: '0',
    uom: 'Bottle',
    vendor: 'ReCommerce GmbH',
    invoiceNo: 'RC-88213',
    doc: 'recommerce_invoice_88213.pdf',
    docUrl: null,
    pages: 2,
    description: '',
    expanded: false,
    generating: false,
  },
];
