import React, { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { FormControl, Grid, OutlinedInput, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import usePageTitle from '../hooks/usePageTitle';
import ConfigurationPreview from '../components/ConfigurationPreview';
import useSharedConfigurations from '../api/useSharedConfigurations';
import useUsersConfigurations from '../api/useUsersConfigurations';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import { ParsedConfiguration } from '../models/Configuration';

// TODO add option to delete my configurations

const filterConfigurations = (configurations: ParsedConfiguration[], searchTerm: string) => {
  const st = searchTerm.toLowerCase();
  return configurations.filter((config) => {
    return config.name.toLowerCase().includes(st) || config.authorName.toLowerCase().includes(st);
  });
};

const MY = 'MY';
const PUBLIC = 'PUBLIC';

const Configurations: FC = () => {
  usePageTitle('Browse configurations');
  const sharedConfigurations = useSharedConfigurations();
  const usersConfigurations = useUsersConfigurations();

  const [shownConfigType, setShownConfigType] = useState(MY);

  const changeShownConfigType = (event: MouseEvent<HTMLElement>, newShownConfigType: string) => {
    setShownConfigType(newShownConfigType);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const changeSearchTerm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchTerm(event.target.value);
  };

  const displayConfigurations = filterConfigurations(
    shownConfigType === MY ? usersConfigurations : sharedConfigurations,
    searchTerm,
  );

  return (
    <>
      <Stack alignItems="center" sx={{ marginY: 3 }} gap={2}>
        <ToggleButtonGroup exclusive onChange={changeShownConfigType} sx={{ backgroundColor: 'main' }}>
          {[
            {
              value: MY,
              ariaLabel: 'show my configurations',
              Icon: PersonIcon,
            },
            {
              value: PUBLIC,
              ariaLabel: 'show public configurations',
              Icon: PeopleIcon,
            },
          ].map(({ value, ariaLabel, Icon }) => (
            <ToggleButton key={value} value={value} aria-label={ariaLabel} selected={shownConfigType === value}>
              <Icon sx={{ marginRight: '8px', marginLeft: '-4px' }} />
              {value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <FormControl fullWidth>
          <OutlinedInput
            value={searchTerm}
            onChange={changeSearchTerm}
            startAdornment={<SearchIcon sx={{ marginRight: '8px' }} />}
            placeholder="Search..."
          />
        </FormControl>
      </Stack>

      {displayConfigurations.length === 0 ? (
        <Typography>No configurations found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {displayConfigurations.map((configuration) => (
            <Grid key={configuration.id} item xs={12} sm={6} md={4} lg={3}>
              <ConfigurationPreview configuration={configuration} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Configurations;
