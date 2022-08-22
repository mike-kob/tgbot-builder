import React, { useContext } from 'react';
import {
  Box, Chip, IconButton, Paper, Typography,
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import EditIcon from '@mui/icons-material/Edit';
import { ACTION_ICON, ACTION_LABEL, DRAWER } from '@/pages/Bot/constants';
import { DiagramContext } from '../../../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
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
  paper: {
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
}));

function InitialSection(props) {
  const classes = useStyles(props);
  const [, dispatch] = useContext(DiagramContext);

  const { current } = props;
  const initialActions = current.getIn(['data', 'initial']);

  const onEdit = () => {
    dispatch({
      type: 'UPDATE_CUR_ACTIONS',
      data: initialActions,
    });
    dispatch({
      type: 'UPDATE_DRAWER',
      data: DRAWER.INITIAL,
    });
  };

  return (
    <div className={classes.root}>
      <Box m={1}>
        <Paper className={classes.paper}>
          <Typography variant="caption">These actions will be triggered, when user enters this state</Typography>
          <div className={classes.cmds}>
            {initialActions.map((action, i) => (
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
          </div>
        </Paper>
      </Box>
    </div>
  );
}

export default InitialSection;
