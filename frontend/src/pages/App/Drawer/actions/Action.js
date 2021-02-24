import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  IconButton,
} from '@material-ui/core'

import SendMessageAction from './SendMessageAction'
import ChangeStateAction from './ChangeStateAction'
import { Context } from '../../bot/store'
import { swapCurCommandActionsAction, removeCurCommandActionAction } from '../../bot/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  actionButtons: {
    marginTop: 'auto',
    marginLeft: 'auto',
  },
  buttonRow: {
    marginTop: 'auto',
    marginLeft: 'auto',
    display: 'flex',
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
}))

const Action = (props) => {
  const classes = useStyles()
  const [state, dispatch] = useContext(Context)
  const { action, index } = props
  const swapCurCommandActions = swapCurCommandActionsAction(state, dispatch)
  const removeCurCommandAction = removeCurCommandActionAction(state, dispatch)

  const changeAction = (newAction) => dispatch({
    type: 'SET_CURRENT_COMMAND',
    data: { actions: state.currentCommand.actions.map((a, i) => i === index ? newAction : a) },
  })

  const onSelectType = (e) => changeAction({
    ...action,
    type: e.target.value,
  })

  let actionComponent
  switch (action.type) {
    case 'send_message':
      actionComponent = <SendMessageAction action={action} changeAction={changeAction} />
      break
    case 'change_state':
      actionComponent = <ChangeStateAction action={action} changeAction={changeAction} />
      break
    default:
      actionComponent = <></>
      break
  }

  return (
        <Paper className={classes.root}>
            <FormControl variant="outlined" fullWidth className={classes.margin}>
                <InputLabel htmlFor="outlined-age-native-simple">Action</InputLabel>
                <Select
                    value={action.type}
                    onChange={onSelectType}
                    label="Action"
                    className={classes.select}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'send_message'}>Send message</MenuItem>
                    <MenuItem value={'change_state'}>Chage state</MenuItem>
                </Select>
            </FormControl>
            {actionComponent}
            <div className={classes.buttonRow}>
                <IconButton onClick={() => removeCurCommandAction(index)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => swapCurCommandActions(index, index - 1)} disabled={index === 0}>
                    <ArrowUpwardIcon />
                </IconButton>
                <IconButton
                    onClick={() => swapCurCommandActions(index, index + 1)}
                    disabled={index === state.currentCommand.actions.length - 1}
                >
                    <ArrowDownwardIcon />
                </IconButton>
            </div>
        </Paper>
  )
}

export default Action
