import React, { useContext } from 'react'
import {
  IconButton, makeStyles,
  Paper,
  Chip,
  Typography,
} from '@material-ui/core'

import EmailIcon from '@material-ui/icons/Email'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat'

import { DiagramContext } from '../../Context'

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
}))

const ACTION_LABEL = {
  change_state: 'state',
  send_message: 'msg',
}

const ACTION_ICON = {
  change_state: <TrendingFlatIcon />,
  send_message: <EmailIcon />,
}

const Command = (props) => {
  const classes = useStyles(props)
  const [state, dispatch] = useContext(DiagramContext)

  const { command } = props
  const selectedId = state.getIn(['selected', 'id'])
  const node = state.getIn(['elements', selectedId])

  const onEdit = () => {
    dispatch({ type: 'UPDATE_CUR_COMMAND', data: command })
    dispatch({ type: 'UPDATE_DRAWER', data: true })
  }
  const onDelete = () => {
    const onApprove = () => dispatch({
      type: 'UPDATE_NODE',
      data: node.deleteIn(['data', 'commands', command.get('id')]),
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

  return (
    <Paper className={classes.root}>
      <Typography variant="caption">{command.get('name')}</Typography>
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
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Paper>
  )
}

export default Command
