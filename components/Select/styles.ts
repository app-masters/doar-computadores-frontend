import styled from 'styled-components';

interface SelectContainerProps {
  w: string;
}

export const SelectContainer = styled.div<SelectContainerProps>`
  width: ${(props) => props.w};
  padding: 0.5rem;
`;

export const LabelWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  label {
    opacity: 0.8;
  }

  & > p {
    color: ${(props) => props.theme['red-300']};
    font-size: 0.75rem;
  }
`;

export const SelectInput = styled.select`
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem;

  border: 0;
  border-radius: 0.5rem;

  font-weight: normal;
  color: ${(props) => props.theme['gray-600']};

  option {
    min-height: 300px;
  }
`;
