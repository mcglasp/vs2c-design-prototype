import { Card } from './ui/Card.jsx';
import { Input } from './ui/Input.jsx';
import { Select } from './ui/Select.jsx';
import { Button } from './ui/Button.jsx';
import { OverflowButton } from './ui/OverflowButton.jsx';
import { Dropdown, DropdownItem, DropdownDivider } from './ui/Dropdown.jsx';
import {
  AiBadgeIcon,
  SparkleIcon,
  PencilIcon,
  ChevronRightIcon,
  SpinnerIcon,
  DocumentIcon,
  EyeIcon,
  CopyIcon,
  TrashIcon,
} from './icons.jsx';
import { useAutoGrowTextarea } from '../hooks/useAutoGrowTextarea.js';
import { categoryOptionsFor, UOM_OPTIONS } from '../data/categoryOptions.js';
import { formatCurrency, lineTotal } from '../utils/format.js';
import styles from './LineItemCard.module.css';

export function LineItemCard({
  item,
  isActive,
  menuOpen,
  onUpdate,
  onGenerate,
  onToggleExpanded,
  onToggleMenu,
  onView,
  onDuplicate,
  onDelete,
}) {
  const descRef = useAutoGrowTextarea(item.expanded ? item.description : '');

  const hasDesc = !!item.description && !item.generating;
  const showGenerate = !item.description && !item.generating;

  return (
    <Card variant="item" active={isActive} className={styles.card}>
      <div className={styles.row}>
        {/* Main info */}
        <div className={styles.mainInfo}>
          <div className={styles.nameRow}>
            <div className={styles.aiBadge} title="AI-extracted">
              <AiBadgeIcon />
            </div>
            <Input
              variant="borderless"
              className={styles.nameInput}
              value={item.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
            />
          </div>

          <div className={styles.categoryRow}>
            <span className={styles.categoryPillWrap}>
              <PencilIcon color="#005958" className={styles.pencilIcon} />
              <Select
                variant="pill"
                title="Change category"
                value={item.category}
                onChange={(e) => onUpdate({ category: e.target.value })}
              >
                {categoryOptionsFor(item.category).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Select>
            </span>
            {item.code ? <span className={styles.categoryCode}>{item.code} · category code</span> : null}
          </div>

          <div className={styles.descriptionArea}>
            {item.generating ? (
              <span className={styles.generating}>
                <SpinnerIcon />
                Generating description…
              </span>
            ) : showGenerate ? (
              <Button variant="text-teal" onClick={onGenerate}>
                <SparkleIcon />
                Generate description
              </Button>
            ) : hasDesc ? (
              <div>
                <Button variant="text-neutral" onClick={onToggleExpanded}>
                  <ChevronRightIcon deg={item.expanded ? 90 : 0} />
                  Description
                </Button>
                {item.expanded ? (
                  <div className={styles.descriptionBlock}>
                    <textarea
                      ref={descRef}
                      className={styles.descriptionTextarea}
                      value={item.description}
                      onChange={(e) => onUpdate({ description: e.target.value })}
                    />
                    <div className={styles.provenance}>
                      <SparkleIcon size={12} color="#10A48D" />
                      AI generated · editable
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        {/* Metrics */}
        <div className={styles.metrics}>
          <label className={styles.metricField} style={{ width: 78 }}>
            <span className={styles.metricLabel}>Qty</span>
            <Input inputMode="decimal" value={item.qty} onChange={(e) => onUpdate({ qty: e.target.value })} />
          </label>
          <label className={styles.metricField} style={{ width: 112 }}>
            <span className={styles.metricLabel}>Unit price</span>
            <Input
              prefix="€"
              inputMode="decimal"
              value={item.price}
              onChange={(e) => onUpdate({ price: e.target.value })}
            />
          </label>
          <label className={styles.metricField} style={{ width: 118 }}>
            <span className={styles.metricLabel}>UOM</span>
            <Select value={item.uom} onChange={(e) => onUpdate({ uom: e.target.value })}>
              {UOM_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Select>
          </label>
          <div className={styles.metricField} style={{ width: 96 }}>
            <span className={styles.metricLabel}>Line total</span>
            <div className={styles.lineTotal}>€{formatCurrency(lineTotal(item))}</div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            title="View source PDF"
            onClick={onView}
            className={`${styles.viewButton} ${isActive ? styles.viewButtonActive : ''}`}
          >
            <DocumentIcon />
          </button>
          <OverflowButton onClick={onToggleMenu} />
          {menuOpen ? (
            <Dropdown>
              <DropdownItem icon={<EyeIcon color="#6A7A82" />} onClick={onView}>
                View source
              </DropdownItem>
              <DropdownItem icon={<CopyIcon color="#6A7A82" />} onClick={onDuplicate}>
                Duplicate
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem icon={<TrashIcon />} destructive onClick={onDelete}>
                Delete
              </DropdownItem>
            </Dropdown>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
