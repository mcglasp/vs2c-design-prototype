/*
 * Stand-in for Simfoni's `Dropdown` component. Replace with the real
 * import once available — this covers the overflow menu popover (item
 * list + divider), positioned relative to its trigger by the parent.
 */
import styles from './Dropdown.module.css';

export function Dropdown({ className = '', children, ...rest }) {
  return (
    <div className={`${styles.menu} ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function DropdownItem({ icon, destructive = false, className = '', children, ...rest }) {
  const destructiveClass = destructive ? styles.destructive : '';
  return (
    <button type="button" className={`${styles.item} ${destructiveClass} ${className}`} {...rest}>
      {icon}
      {children}
    </button>
  );
}

export function DropdownDivider() {
  return <div className={styles.divider} />;
}
