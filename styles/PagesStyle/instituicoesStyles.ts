import styled from 'styled-components';

export const InstitutionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* flex-wrap: wrap; */
  /* gap: 1rem; */
  max-width: 1440px;

  margin: 0 auto;

  h1,
  p {
    color: ${(props) => props.theme.secondary};
    /* line-height: 1.75rem; */
    padding: 0;
  }

  & > p {
    padding-bottom: 1rem;
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 0 2%;
    text-align: center;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 1rem;
  flex-wrap: wrap;
  min-width: 25%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 0;
  }
  @media screen and (min-width: 1024px) and (max-width: 1440px) {
    /* justify-content: center; */
    align-items: initial;
  }
`;

export const InstitutionCard = styled.div`
  margin-bottom: 1rem;

  background-color: ${(props) => props.theme['gray-50']};
  border-radius: 0.5rem;
  padding: 0.5rem;

  height: fit-content;
  width: calc(25% - 1rem);

  p {
    color: ${(props) => props.theme['gray-700']};
    text-align: center;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-align: center;
    font-size: 1rem;
  }

  @media screen and (min-width: 0px) and (max-width: 425px) {
    width: 100%;
  }

  @media screen and (min-width: 426px) and (max-width: 768px) {
    width: 80%;
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: calc(33.33% - 1rem);
  }

  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    width: calc(25% - 1rem);
  }

  @media (min-width: 768px) {
    p {
      max-height: 150px;
      overflow: hidden;
    }
  }
`;

export const LocationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  && > div {
    display: flex;
    gap: 0.5rem;
  }
  b {
    color: ${(props) => props.theme['gray-900']};
    font-weight: 500;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  a {
    color: ${(props) => props.theme['gray-700']};
  }
`;

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;

  && .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: ${(props) => props.theme['gray-900']};
    font-weight: 100;
    font-size: 1rem;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  && .tooltiptext::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${(props) => props.theme['gray-900']} transparent transparent transparent;
  }

  &&:hover .tooltiptext {
    visibility: visible;
    opacity: 0.95;
  }
`;

export const Divider = styled.div`
  width: 100%;
  border-bottom: 2px solid ${(props) => props.theme['gray-100']};
`;
