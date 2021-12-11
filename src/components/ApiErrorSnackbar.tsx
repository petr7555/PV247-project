import React, { FC } from 'react';
import { Alert, Snackbar } from '@mui/material';

type Props = {
  errorMsg: string | undefined;
  closeApiErrorSnackbar: () => void;
};

const ApiErrorSnackbar: FC<Props> = ({ errorMsg, closeApiErrorSnackbar }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ marginTop: 7 }}
      autoHideDuration={4000}
      open={!!errorMsg}
      onClose={closeApiErrorSnackbar}
    >
      <Alert severity="error" sx={{ backgroundColor: 'grey.800' }}>
        {errorMsg}
      </Alert>
    </Snackbar>
  );
};

export default ApiErrorSnackbar;
