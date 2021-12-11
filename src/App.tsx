import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { UserProvider } from './hooks/useLoggedInUser';
import theme from './utils/theme';
import RoutesSwitch from './components/RoutesSwitch';
import Layout from './components/Layout';
import { ErrorProvider } from './hooks/useError';

const App = () => {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <ErrorProvider>
          <BrowserRouter>
            <CssBaseline />
            <Layout>
              <RoutesSwitch />
            </Layout>
          </BrowserRouter>
        </ErrorProvider>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
