import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { AddDialog, RemoveDialog, EditDialog } from './components';
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
    edit: false,
    remove: false,
    order: 'asc',
    orderBy: '',
    rowsPerPage: 10,
    page: 0,
    data: '',
    name: '',
    email: '',
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

  getFormattedDate = (date) => {
    moment.defaultFormat = 'dddd, MMMM Do YYYY, h:mm:ss a';
    return (moment(moment.utc(date).toDate().toString()).format(moment.defaultFormat));
  }

  handleSelect = (event, id) => {
    const { history } = this.props;
    return (history.push(`/trainee/${id}`));
  };

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

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleEditDialogOpen = (event, record) => {
    event.stopPropagation();
    const { name, email } = record;
    this.setState({ name, email, edit: true });
  };

  handleEditClose = () => {
    this.setState({ edit: false });
  };

  handleEditSubmit = (data) => {
    console.log('Edited Item ', data);
    this.setState({ edit: false });
  }

  handleRemoveDialogOpen = (event, record) => {
    event.stopPropagation();
    this.setState({ data: record, remove: true });
  };

  handleRemoveClose = () => {
    this.setState({ remove: false });
  };

  handleRemoveSubmit = (data) => {
    console.log('Deleted Item ', data);
    this.setState({ remove: false });
  }

  render() {
    const {
      open,
      edit,
      remove,
      order,
      data,
      orderBy,
      rowsPerPage,
      page,
      name,
      email,
    } = this.state;
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
              align: 'center',
              format: this.getFormattedDate,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={100}
          rowsPerPage={rowsPerPage}
          page={page}
          actions={[
            {
              icon: <EditIcon />,
              handler: this.handleEditDialogOpen,
            },
            {
              icon: <DeleteIcon />,
              handler: this.handleRemoveDialogOpen,
            },
          ]}
          onChangePage={this.handleChangePage}
        />
        <EditDialog
          open={edit}
          data={data}
          onSubmit={this.handleEditSubmit}
          onClose={this.handleEditClose}
          Name={name}
          Email={email}
        />
        <RemoveDialog
          open={remove}
          data={data}
          onSubmit={this.handleRemoveSubmit}
          onClose={this.handleRemoveClose}
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
