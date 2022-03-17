import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  makeStyles,
  Typography,
  Paper,
} from '@material-ui/core'

import Header from '@/components/Header'
import Message from './Message'
import { useRouter } from 'next/router'
import { getBotUserChat } from '@/actions'

const useStyles = makeStyles((theme) => ({
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
    width: '70%',
  },
}))

const ChatHistory = (props) => {
  const classes = useStyles(props)
  const router = useRouter()

  const [msgs, setMsgs] = useState([])

  useEffect(async () => {
    if (router.query.botId && router.query.chatId) {
      const data = await getBotUserChat(router.query.botId, router.query.chatId)
      setMsgs(data)
    }
  }, [router.query.botId, router.query.chatId])

  return (
    <>
      <Header />
      <div className={classes.content}>
        <Box display="flex" flexDirection="column" className={classes.messages}>
          {msgs.map(msg => <Message key={msg._id} message={msg}/>)}
        </Box>
      </div>
    </>
  )
}

export default ChatHistory
