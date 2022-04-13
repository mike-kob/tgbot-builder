import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  IconButton,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

import { DiagramContext } from '../../../Context'
import SendMessageAction from './SendMessageAction'
import ChangeStateAction from './ChangeStateAction'
import MakeAPIRequestAction from './MakeAPIRequestAction'
import SaveUserDataAction from './SaveUserDataAction'
import { ACTION } from '@/pages/Bot/constants'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
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
  const [state, dispatch] = useContext(DiagramContext)
  const { action, index } = props
  const currentActions = state.get('currentActions')

  const handleChangeAction = (newAction) => {
    dispatch({
      type: 'UPDATE_CUR_ACTIONS',
      data: currentActions.set(index, newAction),
    })
  }
  const handleSelect = (e) => {
    dispatch({
      type: 'UPDATE_CUR_ACTIONS',
      data: currentActions.setIn([index, 'type'], e.target.value),
    })
  }
  const handleRemove = () => {
    dispatch({
      type: 'UPDATE_CUR_ACTIONS',
      data: currentActions.delete(index),
    })
  }
  const handleSwap = (i, j) => {
    const el1 = currentActions.get(i)
    const el2 = currentActions.get(j)
    dispatch({
      type: 'UPDATE_CUR_ACTIONS',
      data: currentActions.set(i, el2).set(j, el1),
    })
  }

  let actionComponent
  switch (action.get('type')) {
    case ACTION.SEND_MESSAGE:
      actionComponent = <SendMessageAction action={action} changeAction={handleChangeAction} />
      break
    case ACTION.CHANGE_STATE:
      actionComponent = <ChangeStateAction action={action} changeAction={handleChangeAction} />
      break
    case ACTION.MAKE_REQUEST:
      actionComponent = <MakeAPIRequestAction action={action} changeAction={handleChangeAction} />
      break
    case ACTION.SAVE_USER_DATA:
      actionComponent = <SaveUserDataAction action={action} changeAction={handleChangeAction} />
      break
    default:
      actionComponent = <></>
      break
  }

  return (
    <Paper className={classes.root}>
      <FormControl variant="outlined" fullWidth className={classes.margin}>
        <InputLabel htmlFor="action-type-select">Action type</InputLabel>
        <Select
          value={action.get('type')}
          id="action-type-select"
          onChange={handleSelect}
          label="Action type"
        >
          <MenuItem value={ACTION.SEND_MESSAGE}>Send message</MenuItem>
          <MenuItem value={ACTION.CHANGE_STATE}>Change state</MenuItem>
          <MenuItem value={ACTION.MAKE_REQUEST}>Make API request</MenuItem>
          <MenuItem value={ACTION.SAVE_USER_DATA}>Save user data</MenuItem>
        </Select>
      </FormControl>
      {actionComponent}
      <div className={classes.buttonRow}>
        <IconButton onClick={handleRemove}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={() => handleSwap(index, index - 1)} disabled={index === 0}>
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton
          onClick={() => handleSwap(index, index + 1)}
          disabled={index === state.get('currentActions').size - 1}
        >
          <ArrowDownwardIcon />
        </IconButton>
      </div>
    </Paper>
  )
}

export default Action
