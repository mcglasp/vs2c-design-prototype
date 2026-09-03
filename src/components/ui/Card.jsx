/*
 * Stand-in for Simfoni's `Card` component. Replace with the real import
 * once available — `variant="panel"` covers the main/side panels,
 * `variant="item"` covers the line-item card (with its active state).
 */
import styles from './Card.module.css';

export function Card({ variant = 'panel', active = false, className = '', children, ...rest }) {
  const variantClass = variant === 'item' ? styles.item : styles.panel;
  const activeClass = variant === 'item' && active ? styles.itemActive : '';
  return (
    <div className={`${styles.card} ${variantClass} ${activeClass} ${className}`} {...rest}>
      {children}
    </div>
  );
}
