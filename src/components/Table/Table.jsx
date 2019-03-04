import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.inherit,
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
});

function DataTable(props) {
  const { classes, column, data } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead className={classes.top}>
          <TableRow>
            {
              column.map(header => (
                <CustomTableCell align={header.align}>{header.label}</CustomTableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(trainee => (
            <TableRow>
              <CustomTableCell align="center">{trainee.name}</CustomTableCell>
              <CustomTableCell>{trainee.email}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

DataTable.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  column: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(DataTable);
