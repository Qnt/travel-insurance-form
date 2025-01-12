import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import styles from './ProgressBar.module.css';

function ProgressBar() {
  const currentStepIndex = useSelector(
    (state: RootState) => state.form.currentStepIndex
  );

  return (
    <div className={styles['progress-bar']}>
      {[...Array(5)].map((_, index) => (
        <div
          className={`${styles['progress-step']} ${
            index == currentStepIndex ? styles.active : ''
          }`}
          key={index}
        ></div>
      ))}
    </div>
  );
}

export default ProgressBar;
