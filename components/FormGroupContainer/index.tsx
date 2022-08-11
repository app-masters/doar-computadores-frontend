import { FormGroupWrapper } from './styles';

interface FormGroupContainerProps {
  title: string;
  children: JSX.Element[] | JSX.Element;
}

const FormGroupContainer = ({ title, children }: FormGroupContainerProps) => {
  return (
    <FormGroupWrapper>
      <p>{title}</p>
      {children}
    </FormGroupWrapper>
  );
};

export default FormGroupContainer;
