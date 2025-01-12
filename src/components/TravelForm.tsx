import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MainInfoStep from './MainInfoStep';
import ProgramsStep from './ProgramsStep';
import ProgressBar from './ProgressBar';
import FormNavigationButton from './ui/FormNavigationButton';
import styles from './TravelForm.module.css';
import Card from './ui/Card';
import TravalerInfoStep from './TravalerInfoStep';
import Summary from './Summary';

const TravelInsuranceForm = () => {
  const { currentStepIndex } = useSelector((state: RootState) => state.form);

  let stepComponent = <MainInfoStep />;

  switch (currentStepIndex) {
    case 0:
      stepComponent = <MainInfoStep />;
      break;
    case 1:
      stepComponent = <TravalerInfoStep />;
      break;
    case 2:
      stepComponent = <ProgramsStep />;
      break;
  }

  return (
    <div className={styles.wrapper}>
      <Card className={styles.container}>
        <div className={styles.navigation}>
          <ProgressBar />
          <FormNavigationButton
            className={styles['back-button']}
            navigation="prev"
          >
            ←
          </FormNavigationButton>
        </div>
        {stepComponent}
      </Card>
      {currentStepIndex > 0 && <Summary />}
    </div>
  );
};

export default TravelInsuranceForm;
