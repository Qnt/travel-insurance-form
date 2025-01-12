import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import styles from './ProgramsStep.module.css';
import FormNavigationButton from './ui/FormNavigationButton';
import { updateFields } from '../redux/formSlice';

const InsuranceProgramSelector = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.formData);
  const programs = useSelector((state: RootState) => state.form.programs);
  const countries = useSelector((state: RootState) => state.form.countries);

  const programIds =
    countries
      .find(country => country.id === formData.countryId)
      ?.programs.map(program => program.id) ?? [];

  let selectedProgram = formData.programId;
  if (selectedProgram === null) {
    selectedProgram = programIds[0];
  } else {
    selectedProgram = programIds.includes(selectedProgram)
      ? selectedProgram
      : programIds[0];
  }

  const selectedProgramName =
    programs.find(program => program.id === selectedProgram)?.name ??
    'Не выбрано';
  const handleProgramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFields({ programId: +e.target.value }));
  };

  const canMoveToNextStep = formData.programId !== null;

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Выберите программу</h2>
      </div>

      <div className={styles['program-list']}>
        {programs
          .filter(program => programIds.includes(program.id))
          .map(program => (
            <label
              key={program.id}
              className={`${styles['program-option']} ${
                selectedProgram === program.id ? styles.selected : ''
              }`}
            >
              <input
                type="radio"
                name="program"
                value={program.id}
                onChange={handleProgramChange}
                checked={selectedProgram === program.id}
                className={styles['radio-input']}
                required
              />
              <div className={styles['program-content']}>
                <h3 className={styles['program-name']}>{program.name}</h3>
                <div className={styles.coverage}>
                  Общее покрытие - {program.liability} EUR
                </div>
                <p className={styles.description}>{program.description}</p>
              </div>
            </label>
          ))}
      </div>

      <button className={styles['compare-button']}>Сравнить программы</button>

      <FormNavigationButton
        className={styles['next-button']}
        navigation="next"
        disabled={!canMoveToNextStep}
      >
        Выбрать {selectedProgramName}
        <span className={styles.price}>
          {programs.find(program => program.id === selectedProgram)?.liability}{' '}
          EUR
        </span>
      </FormNavigationButton>

      <p className={styles.note}>
        Не волнуйтесь! Вы можете покинуть сайт и продолжить с этого момента в
        любое время
      </p>
    </>
  );
};

export default InsuranceProgramSelector;
