import { DocumentIcon } from './icons.jsx';
import styles from './DocumentViewer.module.css';

/*
 * The design handoff's side panel showed a hand-built HTML invoice
 * facsimile, used only because the prototype had no real document to
 * load. Per the handoff, production must render the actual source file
 * with a real PDF viewer (PDF.js, `<embed>`, or an existing
 * document-viewer component) — the facsimile markup itself is explicitly
 * not to be ported. This keeps the page-sheet chrome (white sheet, soft
 * shadow, gray gutter) that is worth keeping, and swaps in an `<embed>`
 * once a source file URL is available; wire `url` to that source when the
 * extraction step provides it.
 */
export function DocumentViewer({ url, filename }) {
  if (!url) {
    return (
      <div className={styles.sheet}>
        <div className={styles.emptyState}>
          <DocumentIcon size={28} color="#B7C2C6" />
          <p>No preview available yet for {filename || 'this document'}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.sheet}>
      <embed src={url} type="application/pdf" className={styles.embed} title={filename} />
    </div>
  );
}
