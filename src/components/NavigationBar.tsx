import { AppBar, Box, Button, Container, Toolbar, Tooltip } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { logOut } from '../utils/firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';
import useOfflineStatus from '../hooks/useOfflineStatus';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import OfflineTooltip from './OfflineTooltip';

const NavigationBar: FC = () => {
  const user = useLoggedInUser();
  const isOffline = useOfflineStatus();

  return (
    <AppBar position="fixed">
      <Container maxWidth="sm">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Button component={Link} to="/">
            Play
          </Button>
          <Button component={Link} to="/configurations">
            Configurations
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <Button onClick={logOut}>Log out</Button>
          ) : (
            <OfflineTooltip>
              <Button component={Link} to="/login" disabled={isOffline}>
                Log in
              </Button>
            </OfflineTooltip>
          )}
          {isOffline && (
            <Tooltip title="You are offline. You can still play the game, but some functionality might not be available.">
              <WifiOffIcon />
            </Tooltip>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
