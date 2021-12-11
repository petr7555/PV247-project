import { FC } from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Canvas from './Canvas';
import { ParsedConfiguration } from '../models/Configuration';

type Props = {
  configuration: ParsedConfiguration;
};

const ConfigurationPreview: FC<Props> = ({ configuration }) => {
  const navigate = useNavigate();

  const openConfiguration = () => {
    navigate(`/configurations/${configuration.id}`);
  };

  return (
    <Card>
      <CardActionArea
        onClick={openConfiguration}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}
      >
        <Canvas generation={configuration.initialGeneration} boardSize={configuration.boardSize} canvasWidth={250} />
        <Box sx={{ alignSelf: 'flex-start' }}>
          <CardContent>
            <Typography variant="h5">{configuration.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {configuration.createdAt.toLocaleString()}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              By: {configuration.authorName}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ConfigurationPreview;
