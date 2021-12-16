import React, { useCallback, useContext } from 'react'
import {
  makeStyles,
  Button,
  Box,
  Typography,
} from '@material-ui/core'

import { DiagramContext, commandFactory } from '../Context'
import Command from './commands/Command'

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

const CommandSection = (props) => {
  const classes = useStyles(props)
  const [, dispatch] = useContext(DiagramContext)

  const handleAdd = useCallback(() => {
    dispatch({ type: 'UPDATE_CUR_COMMAND', data: commandFactory() })
    dispatch({ type: 'UPDATE_DRAWER', data: true })
  }, [])

  const { current } = props
  const commands = current.getIn(['data', 'commands'])

  return (
    <div className={classes.root}>
      <Typography variant="h6" align="center">Commands</Typography>
      {commands.map((cmd, i) => (
        <Box m={1} key={i}>
          <Command command={cmd} />
        </Box>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleAdd}
        className={classes.outlinedButton}
      >
        + Add command</Button>
    </div>
  )
}

export default CommandSection
