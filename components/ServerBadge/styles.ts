import styled from 'styled-components';

interface ServerBadgeProps {
  isServerRunning: boolean | null;
}

export const ServerBadgeWrapper = styled.div<ServerBadgeProps>`
  display: ${(props) => (props.isServerRunning === null ? 'none' : 'initial')};
  position: absolute;
  top: 1rem;
  /* left: 1rem; */

  border-radius: 0.5rem;

  padding: 0.5rem;

  background-color: ${(props) =>
    props.isServerRunning ? props.theme['green-300'] : props.theme['red-300']};
  opacity: 0.8;

  transition: 0.5s ease;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    right: 1rem;
  }
  @media (min-width: 769px) {
    left: 1rem;
  }
`;
