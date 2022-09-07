import React, { useContext } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { ACTION } from '@/pages/Bot/constants';
import { DiagramContext } from '../../../Context';
import SendMessageAction from './SendMessageAction';
import ChangeStateAction from './ChangeStateAction';
import MakeAPIRequestAction from './MakeAPIRequestAction';
import SaveUserDataAction from './SaveUserDataAction';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
  },
  actionButtons: {
    marginTop: 'auto',
    marginLeft: 'auto',
  },
  buttonRow: {
    marginTop: 'auto',
    marginLeft: 'auto',
    display: 'flex',
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
}));

function Action(props) {
  const classes = useStyles();
  const [state, dispatch] = useContext(DiagramContext);
  const { action, index } = props;
  const currentActions = state.get('currentActions');

  const handleChangeAction = (newAction) => {
    dispatch({
      type: 'UPDATE_CUR_ACTIONS',
      data: currentActions.set(index, newAction),
    });
  };
  const handleSelect = (e) => {
    dispatch({
      type: 'UPDATE_CUR_ACTIONS',
      data: currentActions.setIn([index, 'type'], e.target.value),
    });
  };
  const handleRemove = () => {
    dispatch({
      type: 'UPDATE_CUR_ACTIONS',
      data: currentActions.delete(index),
    });
  };
  const handleSwap = (i, j) => {
    const el1 = currentActions.get(i);
    const el2 = currentActions.get(j);
    dispatch({
      type: 'UPDATE_CUR_ACTIONS',
      data: currentActions.set(i, el2).set(j, el1),
    });
  };

  let actionComponent;
  switch (action.get('type')) {
    case ACTION.SEND_MESSAGE:
      actionComponent = <SendMessageAction action={action} changeAction={handleChangeAction} />;
      break;
    case ACTION.CHANGE_STATE:
      actionComponent = <ChangeStateAction action={action} changeAction={handleChangeAction} />;
      break;
    case ACTION.MAKE_REQUEST:
      actionComponent = <MakeAPIRequestAction action={action} changeAction={handleChangeAction} />;
      break;
    case ACTION.SAVE_USER_DATA:
      actionComponent = <SaveUserDataAction action={action} changeAction={handleChangeAction} />;
      break;
    default:
      actionComponent = <></>;
      break;
  }

  return (
    <Paper className={classes.root}>
      <FormControl variant="outlined" fullWidth className={classes.margin}>
        <InputLabel htmlFor="action-type-select">Action type</InputLabel>
        <Select
          variant="outlined"
          size="small"
          value={action.get('type')}
          id="action-type-select"
          onChange={handleSelect}
          label="Action type"
        >
          <MenuItem value={ACTION.SEND_MESSAGE}>Send message</MenuItem>
          <MenuItem value={ACTION.CHANGE_STATE}>Change state</MenuItem>
          <MenuItem value={ACTION.MAKE_REQUEST}>Make API request</MenuItem>
          <MenuItem value={ACTION.SAVE_USER_DATA}>Save user data</MenuItem>
        </Select>
      </FormControl>
      {actionComponent}
      <div className={classes.buttonRow}>
        <IconButton onClick={handleRemove} size="small">
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={() => handleSwap(index, index - 1)}
          disabled={index === 0}
          size="small"
        >
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton
          onClick={() => handleSwap(index, index + 1)}
          disabled={index === state.get('currentActions').size - 1}
          size="small"
        >
          <ArrowDownwardIcon />
        </IconButton>
      </div>
    </Paper>
  );
}

export default Action;
