import React, { FormEvent, InputHTMLAttributes, useCallback } from 'react';
import { DeepRequired, FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form';
import { phone, zipcode } from './masks';
import { InputContainer, InputText, LabelWrapper } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLElement> {
  inputType: string;
  label?: string;
  placeholder: string;
  mask?: string;
  register?: any;
  w: string;
  errors?: any;
  required?: boolean;
}

const Input = ({
  inputType,
  label,
  placeholder,
  mask,
  register,
  w,
  errors,
  required = false,
}: InputProps) => {
  // USECALLBACK TO GET THE INPUT MASK
  const handleKeyUp = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      if (mask === 'phone') {
        phone(e);
      }
      if (mask === 'zipcode') {
        zipcode(e);
      }
    },
    [mask],
  );

  return (
    <InputContainer w={w} type={inputType}>
      <LabelWrapper>
        <label htmlFor={register.name}>{label && <p>{label}</p>}</label>
        <p>{required && '*'}</p>
        <p>{errors && errors[register.name]?.message}</p>
      </LabelWrapper>
      <InputText
        type={inputType}
        placeholder={placeholder}
        onKeyUp={handleKeyUp}
        {...register}
        errors={errors && errors[register.name]?.message}
      />
    </InputContainer>
  );
};

export default Input;
