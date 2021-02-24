import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import { Typography, Box, TextField } from '@material-ui/core'
import clsx from 'clsx'

import Action from './actions/Action'
import { Context } from '../bot/store'

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
  const [state, dispatch] = useContext(Context)
  const command = state.currentCommand
  const setName = (e) => dispatch({
    type: 'SET_CURRENT_COMMAND',
    data: { name: e.target.value },
  })
  const addAction = () => dispatch({
    type: 'SET_CURRENT_COMMAND',
    data: { actions: [...command.actions, { type: null, options: {} }] },
  })
  const onDrawerClose = () => dispatch({
    type: 'SET_DRAWER',
    data: { open: false },
  })
  const onSave = () => {
    dispatch({
      type: 'SET_NODE',
      data: {
        [state.selected.id]: {
          ...state.nodeInfo[state.selected.id],
          commands: {
            ...state.nodeInfo[state.selected.id].commands,
            [state.currentCommand.id]: state.currentCommand,
          },
        },
      },
    })
    onDrawerClose()
  }

  return (
        <Drawer anchor={'right'} open={state.drawer.open}>
            <div className={classes.root}>
                <Typography variant="h6" align="center">
                    Add command
                </Typography>
                <Box p={1}>
                    <TextField
                        value={'/' + (command.name || '').replace('/', '')}
                        fullWidth
                        onChange={setName}
                    />
                </Box>
                {command.actions.map((a, i) => (
                    <Box m={2} key={i}>
                        <Action action={a} index={i} />
                    </Box>
                ))}
                <Button
                  onClick={addAction}
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
                      onClick={onDrawerClose}
                      className={classes.outlinedButton}
                      >
                          Cancel</Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onSave}
                      className={classes.saveButton}
                      >
                          Save</Button>
                </div>
            </div>
        </Drawer>
  )
}

export default CustomDrawer
