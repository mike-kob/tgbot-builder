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

import { Context } from '../../bot/store'
import {
  openDrawerAction,
  setPopupActionsAction,
  updateCurCommandAction,
  deleteCommandAction,
  openPopupAction,
} from '../../bot/actions'

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

const ACITON_ICON = {
  change_state: <TrendingFlatIcon/>,
  send_message: <EmailIcon/>,
}

const Command = (props) => {
  const classes = useStyles(props)
  const [state, dispatch] = useContext(Context)
  const updateCurCommand = updateCurCommandAction(state, dispatch)
  const openDrawer = openDrawerAction(state, dispatch)
  const setPopupActions = setPopupActionsAction(state, dispatch)
  const openPopup = openPopupAction(state, dispatch)
  const deleteCommand = deleteCommandAction(state, dispatch)

  const { command } = props
  const node = state.nodeInfo[state.selected.id]

  const onEdit = () => {
    updateCurCommand(command)
    openDrawer()
  }
  const onDelete = () => {
    setPopupActions(
            `Delete command ${command.name} ?`,
            () => { },
            () => deleteCommand(node.id, command.id),
    )
    openPopup()
  }

  return (
        <Paper className={classes.root}>
            <Typography variant="caption">{command.name}</Typography>
            <div className={classes.cmds}>
                {command.actions.map((action, i) => (
                    <Chip
                        key={i}
                        icon={ACITON_ICON[action.type]}
                        variant="outlined"
                        label={ACTION_LABEL[action.type]}
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
