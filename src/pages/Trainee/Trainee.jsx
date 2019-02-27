import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { AddDialog } from './components';

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
    console.log('Trainee details - ', record);
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <>
        <Button
          variant="outlined"
          onClick={this.handleClickOpen}
          color="primary"
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
export default Trainee;
