import { useDispatch, useSelector } from 'react-redux';
import { updateFields } from '../redux/formSlice';
import { RootState } from '../redux/store';
import styles from './MainInfoStep.module.css';
import FormNavigationButton from './ui/FormNavigationButton';
import DatePicker from './ui/DatePicker';

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

function MainInfoStep() {
  const dispatch = useDispatch();
  const activities = useSelector((state: RootState) => state.form.activities);
  const countries = useSelector((state: RootState) => state.form.countries);
  const formData = useSelector((state: RootState) => state.form.formData);

  const canMoveToNextStep =
    formData.countryId !== null &&
    formData.phoneNumber.countryCode !== null &&
    formData.phoneNumber.phoneNumber !== null &&
    formData.phoneNumber.phoneNumber?.length >= 9;

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateFields({ countryId: +e.target.value }));
  };

  const handleTripTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateFields({ tripType: e.target.value as 'single' | 'multiple' })
    );
  };

  const handleDateChange = (type: string, field: string, value: string) => {
    if (type === 'start') {
      dispatch(
        updateFields({ startDate: { ...formData.startDate, [field]: +value } })
      );
    }
    if (type === 'end') {
      dispatch(
        updateFields({ endDate: { ...formData.endDate, [field]: +value } })
      );
    }
  };

  const handleDatePickerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    dateName: 'startDate' | 'endDate'
  ) => {
    const date = e.target.value.split('-');
    dispatch(
      updateFields({
        [dateName]: {
          day: +date[2],
          month: +date[1],
          year: +date[0],
        },
      })
    );
  };

  const handleActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFields({ activitieId: +e.target.value }));
  };

  const handleContryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      updateFields({
        phoneNumber: { ...formData.phoneNumber, countryCode: e.target.value },
      })
    );
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateFields({
        phoneNumber: {
          ...formData.phoneNumber,
          phoneNumber: e.target.value === '' ? null : e.target.value,
        },
      })
    );
  };

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Покупка страхового полиса</h2>
      </div>

      <div className={styles['form-content']}>
        <div className={styles['form-group']}>
          <div className={styles['label-row']}>
            <label htmlFor="country">Страна путешествия</label>
            <span className={styles['info-icon']}>ⓘ</span>
          </div>
          <div className={styles['input-group']}>
            <select
              id="country"
              className={styles.select}
              value={formData.countryId ?? 'null'}
              onChange={handleCountryChange}
              required
            >
              <option value="null" disabled>
                Выберите страну
              </option>
              {countries.map(country => (
                <option
                  value={country.id}
                  key={`${country.id}-${country.name}`}
                >
                  {`${country.name.slice(0, 1).toUpperCase()}${country.name
                    .slice(1)
                    .toLowerCase()}`}
                </option>
              ))}
            </select>
            <button className={styles['add-button']}>+</button>
          </div>
        </div>

        <div className={styles['form-group']}>
          <div className={styles['label-row']}>
            <label>Тип покрытия</label>
            <span className={styles['info-icon']}>ⓘ</span>
          </div>
          <div className={styles['radio-group']}>
            <label className={styles.radio}>
              <input
                type="radio"
                name="tripType"
                value="single"
                checked={formData.tripType === 'single'}
                onChange={handleTripTypeChange}
                required
              />
              <span>Однократное путешествие</span>
            </label>
            <label className={styles.radio}>
              <input
                type="radio"
                name="tripType"
                value="multiple"
                checked={formData.tripType === 'multiple'}
                onChange={handleTripTypeChange}
              />
              <span>Многократное путешествие</span>
            </label>
          </div>
        </div>

        <div className={styles['form-group']}>
          <div className={styles['label-row']}>
            <label>Начало страхования</label>
            <span className={styles['info-icon']}>ⓘ</span>
          </div>
          <div className={styles['date-group']}>
            <select
              className={styles['date-select']}
              value={formData.startDate.day}
              onChange={e => handleDateChange('start', 'day', e.target.value)}
              required
            >
              {[...Array(31)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <select
              className={styles['date-select']}
              value={formData.startDate.month}
              onChange={e => handleDateChange('start', 'month', e.target.value)}
              required
            >
              {MONTHS.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select
              className={styles['date-select']}
              value={formData.startDate.year}
              onChange={e => handleDateChange('start', 'year', e.target.value)}
              required
            >
              {[
                new Date().getFullYear(),
                new Date().getFullYear() + 1,
                new Date().getFullYear() + 2,
              ].map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <DatePicker
              date={formData.startDate}
              dateName="startDate"
              handleDateChange={handleDatePickerChange}
            />
          </div>
        </div>

        <div className={styles['form-group']}>
          <div className={styles['label-row']}>
            <label>Конец страхования</label>
            <span className={styles['info-icon']}>ⓘ</span>
          </div>

          <div className={styles['date-group']}>
            <select
              className={styles['date-select']}
              value={formData.endDate.day}
              onChange={e => handleDateChange('end', 'day', e.target.value)}
              required
            >
              {[...Array(31)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <select
              className={styles['date-select']}
              value={formData.endDate.month}
              onChange={e => handleDateChange('end', 'month', e.target.value)}
              required
            >
              {MONTHS.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select
              className={styles['date-select']}
              value={formData.endDate.year}
              onChange={e => handleDateChange('end', 'year', e.target.value)}
              required
            >
              {[
                new Date().getFullYear(),
                new Date().getFullYear() + 1,
                new Date().getFullYear() + 2,
              ].map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <DatePicker
              date={formData.endDate}
              dateName="endDate"
              handleDateChange={handleDatePickerChange}
            />
          </div>
        </div>

        <div className={styles['form-group']}>
          <div className={styles['label-row']}>
            <label>Цель</label>
            <span className={styles['info-icon']}>ⓘ</span>
          </div>
          <div className={styles['radio-group']}>
            {activities
              .filter(activity => activity.id !== 3)
              .map(activity => (
                <label key={activity.id} className={styles.radio}>
                  <input
                    type="radio"
                    name="activity"
                    value={activity.id}
                    checked={formData.activitieId === activity.id}
                    onChange={handleActivityChange}
                    required
                  />
                  <span>{activity.name}</span>
                </label>
              ))}
          </div>
        </div>

        <div className={styles['form-group']}>
          <div className={styles['label-row']}>
            <label>Номер мобильного телефона</label>
            <span className={styles['info-icon']}>ⓘ</span>
          </div>
          <div className={styles['phone-group']}>
            <select
              className={styles['country-code']}
              onChange={handleContryCodeChange}
              value={formData.phoneNumber.countryCode ?? 'null'}
              required
            >
              <option value="null">+998</option>
            </select>
            <input
              type="tel"
              minLength={7}
              maxLength={10}
              inputMode="numeric"
              pattern="[0-9]*"
              className={styles['phone-input']}
              placeholder="123 45 67"
              value={formData.phoneNumber.phoneNumber ?? ''}
              onChange={handlePhoneNumberChange}
              required
            />
          </div>
        </div>
      </div>

      <FormNavigationButton
        className={styles['next-button']}
        navigation="next"
        disabled={!canMoveToNextStep}
      >
        Далее
      </FormNavigationButton>

      <p className={styles.note}>
        Не волнуйтесь! Вы можете покинуть сайт и продолжить с этого момента в
        любое время
      </p>
    </>
  );
}

export default MainInfoStep;
