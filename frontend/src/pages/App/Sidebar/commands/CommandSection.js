import React, { useContext } from 'react'
import {
  makeStyles,
  Button,
  Box,
  Typography,
} from '@material-ui/core'

import Command from './Command'
import { resetCurCommandAction, openDrawerAction } from '../../bot/actions'
import { Context } from '../../bot/store'

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
  const [state, dispatch] = useContext(Context)
  const openDrawer = openDrawerAction(state, dispatch)
  const resetCurCommand = resetCurCommandAction(state, dispatch)

  const onAdd = () => {
    resetCurCommand()
    openDrawer()
  }

  const { commands } = props

  return (
        <div className={classes.root}>
            <Typography variant="h6" align="center">Commands</Typography>
            {Object.values(commands).map((cmd, i) => (
                <Box m={1} key={i}>
                    <Command command={cmd} />
                </Box>
            ))}
            <Button
              variant="outlined"
              color="primary"
              onClick={onAdd}
              className={classes.outlinedButton}
              >
                + Add command</Button>
        </div>
  )
}

export default CommandSection
