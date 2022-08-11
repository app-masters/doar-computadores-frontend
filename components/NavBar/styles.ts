import Link from 'next/link';
import styled from 'styled-components';

interface NavbarContainerProps {
  isMobileMenuOpen: boolean;
}

export const NavBarContainer = styled.div<NavbarContainerProps>`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 0.5%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) =>
    props.isMobileMenuOpen ? props.theme['secondary'] : props.theme['primary']};
  transition: 0.35s ease;

  @media (max-width: 768px) {
    padding: 0 2%;
  }
`;

export const Logo = styled.button`
  cursor: pointer;
  border: 0;
  background: transparent;
`;

interface MenuBarsProps {
  isMobileMenuOpen: boolean;
}
export const MenuBars = styled.div<MenuBarsProps>`
  color: ${(props) => (props.isMobileMenuOpen ? props.theme['primary'] : props.theme['secondary'])};
`;

export const Menu = styled.div`
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    gap: 16px;
  }

  ul li > {
    a {
      text-decoration: none;
      font-weight: 400;
      font-size: 1.25rem;
      color: ${(props) => props.theme['secondary']};
      opacity: 0.8;
      transition: 0.25s ease;
    }

    a:hover {
      opacity: 1;
    }
  }
  .active {
    a {
      opacity: 1;
    }
  }
`;

interface MenuMobileProps {
  isMobileMenuOpen: boolean;
}

export const MenuMobile = styled.div<MenuMobileProps>`
  position: fixed;
  /* z-index: 9999; */
  left: ${(props) => (props.isMobileMenuOpen ? '0px' : '-100%')};
  top: 5rem;
  width: 100%;
  height: calc(100% - 5rem);
  background-color: ${(props) => props.theme['secondary']};
  transition: 0.35s ease;
  padding: 0 2%;
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    li > a {
      color: ${(props) => props.theme['primary']};
      text-decoration: none;
      font-size: 1.5rem;
      opacity: 0.5;
    }

    .active {
      width: 100%;
      a {
        opacity: 1;
        width: 100%;
        color: ${(props) => props.theme['primary']};
      }
    }
  }
`;

export const ListItemActived = styled.li`
  a {
    text-decoration: none;
    font-weight: 400;
    font-size: 1.25rem;
    color: ${(props) => props.theme['secondary']};
    opacity: 1;
    transition: 0.25s ease;
  }

  a:hover {
    opacity: 1;
  }

  /* @media (max-width: 1440px){
            color: ${(props) => props.theme['gray-300']};
        } */
`;
