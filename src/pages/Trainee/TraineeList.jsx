import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { AddDialog } from './components';
import { DataTable } from '../../components';
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
    order: 'asc',
    orderBy: '',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleTrainee = () => {
    this.setState({ open: false });
  };

  getFormattedDate = (date) => {
    moment.defaultFormat = 'dddd, MMMM Do YYYY, h:mm:ss a';
    return (moment(moment.utc(date).toDate().toString()).format(moment.defaultFormat));
  }

  handleSort = (event, property) => {
    this.createSortHandler(event, property);
  };

  createSortHandler = (event, property) => {
    const newOrderBy = property;
    let newOrder = 'desc';
    const { order, orderBy } = this.state;
    if (orderBy === property && order === 'desc') {
      newOrder = 'asc';
    }
    this.setState({ order: newOrder, orderBy: newOrderBy });
  };

  handleSelect = (event, id) => {
    const { history } = this.props;
    return (history.push(`/trainee/${id}`));
  };

  render() {
    const { open, order, orderBy } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div align="right">
          <Button
            className={classes.button}
            variant="outlined"
            onClick={this.handleClickOpen}
            color="primary"
            size="small"
          >
            ADD TRAINEE LIST
          </Button>
          <AddDialog
            open={open}
            onSubmit={this.handleTrainee}
            onClose={this.handleClose}
          />
        </div>
        <DataTable
          data={trainees}
          column={[
            {
              field: 'name',
              label: 'Name',
              align: 'center',
            },
            {
              field: 'email',
              label: 'Email Address',
              format: value => value && value.toUpperCase(),
            },
            {
              field: 'createdAt',
              label: 'Date',
              align: 'right',
              format: this.getFormattedDate,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
        />
      </>
    );
  }
}
TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.shape({ url: PropTypes.string, path: PropTypes.string }).isRequired,
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(TraineeList);
