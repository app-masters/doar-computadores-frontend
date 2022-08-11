import React from 'react';
import { LabelWrapper, SelectContainer, SelectInput } from './styles';

interface SelectProps {
  data: { value: string; label: string }[];
  placeholder?: string;
  w: string;
  register: any;
  errors: any;
}

const Select = ({ data, placeholder, w, register, errors }: SelectProps) => {
  return (
    <SelectContainer w={w}>
      <LabelWrapper>
        <label htmlFor={register.name}>
          <p>{placeholder}</p>
        </label>
        <p>{errors && errors[register.name]?.message === 'Required' && ''}</p>
      </LabelWrapper>
      <SelectInput {...register}>
        {data.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectInput>
    </SelectContainer>
  );
};

export default Select;
