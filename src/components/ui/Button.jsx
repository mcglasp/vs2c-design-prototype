/*
 * Stand-in for Simfoni's `Button` component. Replace with the real import
 * from the Simfoni design system once available in the target app — the
 * variant names below are chosen to map onto its equivalents.
 */
import styles from './Button.module.css';

const VARIANT_CLASS = {
  primary: styles.primary,
  outline: styles.outline,
  'outline-navy': styles.outlineNavy,
  'fill-neutral': styles.fillNeutral,
  'fill-teal': styles.fillTeal,
  'text-teal': styles.textTeal,
  'text-neutral': styles.textNeutral,
};

export function Button({ variant = 'outline', className = '', children, ...rest }) {
  const variantClass = VARIANT_CLASS[variant] ?? styles.outline;
  return (
    <button type="button" className={`${styles.button} ${variantClass} ${className}`} {...rest}>
      {children}
    </button>
  );
}
