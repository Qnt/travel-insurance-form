import React from 'react';
import { useDispatch } from 'react-redux';
import { nextStep, prevStep } from '../../redux/formSlice';

type FormNavigationButtonProps = {
  children: React.ReactNode;
  navigation: 'next' | 'prev';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function FormNavigationButton(props: FormNavigationButtonProps) {
  const dispatch = useDispatch();

  function handleClick() {
    if (props.navigation === 'next') {
      dispatch(nextStep());
    }
    if (props.navigation === 'prev') {
      dispatch(prevStep());
    }
  }

  return (
    <button type="button" onClick={handleClick} {...props}>
      {props.children}
    </button>
  );
}

export default FormNavigationButton;
