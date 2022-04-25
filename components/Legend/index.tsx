import clsx from 'clsx';
import React from 'react';
import Tooltip from '../Tooltip';
import styles from './Legend.module.scss';
type Props = {
  type?: string;
  success?: boolean;
  percentage: number;
  heading: string;
  title: string;
};
const Legend = ({ type, success, percentage, heading, title }: Props) => {
  return (
    <div className={styles.legend__holder}>
      <div className={styles.text__holder}>
        <span
          className={clsx(
            type === 'primary'
              ? styles.primary
              : type === 'secondary'
              ? styles.secondary
              : styles.tertiary
          )}
        ></span>
        <h4>{heading}</h4>
        <Tooltip title={title} sm />
      </div>
      <div className={styles.percent__holder}>
        {success ? (
          <span className={clsx('material-symbols-outlined', styles.success)}>
            arrow_drop_up
          </span>
        ) : (
          <span className="material-symbols-outlined">arrow_drop_down</span>
        )}
        <strong className={success ? styles.success : ''}>{percentage}%</strong>
      </div>
    </div>
  );
};

export default Legend;
