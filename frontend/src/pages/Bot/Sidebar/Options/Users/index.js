import React, { useContext } from 'react';
import {
  Typography, Box, Table, TableBody, TableRow, TableCell, Button,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Map } from 'immutable';

import { DiagramContext } from '../../../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
  },
  rightPanel: {
    marginLeft: 'auto',
  },
  stateTitle: {

  },
  noSelected: {
    display: 'flex',
  },
  outlinedButton: {
    border: '2px solid',
    borderRadius: '7px',
    maxWidth: theme.spacing(20),
    margin: theme.spacing(1, 'auto'),
    '&:hover': {
      border: '2px solid',
    },
  },
}));

function UsersOptions(props) {
  const classes = useStyles(props);
  const [state, dispatch] = useContext(DiagramContext);

  const selected = state.get('selectedUser');

  const handleOpenHistory = () => dispatch({ type: 'UPDATE_HISTORY_DRAWER', data: true });

  if (!selected.get('id')) {
    return (
      <Box mt={1} mx="auto" display="flex">
        <Typography variant="subtitle1" color="textSecondary" style={{ margin: 'auto' }}>
          No selected user
        </Typography>
      </Box>
    );
  }

  return (
    <div className={classes.root}>
      <Typography>
        User info
      </Typography>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="left">{selected.get('id')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>First name</TableCell>
            <TableCell align="left">{selected.get('firstName')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Last name</TableCell>
            <TableCell align="left">{selected.get('lastName')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="left">{selected.get('username')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Current state</TableCell>
            <TableCell align="left">{selected.get('state')}</TableCell>
          </TableRow>
        </TableBody>
        <Box m={1} />
        <Typography variant="subtitle1">
          User data
        </Typography>
        <TableBody>
          {Object.entries(selected.get('db', new Map()).toJS()).map((row) => (
            <TableRow
              key={row[0]}
            >
              <TableCell component="th" scope="row" variant="head">
                {row[0]}
              </TableCell>
              <TableCell align="left">{row[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box mx="auto" my={1}>
        <Button variant="outlined" color="primary" className={classes.outlinedButton} onClick={handleOpenHistory}>
          View chat
        </Button>
      </Box>
    </div>
  );
}

export default UsersOptions;
