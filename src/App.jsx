import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { theme } from './theme';
import {
  InputDemo,
  Login,
  TextFieldDemo,
  ChildrenDemo,
  NoMatch,
  Trainee,
} from './pages';
import { AuthRoute, PrivateRoute } from './routes';
import { Navbar } from './Layouts/components/Navbar';

const App = () => (
  <>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <>
          <Navbar />
          <Switch>
            <AuthRoute exact path="/Login" component={Login} />
            <PrivateRoute exact path="/text-field-demo" component={TextFieldDemo} />
            <PrivateRoute exact path="/trainee/:id?" component={Trainee} />
            <PrivateRoute exact path="/input-demo" component={InputDemo} />
            <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
            <PrivateRoute component={NoMatch} />

          </Switch>
        </>
      </Router>
    </MuiThemeProvider>
  </>
);
export default App;
