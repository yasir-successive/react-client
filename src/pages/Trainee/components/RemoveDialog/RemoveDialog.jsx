
  
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
});

const RemoveDialog = (props) => {
  const {
    classes,
    onClose,
    onSubmit,
    data,
    ...other
  } = props;

  return (
    <>
      <Dialog
        {...other}
        fullWidth
        maxWidth="md"
        onClose={onClose}
      >
        <DialogTitle>Remove Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to remove this trainee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => onClose()} color="default">
            Cancel
          </Button>
          <Button variant="contained" onClick={() => onSubmit(data)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf.isRequired,
};
const defaultProps = {
  open: false,
  onSubmit: () => {},
};
RemoveDialog.propTypes = propTypes;
RemoveDialog.defaultProps = defaultProps;
export default withStyles(styles)(RemoveDialog);
