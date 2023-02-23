import React, { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import { queryClient } from 'utils/queryClient';
import { themeSettings } from 'theme';

import { useRoutes } from 'react-router-dom';
import { AuthProvider } from 'contexts/JWTAuthContext';
import routes from './routes';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const content = useRoutes(routes);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>{content}</AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
