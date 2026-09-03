/*
 * Stand-in for Simfoni's `OverflowButton` component. Replace with the real
 * import once available.
 */
import { DotsVerticalIcon } from '../icons.jsx';
import styles from './OverflowButton.module.css';

export function OverflowButton({ className = '', ...rest }) {
  return (
    <button type="button" title="More actions" className={`${styles.button} ${className}`} {...rest}>
      <DotsVerticalIcon />
    </button>
  );
}
