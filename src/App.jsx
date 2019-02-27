import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './theme';
import { Trainee, SignIn } from './pages';

const App = () => (
  <>
    <MuiThemeProvider theme={theme}>
      <Typography>
        <CssBaseline />
        <SignIn />
        <Trainee />
      </Typography>
    </MuiThemeProvider>
  </>
);
export default App;
