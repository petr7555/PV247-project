import { FC, useState } from 'react';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import SaveIcon from '@mui/icons-material/Save';
import { Form } from 'react-final-form';
import getUniqueName from '../utils/getUniqueName';
import RequiredTextInput from './RequiredTextInput';
import { Radios } from 'mui-rff';
import useOfflineStatus from '../hooks/useOfflineStatus';
import OfflineTooltip from './OfflineTooltip';
import useLoggedInUser from '../hooks/useLoggedInUser';
import Canvas from './Canvas';
import addConfigurationToUser from '../api/addConfigurationToUser';
import Generation from '../models/Generation';
import getShareableLink from '../api/getShareableLink';
import useError from '../hooks/useError';

const defaultConfigName = getUniqueName();

type Props = {
  generations: Generation[];
  boardSize: number;
};

const CURRENT_GENERATION = 'CURRENT_GENERATION';
const WHOLE_SIMULATION = 'WHOLE_SIMULATION';

const Social: FC<Props> = ({ generations, boardSize }) => {
  const isOffline = useOfflineStatus();
  const user = useLoggedInUser();
  const [, setError] = useError();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [saveDialogIsOpen, setSaveDialogOpen] = useState(false);
  const [generatingShareLink, setGeneratingShareLink] = useState(false);

  const handleShare = async () => {
    setGeneratingShareLink(true);
    const { link, errorMsg } = await getShareableLink(generations[0], boardSize, user);
    if (errorMsg) {
      setError(errorMsg);
    } else if (link) {
      await navigator.clipboard.writeText(link);
      setSnackbarOpen(true);
    }
    setGeneratingShareLink(false);
  };

  const onSaveButtonClick = async () => {
    setSaveDialogOpen(true);
  };

  const getCurrentGeneration = () => generations.slice(-1)[0];

  const getFirstGeneration = () => generations[0];

  const handleSubmit = async ({ configName, saveType }: { configName: string; saveType: string }) => {
    setSaveDialogOpen(false);
    const generation = saveType === CURRENT_GENERATION ? getCurrentGeneration() : getFirstGeneration();
    const { errorMsg } = await addConfigurationToUser(generation, boardSize, user, configName);
    if (errorMsg) {
      setError(errorMsg);
    }
  };

  const closeSnackbar = () => setSnackbarOpen(false);
  const closeSaveDialog = () => setSaveDialogOpen(false);

  const radioButtonsInRow = useMediaQuery('(min-width:768px)');

  type SaveButtonProps = {
    disabled?: boolean;
  };

  const SaveButton: FC<SaveButtonProps> = ({ disabled }) => (
    <Button variant="contained" endIcon={<SaveIcon />} onClick={onSaveButtonClick} disabled={isOffline || disabled}>
      Save
    </Button>
  );

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ marginTop: 7 }}
        autoHideDuration={3000}
        open={snackbarOpen}
        onClose={closeSnackbar}
      >
        <Alert severity="success" sx={{ backgroundColor: 'grey.800' }}>
          Link has been copied to clipboard.
        </Alert>
      </Snackbar>

      <Form
        initialValues={{
          configName: defaultConfigName,
          saveType: CURRENT_GENERATION,
        }}
        onSubmit={handleSubmit}
        render={({ handleSubmit, form }) => (
          <Dialog open={saveDialogIsOpen} onClose={closeSaveDialog}>
            <DialogTitle>Save</DialogTitle>
            <DialogContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <RequiredTextInput id="configName" label="Configuration name" sx={{ marginTop: 1 }} />

              <Radios
                name="saveType"
                required={true}
                data={[
                  { value: CURRENT_GENERATION, label: 'Current generation' },
                  { value: WHOLE_SIMULATION, label: 'Whole simulation' },
                ]}
                radioGroupProps={{ row: radioButtonsInRow, ['aria-label']: 'save type' }}
              />

              <Typography component="h3">Preview:</Typography>
              <Canvas
                generation={
                  form.getFieldState('saveType')?.value === CURRENT_GENERATION
                    ? getCurrentGeneration()
                    : getFirstGeneration()
                }
                boardSize={boardSize}
                canvasWidth={250}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={closeSaveDialog}>Cancel</Button>
              <Button onClick={handleSubmit} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}
      />

      <Stack direction="row" alignItems="center" gap={2} sx={{ marginY: 3 }}>
        <OfflineTooltip>
          <Button
            variant="contained"
            endIcon={generatingShareLink ? <CircularProgress sx={{ color: 'grey.500' }} size={17} /> : <ShareIcon />}
            onClick={handleShare}
            disabled={generatingShareLink || isOffline}
          >
            Share
          </Button>
        </OfflineTooltip>

        <OfflineTooltip>
          {user ? (
            <SaveButton />
          ) : (
            <Tooltip title="Log in to be able to save configurations.">
              <span>
                <SaveButton disabled />
              </span>
            </Tooltip>
          )}
        </OfflineTooltip>
      </Stack>
    </>
  );
};

export default Social;
