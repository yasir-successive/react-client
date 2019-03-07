import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  InputAdornment,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PasswordIcon from '@material-ui/icons/VisibilityOff';
import Person from '@material-ui/icons/Person';
import Email from '@material-ui/icons/Email';
import { SnackBarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

const styles = theme => ({
  header: {
    padding: theme.spacing.unit * 2,
  },
});

const Schema = yup.object({
  name: yup.string().required().label('Name'),
  email: yup.string().email().required().label('Email Address'),
  password: yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Must contains 8 characters, at least one uppercase letter, one lowercase letter and one number')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Must match password')
    .required('Confirm Password is required'),
});

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

class AddDialog extends Component {
  state = {
    errors: {},
    touched: {},
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  handleChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
    }, this.handleValidate);
  }

  handleBlur = index => () => {
    const { touched } = this.state;
    touched[index] = true;
    this.setState({
      touched,
    }, () => this.handleValidate());
  }

  handleValidate = () => {
    const {
      name,
      email,
      password,
      confirmPassword,
    } = this.state;
    Schema.validate({
      name,
      email,
      password,
      confirmPassword,
    }, { abortEarly: false })
      .then(() => {
        this.handleErrors(null);
      })
      .catch((errors) => {
        this.handleErrors(errors);
      });
  }

  handleErrors = (errors) => {
    const catchErrors = {};
    if (errors) {
      errors.inner.forEach((error) => {
        catchErrors[error.path] = error.message;
      });
    }
    this.setState({
      errors: catchErrors,
    });
  }

  getError = (field) => {
    const { errors, touched } = this.state;
    if (!touched[field]) {
      return null;
    }
    const err = '';
    return errors[field] || err;
  }

  hasErrors = () => {
    const { errors } = this.state;
    return Object.keys(errors).length !== 0;
  }

  isTouched = () => {
    const { touched } = this.state;
    return Object.keys(touched).length !== 0;
  }

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const {
      name,
      email,
      password,
    } = this.state;
    onSubmit({
      name,
      email,
      password,
    });
  }

  render() {
    const {
      open,
      onClose,
      classes,
    } = this.props;

    const {
      email,
      name,
      password,
      confirmPassword,
    } = this.state;

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your trainee details</DialogContentText>
          <div className={classes.header}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Name"
                  type="text"
                  value={name}
                  onChange={this.handleChange('name')}
                  onBlur={this.handleBlur('name')}
                  error={this.getError('name')}
                  helperText={this.getError('name')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Email Address"
                  type="text"
                  value={email}
                  fullWidth
                  onChange={this.handleChange('email')}
                  onBlur={this.handleBlur('email')}
                  error={this.getError('email')}
                  helperText={this.getError('email')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="Password"
                  type="password"
                  value={password}
                  fullWidth
                  onChange={this.handleChange('password')}
                  onBlur={this.handleBlur('password')}
                  error={this.getError('password')}
                  helperText={this.getError('password')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  fullWidth
                  onChange={this.handleChange('confirmPassword')}
                  onBlur={this.handleBlur('confirmPassword')}
                  error={this.getError('confirmPassword')}
                  helperText={this.getError('confirmPassword')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">Cancel</Button>
          <SnackBarConsumer>
            {({ openSnackbar }) => (
              <Button
                onClick={() => { this.handleSubmit(); openSnackbar('Trainee Successfully Created', 'success'); }}
                color="primary"
                variant="contained"
                disabled={this.hasErrors() || !this.isTouched()}
              >
                Submit
              </Button>
            )}
          </SnackBarConsumer>
        </DialogActions>
      </Dialog>
    );
  }
}

AddDialog.propTypes = propTypes;
export default withStyles(styles)(AddDialog);