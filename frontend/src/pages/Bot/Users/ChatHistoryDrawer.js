import React, {
  useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  Typography,
  Box,
  Drawer,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { getBotUserChat } from '@/actions';
import Message from '@/pages/Bot/Users/Message';
import { postMessage } from '@/actions/bots';
import { DiagramContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(90),
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  actionButtons: {
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
  content: {
    display: 'flex',
    flexDirection: ' column',
    alignItems: 'center',
    borderRadius: theme.spacing(1),
    overflow: 'scroll',
  },
  botImage: {
    maxWidth: theme.spacing(70),
    marginTop: theme.spacing(-5),
  },
  helloTitle: {
    marginTop: theme.spacing(-10),
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '48px',
    lineHeight: '72px',
  },
  subtitle: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    color: theme.palette.text.secondary,
  },
  button: {
    minWidth: theme.spacing(25),
  },
  messages: {
    backgroundColor: '#8080802e',
    padding: theme.spacing(1),
    width: '100%',
  },
}));

function ChatHistoryDrawer(props) {
  const classes = useStyles(props);
  const [state, dispatch] = useContext(DiagramContext);
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState('');
  const selectedUser = state.get('selectedUser');
  const botId = state.getIn(['bot', '_id']);
  const chatId = selectedUser.get('id');
  const drawerOpen = Boolean(state.get('historyDrawer'));
  const botActive = state.getIn(['bot', 'status']);

  const handleSaveMessage = useCallback(async () => {
    await postMessage(botId, chatId, text, (msg) => {
      setMsgs((oldMsgs) => [...oldMsgs, msg]);
      setText('');
    });
  }, [text]);

  const refreshMessages = useCallback(async () => {
    if (drawerOpen && botId && chatId) {
      const data = await getBotUserChat(botId, chatId);
      setMsgs(data);
    }
  }, [drawerOpen]);

  useEffect(async () => {
    await refreshMessages();
    const interval = setInterval(refreshMessages, 1000 * 5);

    return () => {
      clearInterval(interval);
    };
  }, [selectedUser.get('id'), drawerOpen]);

  const handleCloseDrawer = useCallback(() => {
    dispatch({ type: 'UPDATE_HISTORY_DRAWER', data: false });
  }, []);

  return (
    <Drawer
      anchor="right"
      open={Boolean(state.get('historyDrawer'))}
      onClose={() => dispatch({ type: 'UPDATE_HISTORY_DRAWER', data: false })}
    >
      <div className={classes.root}>
        <Typography variant="h6" align="center">
          Chat history with @
          {selectedUser.get('username')}
        </Typography>
        <div className={classes.content}>
          <Box display="flex" flexDirection="column" className={classes.messages}>
            {msgs.map((msg) => <Message key={msg._id} message={msg} />)}
          </Box>
        </div>

        <Box my={1} display="flex">
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            variant="outlined"
            size="small"
            multiline
            minRows={2}
            maxRows={10}
            fullWidth
            placeholder="Send message"
            disabled={!botActive}
          />
          <Box ml={1}>
            <IconButton
              color="primary"
              variant="contained"
              onClick={handleSaveMessage}
              disabled={!botActive}
              size="large"
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
        <div className={classes.actionButtons}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleCloseDrawer}
            className={classes.outlinedButton}
          >
            Close
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default ChatHistoryDrawer;
