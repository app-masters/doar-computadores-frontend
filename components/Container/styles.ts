import styled from 'styled-components';

interface ContainerDefaultProps {
  bg: string;
  h: string;
  maxH?: string;
  justify: string;
}

export const ContainerDefault = styled.div<ContainerDefaultProps>`
  display: flex;
  background: ${(props) => props.theme[props.bg]};
  min-height: calc(${(props) => props.h} - 6rem);
  max-height: ${(props) => props.maxH};
  /* max-height: ${(props) => props.h}; */
  justify-content: ${(props) => props.justify};

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
