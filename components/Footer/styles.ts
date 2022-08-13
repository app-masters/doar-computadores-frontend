import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem 2.8rem 1rem 2.8rem;

  .container {
    max-width: 1420px;
    margin: 0 auto;
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0 10px 0;
    font-size: 1rem;
    color: #fff;

    svg {
      margin-left: 5px;
    }
  }

  @media (max-width: 720px) {
    padding: 5rem 1.5rem 1rem 1.5rem;

    footer {
      font-size: 0.8rem;
    }
  }
`;

export const Header = styled.header`
  div {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
  }

  a {
    background-color: black;
    height: 35px;
    width: 35px;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: white;
    }
  }

  border-bottom: 1px solid #ffffff69;
`;

export const Logo = styled.h4`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1rem;

  span {
    font-weight: 500;
  }
`;

export const Content = styled.main`
  display: flex;

  flex-direction: row;
  padding-top: 20px;

  @media (max-width: 1070px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const InternsWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2rem;

  position: relative;

  div.line {
    width: 1px;
    position: absolute;
    top: 35px;
    bottom: 0;
    left: 49.9%;
    height: 320px;

    background-color: #ffffff69;
  }

  @media (max-width: 680px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 1060px) {
    div.line {
      display: none;
    }
  }
`;

export const Interns = styled.div`
  margin-top: 10px;
  width: 280px;

  > div {
    background-color: rgba(255, 255, 255, 0.04);
    padding: 1rem;
    border-radius: 5px;
  }

  hr {
    width: 0;
  }

  > span {
    font-size: 0.8rem;
    font-weight: 500;
    color: #fff;
  }
`;

export const Intern = styled.div`
  margin-top: 10px;
  margin-bottom: 12px;

  div {
    font-size: 0.83rem;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  div {
    color: #fff;
    font-weight: 500;
  }

  img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    margin-right: 10px;
    border: 3px solid ${({ theme }) => theme['gray-100']};
  }

  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.07);
  }
`;

export const Social = styled.div`
  div {
    display: flex;
    align-items: center;
    margin-top: 5px;

    a {
      background-color: #027fb3;
      height: 22px;
      width: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 5px;

      transition: background-color 0.3s ease;

      &:not(:last-child) {
        margin-right: 5px;
      }

      svg {
        font-size: 0.75rem;
        color: #fff;
      }

      &:hover {
        background-color: ${({ theme }) => theme['blue-500']};
      }
    }
  }
`;

export const Description = styled.div`
  text-align: justify;
  padding: 0;

  font-size: 0.88rem;

  h4 {
    font-size: 1rem;
    span {
      font-weight: 400;
    }
  }

  p {
    margin-top: 8px;
    line-height: 23px;
  }

  color: #fff;

  a {
    border-radius: 2px;
    color: white;
    font-weight: 600;
    text-decoration: none;
  }

  div {
    margin-top: 10px;
    display: flex;

    span {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 0.8rem;
      margin-right: 10px;
    }

    a {
      background-color: #027fb3;
      border-radius: 4px;
      padding: 0.35rem 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      transition: background-color 0.3s ease;
      border: 1px solid #027fb3;
      font-weight: 400;

      margin-right: 10px;

      &:hover {
        background-color: ${({ theme }) => theme['primary']};
        border: 1px solid ${({ theme }) => theme['blue-300']};
      }

      svg {
        font-size: 1.1rem;
        margin-right: 8px;
      }
    }
  }

  @media (max-width: 1080px) {
    div {
      margin-bottom: 40px;
    }
  }

  @media (max-width: 720px) {
    div {
      justify-content: center;
    }
  }

  @media (min-width: 1080px) {
    padding: 1.6rem 1rem 2rem 4.5rem;
  }
`;
