import React, { useCallback, useContext } from 'react'
import {
  makeStyles,
  Button,
  Box,
} from '@material-ui/core'

import { DiagramContext, messageFactory } from '../../../Context'
import MessageCard from './MessageCard'

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
}))

const MessageSection = (props) => {
  const classes = useStyles(props)
  const [, dispatch] = useContext(DiagramContext)

  const { current } = props
  const messages = current.getIn(['data', 'messages'])

  const handleAdd = useCallback(() => {
    dispatch({
      type: 'UPDATE_NODE',
      data: current.updateIn(
        ['data', 'messages'], els => els.push(messageFactory().set('id', String(messages.size)))),
    })
  }, [messages])

  return (
    <div className={classes.root}>
      {messages.map((msg, i) => (
        <Box m={1} key={i}>
          <MessageCard message={msg} />
        </Box>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleAdd}
        className={classes.outlinedButton}
      >
        + Add pattern</Button>
    </div>
  )
}

export default MessageSection
