import { FC } from 'react';
import { Box, Card, CardActionArea, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Canvas from './Canvas';
import { ParsedConfiguration } from '../models/Configuration';
import { Delete } from '@mui/icons-material';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { deleteDoc } from 'firebase/firestore';
import { usersConfigurationDocument } from '../utils/firebase';

type Props = {
  configuration: ParsedConfiguration;
  canDelete?: boolean;
};

const ConfigurationPreview: FC<Props> = ({ configuration, canDelete = false }) => {
  const navigate = useNavigate();

  const openConfiguration = () => {
    navigate(`/configurations/${configuration.id}`);
  };

  const user = useLoggedInUser();

  const deleteConfiguration = async () => {
    if (user) {
      await deleteDoc(usersConfigurationDocument(user.uid, configuration.id));
    }
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
      {canDelete && (
        <CardActions>
          <IconButton color="error" title="Delete" onClick={deleteConfiguration}>
            <Delete />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default ConfigurationPreview;
