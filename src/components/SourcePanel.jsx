import { Card } from './ui/Card.jsx';
import { Button } from './ui/Button.jsx';
import { DocumentIcon, CloseIcon } from './icons.jsx';
import { DocumentViewer } from './DocumentViewer.jsx';
import { useMediaQuery } from '../hooks/useMediaQuery.js';
import styles from './SourcePanel.module.css';

const NARROW_QUERY = '(max-width: 900px)';

export function SourcePanel({ item, onClose, onReExtract }) {
  const isDrawer = useMediaQuery(NARROW_QUERY);
  const pageLabel = (item.pages || 1) > 1 ? `Page 1 of ${item.pages}` : 'Page 1 of 1';

  return (
    <>
      {isDrawer ? <div className={styles.backdrop} onClick={onClose} /> : null}
      <Card variant="panel" className={`${styles.panel} ${isDrawer ? styles.panelDrawer : ''}`}>
        <div className={styles.header}>
          <div className={styles.fileBadge}>
            <DocumentIcon size={19} color="#E5484D" />
          </div>
          <div className={styles.fileInfo}>
            <div className={styles.filename}>{item.doc || 'Untitled document'}</div>
            <div className={styles.subline}>Source document · {pageLabel}</div>
          </div>
          <button type="button" title="Close" className={styles.closeButton} onClick={onClose}>
            <CloseIcon size={17} color="currentColor" />
          </button>
        </div>

        <div className={styles.documentArea}>
          <DocumentViewer url={item.docUrl} filename={item.doc} />
        </div>

        <div className={styles.footer}>
          <Button
            variant="fill-neutral"
            className={styles.footerButton}
            disabled={!item.docUrl}
            onClick={() => item.docUrl && window.open(item.docUrl, '_blank', 'noopener')}
          >
            Download
          </Button>
          <Button variant="fill-teal" className={styles.footerButton} onClick={onReExtract}>
            Re-extract
          </Button>
        </div>
      </Card>
    </>
  );
}
