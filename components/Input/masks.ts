import { FormEvent } from 'react';

export function phone(e: FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 15;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, ''); // REMOVE EVERYTHING THAT IS NOT NUMBER
  value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // PUT PARENTHESES AROUND THE FIRST TWO DIGITS
  value = value.replace(/(\d)(\d{4})$/, '$1-$2'); //PUT HYPHEN BETWEEN THE FIFTH DIGITAL

  e.currentTarget.value = value;
  return e;
}

export function zipcode(e: FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 9;
  let value = e.currentTarget.value;
  value = value.replace(/(\d{5})(\d)$/, '$1-$2');

  e.currentTarget.value = value;
  return e;
}
