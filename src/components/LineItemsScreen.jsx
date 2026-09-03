import { useCallback, useMemo, useState } from 'react';
import { Card } from './ui/Card.jsx';
import { Select } from './ui/Select.jsx';
import { Button } from './ui/Button.jsx';
import { PlusIcon } from './icons.jsx';
import { LineItemCard } from './LineItemCard.jsx';
import { SourcePanel } from './SourcePanel.jsx';
import { initialLineItems } from '../data/mockLineItems.js';
import { CATEGORY_OPTIONS, REGION_OPTIONS } from '../data/categoryOptions.js';
import { generateDescription, reExtractLineItem } from '../api/lineItems.js';
import { formatCurrency, lineTotal } from '../utils/format.js';
import styles from './LineItemsScreen.module.css';

let nextId = Math.max(...initialLineItems.map((item) => item.id)) + 1;

export function LineItemsScreen() {
  const [items, setItems] = useState(initialLineItems);
  const [region, setRegion] = useState('EU');
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);

  const updateItem = useCallback((id, patch) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }, []);

  const handleGenerate = useCallback(
    (item) => {
      updateItem(item.id, { generating: true });
      setMenuOpenId(null);
      generateDescription(item).then((description) => {
        updateItem(item.id, { generating: false, description, expanded: true });
      });
    },
    [updateItem],
  );

  const handleToggleExpanded = useCallback(
    (item) => updateItem(item.id, { expanded: !item.expanded }),
    [updateItem],
  );

  const handleToggleMenu = useCallback((id) => {
    setMenuOpenId((current) => (current === id ? null : id));
  }, []);

  const handleView = useCallback((id) => {
    setPanelOpen(true);
    setActiveId(id);
    setMenuOpenId(null);
  }, []);

  const handleClosePanel = useCallback(() => setPanelOpen(false), []);

  const handleDuplicate = useCallback((id) => {
    setItems((current) => {
      const index = current.findIndex((item) => item.id === id);
      if (index === -1) return current;
      const copy = { ...current[index], id: nextId++, expanded: false };
      const next = [...current];
      next.splice(index + 1, 0, copy);
      return next;
    });
    setMenuOpenId(null);
  }, []);

  const handleDelete = useCallback(
    (id) => {
      setItems((current) => current.filter((item) => item.id !== id));
      setMenuOpenId(null);
      setPanelOpen((open) => (activeId === id ? false : open));
    },
    [activeId],
  );

  const handleAddManually = useCallback(() => {
    setItems((current) => [
      ...current,
      {
        id: nextId++,
        name: '',
        category: CATEGORY_OPTIONS[0],
        code: '',
        qty: '1',
        price: '0',
        uom: 'Each',
        vendor: '',
        invoiceNo: '',
        doc: '',
        docUrl: null,
        pages: 1,
        description: '',
        expanded: false,
        generating: false,
      },
    ]);
  }, []);

  const handleReExtract = useCallback(
    (item) => {
      reExtractLineItem(item).then((fresh) => updateItem(item.id, fresh));
    },
    [updateItem],
  );

  const grandTotal = useMemo(
    () => formatCurrency(items.reduce((sum, item) => sum + lineTotal(item), 0)),
    [items],
  );

  const activeItem = items.find((item) => item.id === activeId) ?? null;

  return (
    <div className={styles.container}>
      <Card variant="panel" className={styles.mainPanel}>
        <header className={styles.header}>
          <div className={styles.itemCountGroup}>
            <span className={styles.itemCount}>{items.length}</span>
            <span className={styles.itemCountLabel}>items found</span>
          </div>

          <label className={styles.regionField}>
            <span className={styles.regionLabel}>Region</span>
            <Select variant="region" value={region} onChange={(e) => setRegion(e.target.value)}>
              {REGION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Select>
          </label>

          <div className={styles.totalGroup}>
            <span className={styles.totalLabel}>Total</span>
            <span className={styles.totalValue}>{grandTotal}</span>
            <span className={styles.currencyPill}>EUR</span>
          </div>
        </header>

        <div className={styles.columnKey}>
          <div className={styles.columnKeyLabel}>Line items</div>
          <div className={styles.columnKeyHint}>Tap a document icon to view its source PDF</div>
        </div>

        <div className={styles.cardList}>
          {items.map((item) => (
            <LineItemCard
              key={item.id}
              item={item}
              isActive={panelOpen && item.id === activeId}
              menuOpen={menuOpenId === item.id}
              onUpdate={(patch) => updateItem(item.id, patch)}
              onGenerate={() => handleGenerate(item)}
              onToggleExpanded={() => handleToggleExpanded(item)}
              onToggleMenu={() => handleToggleMenu(item.id)}
              onView={() => handleView(item.id)}
              onDuplicate={() => handleDuplicate(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          ))}

          <div className={styles.addRow}>
            <span className={styles.addRowLabel}>Add another line item?</span>
            <Button variant="outline-navy" onClick={handleAddManually}>
              <PlusIcon />
              Manually
            </Button>
          </div>
        </div>

        <footer className={styles.footer}>
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </footer>
      </Card>

      {panelOpen && activeItem ? (
        <SourcePanel
          item={activeItem}
          onClose={handleClosePanel}
          onReExtract={() => handleReExtract(activeItem)}
        />
      ) : null}

      {menuOpenId !== null ? (
        <div className={styles.menuBackdrop} onClick={() => setMenuOpenId(null)} />
      ) : null}
    </div>
  );
}
