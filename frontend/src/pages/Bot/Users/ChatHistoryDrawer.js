import React, { useCallback, useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Box,
  Drawer,
  Button,
} from '@material-ui/core'
import clsx from 'clsx'

import { DiagramContext, actionFactory } from '../Context'
import { DRAWER, INIT_NODE_ID } from '@/pages/Bot/constants'
import { getBotUserChat } from '@/actions'
import Message from '@/pages/Bot/Users/Message'

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(90),
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  actionButtons: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    width: '100%',
  },
}))

const ChatHistoryDrawer = props => {
  const classes = useStyles(props)
  const [state, dispatch] = useContext(DiagramContext)
  const [msgs, setMsgs] = useState([])
  const selectedUser = state.get('selectedUser')

  useEffect(async () => {
    const data = await getBotUserChat(state.getIn(['bot', '_id']), selectedUser.get('id'))
    setMsgs(data)
  }, [selectedUser.get('id')])

  const handleCloseDrawer = useCallback(() => {
    dispatch({ type: 'UPDATE_HISTORY_DRAWER', data: false })
  }, [])

  return (
    <Drawer
      anchor={'right'}
      open={Boolean(state.get('historyDrawer'))}
      onClose={() => dispatch({ type: 'UPDATE_HISTORY_DRAWER', data: false })}
    >
      <div className={classes.root}>
        <Typography variant="h6" align="center">
          Chat history with @{selectedUser.get('username')}
        </Typography>
        <div className={classes.content}>
          <Box display="flex" flexDirection="column" className={classes.messages}>
            {msgs.map(msg => <Message key={msg._id} message={msg}/>)}
          </Box>
        </div>

        <div className={classes.actionButtons}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleCloseDrawer}
            className={classes.outlinedButton}
          >
            Close</Button>
        </div>
      </div>
    </Drawer>
  )
}

export default ChatHistoryDrawer
