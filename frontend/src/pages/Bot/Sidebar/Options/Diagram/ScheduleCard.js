import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import cronstrue from 'cronstrue';
import parser from 'cron-parser';
import _ from 'lodash';

import { ACTION_ICON, ACTION_LABEL, DRAWER } from '@/pages/Bot/constants';
import { DiagramContext } from '../../../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(1),
  },
  actions: {
    marginTop: 'auto',
    marginLeft: 'auto',
    display: 'flex',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  regexp: {
    margin: theme.spacing(0.5),
  },
  noMargin: {
    margin: '0px',
  },
  dialog: {
    width: theme.spacing(70),
  },
  explanation: {
    minHeight: theme.spacing(10),
  },
}));

function ScheduleCard(props) {
  const classes = useStyles(props);
  const [state, dispatch] = useContext(DiagramContext);
  const [popupOpen, setPopupOpen] = useState(false);

  const { current, entry, index } = props;

  const onEdit = () => {
    dispatch({ type: 'UPDATE_CUR_SCHEDULE_ENTRY', data: entry.set('index', index) });
    dispatch({ type: 'UPDATE_CUR_ACTIONS', data: entry.get('actions') });
    dispatch({ type: 'UPDATE_DRAWER', data: DRAWER.SCHEDULE });
  };

  const onDelete = () => {
    const onApprove = () => dispatch({
      type: 'UPDATE_NODE',
      data: current.deleteIn(['data', 'schedule', index]),
    });
    const onReject = () => { };
    dispatch({
      type: 'UPDATE_POPUP',
      data: state.get('popup').merge({
        open: true,
        question: 'Do you really want to delete this message trigger?',
        onApprove,
        onReject,
      }),
    });
  };
  const onCronEdit = (e) => {
    dispatch({
      type: 'UPDATE_NODE',
      data: current.setIn(['data', 'schedule', index, 'cron'], e.target.value),
    });
  };

  let validExpr = '';
  try {
    const res = parser.parseString(entry.get('cron'));
    validExpr = _.isEmpty(res.errors) ? cronstrue.toString(entry.get('cron')) : '';
  } catch (err) {}

  return (
    <Paper className={classes.root}>
      <TextField
        value={entry.get('cron')}
        label="cron schedule"
        disabled
        variant="outlined"
        size="small"
        InputProps={{
          style: { padding: '8px 4px', fontFamily: 'monospace' },
          endAdornment: <IconButton onClick={() => setPopupOpen(true)} size="large">
            <SettingsIcon />
                        </IconButton>,
        }}
        className={classes.regexp}
      />
      <div className={classes.cmds}>
        {entry.get('actions').map((action, i) => (
          <Chip
            key={i}
            icon={ACTION_ICON[action.get('type')]}
            variant="outlined"
            label={ACTION_LABEL[action.get('type')]}
            className={classes.chip}
          />
        ))}
      </div>
      <div className={classes.actions}>
        <IconButton onClick={onEdit} size="large">
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete} size="large">
          <DeleteIcon />
        </IconButton>
      </div>
      <Dialog
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        aria-labelledby="form-dialog-title"

      >
        <DialogTitle id="form-dialog-title">Edit schedule</DialogTitle>
        <DialogContent className={classes.dialog}>
          <TextField
            variant="outlined"
            value={entry.get('cron')}
            onChange={onCronEdit}
            margin="dense"
            size="small"
            error={!validExpr}
          />
          <Box my={1}>
            <Typography color="textSecondary" className={classes.explanation}>
              {validExpr}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPopupOpen(false)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default ScheduleCard;
