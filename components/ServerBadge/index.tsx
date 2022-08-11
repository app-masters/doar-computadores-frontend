import { ServerBadgeWrapper } from './styles';

interface ServerBadgeProps {
  isServerRunning: boolean | null;
}

const ServerBadge = ({ isServerRunning }: ServerBadgeProps) => {
  return (
    <ServerBadgeWrapper isServerRunning={isServerRunning}>
      {isServerRunning === null ? (
        <p></p>
      ) : isServerRunning !== null && isServerRunning ? (
        <p>API Online</p>
      ) : (
        <p>API Offline</p>
      )}
    </ServerBadgeWrapper>
  );
};

export default ServerBadge;
