import styled from 'styled-components';

export const FormGroupWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;

  border-top: 2px solid ${(props) => props.theme['gray-100']};
  padding: 0.5rem 0;

  width: 98%;
  margin: 0 auto;

  && > p {
    background: ${(props) => props.theme['gray-50']};
    color: ${(props) => props.theme['gray-300']};
    position: absolute;
    top: -14px;
    left: 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
  }
`;
