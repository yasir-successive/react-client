import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { theme } from './theme';
import { Trainee } from './pages';

const App = () => (
  <>
    <Typography>
      <Trainee />
    </Typography>
  </>
);
export default App;
