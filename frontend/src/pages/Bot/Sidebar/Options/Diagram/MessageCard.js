import React, { useContext } from 'react'
import { Chip, IconButton, InputAdornment, makeStyles, Paper, TextField } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'


import { DiagramContext } from '../../../Context'
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
  regexp: {
    margin: theme.spacing(0.5),
  },
  noMargin: {
    margin: '0px',
  },
}))

const MessageCard = (props) => {
  const classes = useStyles(props)
  const [state, dispatch] = useContext(DiagramContext)

  const { current, message, index } = props

  const onEdit = () => {
    dispatch({ type: 'UPDATE_CUR_MESSAGE', data: message })
    dispatch({ type: 'UPDATE_CUR_ACTIONS', data: message.get('actions') })
    dispatch({ type: 'UPDATE_DRAWER', data: DRAWER.MESSAGE })
  }

  const handleSwap = (i, j) => {
    const el1 = current.getIn(['data', 'messages', i])
    const el2 = current.getIn(['data', 'messages', j])

    dispatch({
      type: 'UPDATE_NODE',
      data: current.setIn(['data', 'messages', i], el2).setIn(['data', 'messages', j], el1),
    })
  }
  const onDelete = () => {
    const onApprove = () => dispatch({
      type: 'UPDATE_NODE',
      data: current.deleteIn(['data', 'messages', index]),
    })
    const onReject = () => { }
    dispatch({
      type: 'UPDATE_POPUP',
      data: state.get('popup').merge({
        open: true,
        question: 'Do you really want to delete this message trigger?',
        onApprove,
        onReject,
      }),
    })
  }
  const onRegexpEdit = (e) => {
    dispatch({
      type: 'UPDATE_NODE',
      data: current.setIn(['data', 'messages', index, 'regexp'], e.target.value),
    })
  }

  return (
    <Paper className={classes.root}>
      <TextField
        value={message.get('regexp')}
        label="regexp"
        onChange={onRegexpEdit}
        variant="outlined"
        size="small"
        InputProps={{
          style: { padding: '8px 4px', fontFamily: 'monospace' },
          startAdornment: <InputAdornment classes={{ positionStart: classes.noMargin }} position="start">/</InputAdornment>,
          endAdornment: <InputAdornment classes={{ positionEnd: classes.noMargin }} position="end">/</InputAdornment>,
        }}
        className={classes.regexp}
      />
      <div className={classes.cmds}>
        {message.get('actions').map((action, i) => (
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
        <IconButton onClick={() => handleSwap(index, index - 1)} disabled={index === 0}>
          <ArrowUpwardIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => handleSwap(index, index + 1)} disabled={index === current.getIn(['data', 'messages']).size - 1}>
          <ArrowDownwardIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Paper>
  )
}

export default MessageCard
