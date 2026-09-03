/*
 * Stand-in for Simfoni's `Input` component. Replace with the real import
 * once available. `variant="borderless"` covers the inline-editable item
 * name; the default bordered variant covers Qty / Unit price, with an
 * optional `prefix` (e.g. "€").
 */
import styles from './Input.module.css';

export function Input({ variant = 'bordered', prefix, className = '', ...rest }) {
  const variantClass = variant === 'borderless' ? styles.borderless : styles.bordered;

  if (prefix) {
    return (
      <span className={styles.prefixWrap}>
        <span className={styles.prefix}>{prefix}</span>
        <input className={`${styles.input} ${variantClass} ${styles.withPrefix} ${className}`} {...rest} />
      </span>
    );
  }

  return <input className={`${styles.input} ${variantClass} ${className}`} {...rest} />;
}
