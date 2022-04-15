import React, { useContext } from 'react'
import { Chip, IconButton, InputAdornment, makeStyles, Paper, TextField } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import { DiagramContext } from '../../../../Context'
import { ACTION_ICON, ACTION_LABEL, DRAWER, INIT_NODE_ID } from '@/pages/Bot/constants'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(1),
  },
  actions: {
    marginTop: 'auto',
    marginLeft: 'auto',
    display: 'flex',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  commandName: {
    margin: theme.spacing(0.5),
  },
  noMargin: {
    margin: '0px',
  },
}))

const Command = (props) => {
  const classes = useStyles(props)
  const [state, dispatch] = useContext(DiagramContext)

  const { command } = props
  const selectedId = state.getIn(['selected', 'id'])
  const initialSelected = selectedId === INIT_NODE_ID
  const current = state.getIn(['bot', 'src', selectedId])

  const onEdit = () => {
    dispatch({ type: 'UPDATE_CUR_COMMAND', data: command })
    dispatch({ type: 'UPDATE_CUR_ACTIONS', data: command.get('actions') })
    dispatch({ type: 'UPDATE_DRAWER', data: DRAWER.COMMAND })
  }
  const onDelete = () => {
    const onApprove = () => dispatch({
      type: 'UPDATE_NODE',
      data: current.deleteIn(['data', 'commands', command.get('id')]),
    })
    const onReject = () => { }
    dispatch({
      type: 'UPDATE_POPUP',
      data: state.get('popup').merge({
        open: true,
        question: 'Do you really want to delete this command?',
        onApprove,
        onReject,
      }),
    })
  }
  const onNameEdit = (e) => {
    dispatch({
      type: 'UPDATE_NODE',
      data: current.setIn(['data', 'commands', command.get('id'), 'name'], e.target.value),
    })
  }

  return (
    <Paper className={classes.root}>
      <TextField
        value={command.get('name')}
        onChange={onNameEdit}
        variant="outlined"
        size="small"
        InputProps={{
          style: { padding: 4 },
          startAdornment: <InputAdornment classes={{ positionStart: classes.noMargin }} position="start">/</InputAdornment>,
        }}
        className={classes.commandName}
        disabled={initialSelected}
      />
      <div className={classes.cmds}>
        {command.get('actions').map((action, i) => (
          <Chip
            key={i}
            icon={ACTION_ICON[action.get('type')]}
            variant="outlined"
            label={ACTION_LABEL[action.get('type')]}
            className={classes.chip}
          />
        ))}
      </div>
      <div className={classes.actions}>
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete} disabled={initialSelected}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Paper>
  )
}

export default Command
