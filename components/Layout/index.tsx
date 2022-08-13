import { useEffect, useRef, useState } from 'react';
import { FaCopyright } from 'react-icons/fa';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { Header, PageWrapper } from './styles';

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <PageWrapper>
      <Header>
        <NavBar />
      </Header>
      <main>{children}</main>
      <Footer />
    </PageWrapper>
  );
};
