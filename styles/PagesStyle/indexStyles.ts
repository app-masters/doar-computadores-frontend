import styled from 'styled-components';
export const HomeWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  min-height: calc(100vh - 6rem);

  background: ${(props) => props.theme['primary']};

  max-width: 1440px;
  margin: 0 auto;
  padding: 0 0.5%;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0 2%;
  }
`;

interface HeroContainerProps {
  formHeight: number;
}

export const HeroContainer = styled.div<HeroContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: initial;
  height: ${props => props.formHeight > 0? `${props.formHeight}px` : '100%'};

  margin: 1rem;

  h1 {
    font-size: 2.8125rem;
    line-height: 1;
  }
  h1,
  h2,
  h3,
  h4,
  p {
    color: ${(props) => props.theme['secondary']};
  }

  @media (max-width: 1024px) {
    margin-top: 4rem;
    text-align: center;
    h1 {
      font-size: 1.5rem;
    }
    h2,
    h3,
    h4,
    p {
      font-size: 1rem;
      font-weight: normal;
    }
  }

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  @media (min-width: 1440px) {
    flex-direction: column;
    width: 40%;
  }
`;

export const StickyContainer = styled.div`
  position: sticky;
  top: 6rem;
`
