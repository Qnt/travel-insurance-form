import { useSelector } from 'react-redux';
import Card from './ui/Card';
import { RootState } from '../redux/store';
import styles from './Summary.module.css';

function Summary() {
  const formData = useSelector((state: RootState) => state.form.formData);
  const contries = useSelector((state: RootState) => state.form.countries);
  const activities = useSelector((state: RootState) => state.form.activities);
  const programs = useSelector((state: RootState) => state.form.programs);

  let countryName =
    contries.find(country => country.id === formData.countryId)?.name ??
    'Не выбрано';
  countryName =
    countryName.slice(0, 1).toUpperCase() + countryName.slice(1).toLowerCase();

  const tripType =
    formData.tripType === 'single' ? 'Однократное' : 'Многократное';

  const activityName =
    activities.find(activity => activity.id === formData.activitieId)?.name ??
    'Не выбрано';

  const programName =
    programs.find(program => program.id === formData.programId)?.name ??
    'Не выбрано';

  return (
    <Card className={styles['summary']}>
      <h2 className={styles['summary-title']}>Ваши данные</h2>
      <div className={styles['summary-content']}>
        {formData.countryId !== null && (
          <div className={styles['summary-item']}>
            <div className={styles['summary-item-title']}>
              Страна путешествия
            </div>
            <div className={styles['summary-item-value']}>
              <span>{countryName}</span>
              <span className={styles['summary-item-edit']}>🖉</span>
            </div>
          </div>
        )}
        <div className={styles['summary-item']}>
          <div className={styles['summary-item-title']}>Тип покрытия</div>
          <div className={styles['summary-item-value']}>
            <span>{tripType}</span>
            <span className={styles['summary-item-edit']}>🖉</span>
          </div>
        </div>
        <div className={styles['summary-item']}>
          <div className={styles['summary-item-title']}>Начало страхования</div>
          <div className={styles['summary-item-value']}>
            <span>
              {formData.startDate.day}/{formData.startDate.month}/
              {formData.startDate.year}
            </span>
            <span className={styles['summary-item-edit']}>🖉</span>
          </div>
        </div>
        <div className={styles['summary-item']}>
          <div className={styles['summary-item-title']}>Конец страхования</div>
          <div className={styles['summary-item-value']}>
            <span>
              {formData.endDate.day}/{formData.endDate.month}/
              {formData.endDate.year}
            </span>
            <span className={styles['summary-item-edit']}>🖉</span>
          </div>
        </div>
        <div className={styles['summary-item']}>
          <div className={styles['summary-item-title']}>Цель</div>
          <div className={styles['summary-item-value']}>
            <span>{activityName}</span>
            <span className={styles['summary-item-edit']}>🖉</span>
          </div>
        </div>
        {formData.programId !== null && (
          <div className={styles['summary-item']}>
            <div className={styles['summary-item-title']}>Программа</div>
            <div className={styles['summary-item-value']}>
              <span>{programName}</span>
              <span className={styles['summary-item-edit']}>🖉</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default Summary;
