import React, { useContext } from 'react'
import {
  makeStyles,
  Button,
  Box,
} from '@material-ui/core'

import { DiagramContext, commandFactory } from '../../../Context'
import Command from './commands/Command'
import { INIT_NODE_ID } from '@/pages/Bot/constants'

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

  const { current } = props
  const commands = current.getIn(['data', 'commands'])

  const handleAdd = () => {
    dispatch({
      type: 'UPDATE_NODE',
      data: current.updateIn(
        ['data', 'commands'], els => els.push(commandFactory().set('id', String(commands.size)))),
    })
  }

  return (
    <div className={classes.root}>
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
        disabled={current.get('id') === INIT_NODE_ID}
      >
        + Add command</Button>
    </div>
  )
}

export default CommandSection
