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
import { SnackBarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

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

  const Date = '2019-02-14T18:15:11.778Z';

  return (
    <SnackBarConsumer>
      {({ openSnackbar }) => (
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
            <Button
              variant="contained"
              onClick={() => {
                onSubmit(data);
                if (data.createdAt < Date) {
                  openSnackbar('Trainee can not be Deleted', 'error');
                } else {
                  openSnackbar('Trainee Successfully Deleted', 'success');
                }
              }}
              color="primary"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </SnackBarConsumer>
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
  onSubmit: () => { },
};

RemoveDialog.propTypes = propTypes;
RemoveDialog.defaultProps = defaultProps;
export default withStyles(styles)(RemoveDialog);
