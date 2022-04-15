import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Button,
  makeStyles,
  Typography,
  Paper,
  Card,
  CardContent,

} from '@material-ui/core'

import Header from '@/components/Header'
import { useRouter } from 'next/router'
import { getBotUserChat } from '@/actions'
import clsx from 'clsx'
import { DiagramContext } from '@/pages/Bot/Context'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    maxWidth: '50%',
    minWidth: theme.spacing(30),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(1),
  },
  content: {
    padding: 0,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  leftMessage: {
    alignSelf: 'self-start',
  },
  rightMessage: {
    alignSelf: 'self-end',
  },
  date: {
    marginTop: theme.spacing(1),
  },
}))

const ChatMessage = props => {
  const classes = useStyles(props)
  const [state] = useContext(DiagramContext)
  const { message } = props

  const getStateLabel = stateId =>
    state.getIn(['bot', 'src', stateId, 'data', 'label'])

  let text = ''
  switch (message.type) {
    case 'message':
      text = message.msg.text
      break
    case 'request':
      text = `${message.msg.method} ${message.msg.url}: ${message.msg.status}`
      break
    case 'change_state':
      text = `"${getStateLabel(message.msg.oldState)}" ->\n"${getStateLabel(message.msg.newState)}"`
      break
    case 'save_user_data':
      text = `KEY: ${message.msg.key} \n VALUE: ${message.msg.value}`
      break
  }
  return (
    <Card className={clsx(classes.root, message.isBot ? classes.rightMessage : classes.leftMessage)}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        @{message.isBot ? `bot: ${message.type}` : message.msg.chat.username}
      </Typography>
      <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
        {text}
      </Typography>
      <Typography variant="body2" component="p" color="textSecondary" align="right" className={classes.date}>
        {new Date(message.ts * 1000).toLocaleString()}
      </Typography>
    </Card>
  )
}

export default ChatMessage
