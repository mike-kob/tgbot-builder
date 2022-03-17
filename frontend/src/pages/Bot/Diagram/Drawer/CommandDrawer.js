import React, { useCallback, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Box,
  TextField,
  Drawer,
  Button,
} from '@material-ui/core'
import { Map } from 'immutable'
import clsx from 'clsx'

import Action from './actions/Action'
import { DiagramContext, actionFactory } from '../../Context'
import { INIT_NODE_ID } from '@/pages/Bot/constans'

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(70),
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  actionButtons: {
    marginTop: 'auto',
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
}))

const CustomDrawer = () => {
  const classes = useStyles()
  const [state, dispatch] = useContext(DiagramContext)
  const selectedId = state.getIn(['selected', 'id'])
  const current = selectedId === INIT_NODE_ID
    ? state.getIn(['bot', 'initState'])
    : state.getIn(['bot', 'src', selectedId])
  const command = state.get('currentCommand')

  const handleNameChange = useCallback((e) => {
    dispatch({ type: 'UPDATE_CUR_COMMAND', data: command.set('name', e.target.value) })
  }, [command])

  const handleAddAction = useCallback(() => {
    dispatch({
      type: 'UPDATE_CUR_COMMAND',
      data: command.update('actions', (els) => els.push(actionFactory().set('id', String(els.size)))),
    })
  }, [command])

  const handleCloseDrawer = useCallback(() => {
    dispatch({ type: 'UPDATE_DRAWER', data: false })
  }, [])

  const handleSave = () => {
    const commandId = command.get('id')
    dispatch({
      type: 'UPDATE_NODE',
      data: current.updateIn(['data', 'commands'], (els) => els.has(commandId)
        ? els.set(commandId, command)
        : els.push(command.set('id', String(els.size)))),
    })
    dispatch({ type: 'UPDATE_DRAWER', data: false })
  }

  return (
    <Drawer anchor={'right'} open={state.getIn(['drawer', 'open'])}>
      <div className={classes.root}>
        <Typography variant="h6" align="center">
          Add command
        </Typography>
        <Box p={1}>
          <TextField
            value={'/' + command.get('name', '').replace('/', '')}
            fullWidth
            onChange={handleNameChange}
          />
        </Box>
        {command.get('actions').map((a, i) => (
          <Box m={2} key={i}>
            <Action command={command} action={a} index={i} />
          </Box>
        ))}
        <Button
          onClick={handleAddAction}
          className={clsx(classes.outlinedButton, classes.addAction)}
          variant="outlined"
          color="primary"
        >
          + Add action
        </Button>
        <div className={classes.actionButtons}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleCloseDrawer}
            className={classes.outlinedButton}
          >
            Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            className={classes.saveButton}
          >
            Save</Button>
        </div>
      </div>
    </Drawer>
  )
}

export default CustomDrawer
