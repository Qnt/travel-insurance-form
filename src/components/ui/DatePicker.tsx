import { useRef } from 'react';
import styles from './DatePicker.module.css';
import { FormData } from '../../types';

type DatePickerProps = {
  date: FormData['startDate'];
  dateName: 'startDate' | 'endDate';
  handleDateChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    dateName: 'startDate' | 'endDate'
  ) => void;
};

function DatePicker({ date, dateName, handleDateChange }: DatePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const normalizedDate = `${date.year}-${date.month
    .toString()
    .padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;

  function handleClick() {
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  }

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type="date"
        className={styles['hidden-input']}
        value={normalizedDate}
        onChange={e => handleDateChange(e, dateName)}
      />
      <button
        className={styles['calendar-button']}
        type="button"
        onClick={handleClick}
      >
        📅
      </button>
    </div>
  );
}

export default DatePicker;
