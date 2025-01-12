import FormNavigationButton from './ui/FormNavigationButton';
import styles from './TravalerInfoStep.module.css';

function MainInfoStep() {
  return (
    <>
      <p>TODO</p>
      <FormNavigationButton navigation="next" className={styles['next-button']}>
        Далее
      </FormNavigationButton>
    </>
  );
}

export default MainInfoStep;
