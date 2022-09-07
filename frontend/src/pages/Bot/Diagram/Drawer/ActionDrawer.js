import React, { useCallback, useContext } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  Typography,
  Box,
  Drawer,
  Button,
  AppBar,
  Toolbar,
} from '@mui/material';
import clsx from 'clsx';

import { DRAWER, INIT_NODE_ID } from '@/pages/Bot/constants';
import Action from './actions/Action';
import { DiagramContext, actionFactory } from '../../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(70),
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  actionButtons: {
    marginTop: 'auto',
    marginLeft: 'auto',
  },
  outlinedButton: {
    border: '2px solid',
    '&:hover': {
      border: '2px solid',
    },
  },
  addAction: {
    width: theme.spacing(30),
    margin: theme.spacing(1, 'auto'),
  },
  saveButton: {
    color: 'white',
    marginLeft: theme.spacing(1),
  },
}));

function ActionDrawer(props) {
  const classes = useStyles(props);
  const [state, dispatch] = useContext(DiagramContext);
  const selectedId = state.getIn(['selected', 'id']);
  const current = state.getIn(['bot', 'src', selectedId]);
  const actions = state.get('currentActions');

  const handleAddAction = useCallback(() => {
    dispatch({
      type: 'UPDATE_CUR_ACTIONS',
      data: actions.push(actionFactory().set('id', String(actions.size))),
    });
  }, [actions]);

  const handleCloseDrawer = useCallback(() => {
    dispatch({ type: 'UPDATE_DRAWER', data: false });
  }, []);

  const handleSave = () => {
    switch (state.get('drawer')) {
      case DRAWER.INITIAL:
        dispatch({
          type: 'UPDATE_NODE',
          data: current.setIn(['data', 'initial'], actions),
        });
        break;
      case DRAWER.COMMAND:
        dispatch({
          type: 'UPDATE_NODE',
          data: current.setIn(['data', 'commands', state.getIn(['currentCommand', 'id']), 'actions'], actions),
        });
        break;
      case DRAWER.MESSAGE:
        dispatch({
          type: 'UPDATE_NODE',
          data: current.setIn(['data', 'messages', state.getIn(['currentMessage', 'index']), 'actions'], actions),
        });
        break;
      case DRAWER.SCHEDULE:
        dispatch({
          type: 'UPDATE_NODE',
          data: current.setIn(['data', 'schedule', state.getIn(['currentScheduleEntry', 'index']), 'actions'], actions),
        });
        break;
    }

    dispatch({ type: 'UPDATE_DRAWER', data: false });
  };

  return (
    <Drawer
      anchor="right"
      open={Boolean(state.get('drawer'))}
      onClose={() => dispatch({ type: 'UPDATE_DRAWER', data: false })}
    >
      <Toolbar />
      <div className={classes.root}>
        <Typography variant="h6" align="center">
          {state.get('drawer') === DRAWER.INITIAL && 'Initial actions'}
          {state.get('drawer') === DRAWER.COMMAND && 'Command actions'}
          {state.get('drawer') === DRAWER.MESSAGE && 'Message pattern actions'}
          {state.get('drawer') === DRAWER.SCHEDULE && 'Schedule actions'}
        </Typography>
        {actions.map((a, i) => (
          <Box m={1} key={i}>
            <Action action={a} index={i} />
          </Box>
        ))}
        <Button
          onClick={handleAddAction}
          className={clsx(classes.outlinedButton, classes.addAction)}
          variant="outlined"
          color="primary"
        >
          + Add action
        </Button>
        <div className={classes.actionButtons}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleCloseDrawer}
            className={classes.outlinedButton}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            className={classes.saveButton}
          >
            Save
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default ActionDrawer;
