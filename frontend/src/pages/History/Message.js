import React, { useEffect, useState } from 'react'
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

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    maxWidth: '50%',
    minWidth: theme.spacing(30),
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2, 1),
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
  const router = useRouter()
  const { message } = props

  let text = ''
  switch (message.type) {
    case 'message':
      text = message.msg.text
      break
    case 'request':
      text = `${message.msg.method} ${message.msg.url}: ${message.msg.status}`
      break
    case 'change_state':
      text = `${message.msg.oldState} -> ${message.msg.newState}`
      break
  }
  return (
    <Card className={clsx(classes.root, message.isBot ? classes.rightMessage : classes.leftMessage)}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        @{message.isBot ? `bot: ${message.type}` : message.msg.chat.username}
      </Typography>
      <Typography variant="body1">
        {text}
      </Typography>
      <Typography variant="body2" component="p" color="textSecondary" align="right" className={classes.date}>
        {new Date(message.ts * 1000).toLocaleString()}
      </Typography>
    </Card>
  )
}

export default ChatMessage
