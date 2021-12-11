import { FC, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Canvas from './Canvas';
import { ParsedConfiguration } from '../models/Configuration';
import { Delete } from '@mui/icons-material';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { deleteDoc } from 'firebase/firestore';
import { usersConfigurationDocument } from '../utils/firebase';

type Props = {
  configuration: ParsedConfiguration;
  isPrivate?: boolean;
};

const ConfigurationPreview: FC<Props> = ({ configuration, isPrivate = false }) => {
  const navigate = useNavigate();

  const openConfiguration = () => {
    navigate(`/configurations/${configuration.id}?private=${isPrivate}`);
  };

  const user = useLoggedInUser();

  const deleteConfiguration = async () => {
    closeConfirmationDialog();
    if (user) {
      await deleteDoc(usersConfigurationDocument(user.uid, configuration.id));
    }
  };

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const openConfirmationDialog = () => {
    setConfirmationDialogOpen(true);
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  return (
    <>
      <Dialog open={confirmationDialogOpen} onClose={closeConfirmationDialog}>
        <DialogTitle>Please confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you really want to delete this configuration?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteConfiguration} color="error" variant="outlined" autoFocus>
            Delete
          </Button>
          <Button onClick={closeConfirmationDialog} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

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
        {isPrivate && (
          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton color="error" title="Delete" onClick={openConfirmationDialog}>
              <Delete />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </>
  );
};

export default ConfigurationPreview;
