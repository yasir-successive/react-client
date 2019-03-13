import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.inherit,
    fontSize: 12,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 600,
    textSize: 12,
  },
  top: {
    fontWeight: 'bold',
  },
  strip: {
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});
class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      classes,
      column,
      data,
      onSelect,
      orderBy,
      order,
      onSort,
    } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead className={classes.top}>
            <TableRow>
              {
                column.map(cols => (
                  <CustomTableCell key={cols.field} align={cols.align} className={classes.head}>
                    <TableSortLabel
                      active={orderBy === cols.field}
                      direction={order}
                      onClick={event => onSort(event, cols.field)}
                    >
                      {cols.label}
                    </TableSortLabel>
                  </CustomTableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(trainee => (
              <TableRow
                className={classes.strip}
                key={trainee.id}
                hover
                onClick={event => onSelect(event, trainee.id)}
              >
                {
                  column.map(cols => (
                    cols.format
                      ? (
                        <CustomTableCell align={cols.align}>
                          {cols.format(trainee[cols.field])}
                        </CustomTableCell>
                      )
                      : <CustomTableCell align={cols.align}>{trainee[cols.field]}</CustomTableCell>
                  ))
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}


DataTable.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  column: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
};

DataTable.defaultProps = {
  order: 'asc',
  orderBy: '',
};

export default withStyles(styles)(DataTable);
