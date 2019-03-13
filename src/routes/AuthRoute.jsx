import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
  component: PropTypes.element.isRequired,
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      (!localStorage.getItem('token'))
        ? (
          <Component {...matchProps} />
        )
        : <Redirect to="/trainee" />
    )}
  />
);

AuthRoute.propTypes = propTypes;
export default AuthRoute;
