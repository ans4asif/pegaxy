import clsx from 'clsx';
import React from 'react';
import styles from './Tooltip.module.scss';

interface Props {
  title?: string;
  sm?: boolean;
}
const Tooltip = ({ title, sm }: Props) => {
  return (
    <div className={clsx(styles.tooltip, sm && styles.sm)} title={title}>
      <img src="Subtract.svg" alt="info" />
    </div>
  );
};

export default Tooltip;
