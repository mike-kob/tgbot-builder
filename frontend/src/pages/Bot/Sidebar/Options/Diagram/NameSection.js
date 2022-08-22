import React, { useContext, useState } from 'react';
import {
  Typography, TextField, Button, Dialog, DialogTitle, DialogActions,
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import { ACTION, INIT_NODE_ID } from '@/pages/Bot/constants';
import { DiagramContext } from '../../../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  nameField: {
    width: '100%',
    padding: theme.spacing(1, 0),
  },
}));

function NameSection(props) {
  const classes = useStyles(props);
  const { current } = props;
  const [state, dispatch] = useContext(DiagramContext);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (e) => {
    dispatch({ type: 'UPDATE_NODE', data: current.setIn(['data', 'label'], e.target.value) });
  };

  const handleRemove = () => {
    const deleteId = current.get('id');
    const actionUpdate = (actions) => actions
      .filter((a) => a.get('type') === ACTION.CHANGE_STATE && a.getIn(['options', 'state']) !== deleteId);
    const newBot = state.get('bot')
      .deleteIn(['src', deleteId])
      .update('src', (src) => src.map((node) => node
        .updateIn(['data', 'initial'], actionUpdate)
        .updateIn(['data', 'messages'], (els) => els.map((msg) => msg.update('actions', actionUpdate)))
        .updateIn(['data', 'commands'], (els) => els.map((cmd) => cmd.update('actions', actionUpdate)))));
    dispatch({ type: 'SET_BOT', data: newBot });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" align="center">User state</Typography>
      <TextField
        value={current.getIn(['data', 'label'])}
        onChange={handleChange}
        variant="outlined"
        size="small"
        className={classes.nameField}
        inputProps={{ maxLength: 50 }}
        disabled={current.get('id') === INIT_NODE_ID}
      />
      <Button
        variant="outlined"
        onClick={() => setDialogOpen(true)}
        disabled={current.get('id') === INIT_NODE_ID}
      >
        Remove
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Do you want to remove this state?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={handleRemove} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NameSection;
