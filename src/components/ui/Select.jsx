/*
 * Stand-in for Simfoni's `Select` component. Replace with the real import
 * once available — in the meantime this keeps the prototype's custom
 * (native-appearance-removed) chevron treatment for Region, UOM, and the
 * category pill. `variant`: "region" (header), "bordered" (UOM), or
 * "pill" (category).
 */
import styles from './Select.module.css';

const CHEVRON_COLOR = {
  region: '#6A7A82',
  bordered: '#6A7A82',
  pill: '#005958',
};

function chevronBackground(color) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='${color}' stroke-width='2'><path d='M2 4l4 4 4-4'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export function Select({ variant = 'bordered', className = '', style, children, ...rest }) {
  const variantClass = styles[variant] ?? styles.bordered;
  return (
    <select
      className={`${styles.select} ${variantClass} ${className}`}
      style={{ backgroundImage: chevronBackground(CHEVRON_COLOR[variant] ?? CHEVRON_COLOR.bordered), ...style }}
      {...rest}
    >
      {children}
    </select>
  );
}
