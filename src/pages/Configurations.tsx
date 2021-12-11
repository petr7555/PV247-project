import React, { FC, useState } from 'react';
import { Box, Button, Grid, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import usePageTitle from '../hooks/usePageTitle';
import ConfigurationPreview from '../components/ConfigurationPreview';
import useSharedConfigurations from '../api/useSharedConfigurations';
import useUsersConfigurations from '../api/useUsersConfigurations';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';

// TODO maybe some filtering (by configuration name, author name,...)
// TODO add option to delete my configurations

const Configurations: FC = () => {
  usePageTitle('Browse configurations');
  const sharedConfigurations = useSharedConfigurations();
  const usersConfigurations = useUsersConfigurations();

  const [configurations, setConfigurations] = useState('myConfigurations');

  const handleChange = (event: React.MouseEvent<HTMLElement>, value: string) => {
    setConfigurations(value);
  };

  const displayConfigurations = configurations === 'myConfigurations' ? usersConfigurations : sharedConfigurations;

  return (
    <>
      <Stack alignItems="center" sx={{ marginY: 3 }}>
        <ToggleButtonGroup exclusive onChange={handleChange} sx={{ backgroundColor: 'main' }}>
          <ToggleButton
            value="myConfigurations"
            aria-label="show my configurations"
            selected={configurations === 'myConfigurations'}
          >
            <PersonIcon sx={{ marginRight: '8px', marginLeft: '-4px' }} />
            My
          </ToggleButton>
          <ToggleButton
            value="publicConfigurations"
            aria-label="show public configurations"
            selected={configurations === 'publicConfigurations'}
          >
            <PeopleIcon sx={{ marginRight: '8px', marginLeft: '-4px' }} />
            Public
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Grid container spacing={2}>
        {displayConfigurations.map((configuration) => (
          <Grid key={configuration.id} item xs={12} sm={6} md={4} lg={3}>
            <ConfigurationPreview configuration={configuration} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Configurations;
