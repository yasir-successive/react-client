import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { AddDialog } from './components';

const styles = theme => ({
  button: {
    fontSize: '15px',
    padding: '12px',
    margin: theme.spacing.unit * 3,
  },
});
class Trainee extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleTrainee = (record) => {
    console.log('Details are - ', record);
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { classes } = this.props;
    return (
      <>
        <Button
          className={classes.button}
          variant="outlined"
          onClick={this.handleClickOpen}
          color="primary"
          size="small"
        >
          ADD TRAINEE
        </Button>
        <AddDialog
          open={open}
          onSubmit={this.handleTrainee}
          onClose={this.handleClose}
        />
      </>
    );
  }
}
Trainee.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(Trainee);
