import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AddDialog } from './components';
import trainees from './data/trainee';

const styles = theme => ({
  button: {
    fontSize: '15px',
    padding: '12px',
    margin: theme.spacing.unit * 3,
  },
});

class TraineeList extends Component {
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
        <div>
          <ul>
            {
              trainees.map(trainee => (
                <li>
                  <Link to={`/trainee/${trainee.id}`}>{trainee.name}</Link>
                </li>
              ))
            }
          </ul>
        </div>
      </>
    );
  }
}
TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.shape({ url: PropTypes.string, path: PropTypes.string }).isRequired,
};
export default withStyles(styles)(TraineeList);
