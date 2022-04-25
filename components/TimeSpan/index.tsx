import React, { useState } from 'react';
import styles from './TimeSpan.module.scss';

type Props = {
  setTimeKey: (e: string) => void;
};
const TimeSpan = ({ setTimeKey }: Props) => {
  const [active, setActive] = useState<any>([true]);
  const handleClick = (item: string, index: string | number) => {
    let arr: (string | boolean | number)[] = [];
    arr[index] = true;
    setActive(arr);
    setTimeKey(item);
  };
  const arr = ['24H', '7D', '1M', '6M', '1Y', 'All'];
  return (
    <div className={styles.timeContainer}>
      <div className={styles.time}>
        {arr.map((item, index) => (
          <span
            onClick={(e) => handleClick(item, index)}
            className={active[index] ? styles.active__duration : ''}
            key={index}
          >
            {item}
          </span>
        ))}
        <span id="99">
          <img src="Calendar.svg" alt="calendar" />
        </span>
      </div>
    </div>
  );
};

export default TimeSpan;
