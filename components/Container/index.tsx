import React from 'react';
import { ContainerDefault } from './styles';

interface ContainerProps {
  children: JSX.Element[] | JSX.Element;
  bg: string;
  h: string;
  maxH?: string;
  justify?: string;
}

const Container = ({ children, bg, h, maxH, justify = 'space-between' }: ContainerProps) => {
  return (
    <ContainerDefault bg={bg} h={h} maxH={maxH} justify={justify}>
      {children}
    </ContainerDefault>
  );
};

export default Container;
