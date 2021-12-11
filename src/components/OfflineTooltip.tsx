import { Tooltip } from '@mui/material';
import { FC } from 'react';
import useOfflineStatus from '../hooks/useOfflineStatus';

const OfflineTooltip: FC = ({ children }) => {
  const isOffline = useOfflineStatus();

  if (isOffline) {
    return (
      <Tooltip title="This functionality is available only online.">
        <span>{children}</span>
      </Tooltip>
    );
  }

  return <>{children}</>;
};

export default OfflineTooltip;
