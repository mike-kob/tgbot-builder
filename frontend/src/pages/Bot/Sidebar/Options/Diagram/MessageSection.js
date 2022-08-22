import React, { useCallback, useContext } from 'react';
import { Button, Box, Typography } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import { DiagramContext, messageFactory } from '../../../Context';
import MessageCard from './MessageCard';

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
}));

function MessageSection(props) {
  const classes = useStyles(props);
  const [, dispatch] = useContext(DiagramContext);

  const { current } = props;
  const messages = current.getIn(['data', 'messages']);

  const handleAdd = useCallback(() => {
    dispatch({
      type: 'UPDATE_NODE',
      data: current.updateIn(['data', 'messages'], (els) => els.push(messageFactory())),
    });
  }, [messages]);

  return (
    <div className={classes.root}>
      <Box my={0.5} textAlign="center">
        <Typography variant="caption" color="textSecondary">
          Patterns will be tried from top to bottom. First matching pattern will be applied.
        </Typography>
      </Box>
      {messages.map((msg, i) => (
        <Box m={1} key={i}>
          <MessageCard current={current} message={msg} index={i} />
        </Box>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleAdd}
        className={classes.outlinedButton}
      >
        + Add pattern
      </Button>
    </div>
  );
}

export default MessageSection;
