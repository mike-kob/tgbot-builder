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

import { DiagramContext } from '../../Context'
import SendMessageAction from './SendMessageAction'
import ChangeStateAction from './ChangeStateAction'

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
  const [state, dispatch] = useContext(DiagramContext)
  const { command, action, index } = props

  const handleChangeAction = (newAction) => {
    dispatch({ type: 'UPDATE_CUR_COMMAND_ACTION', data: newAction })
  }
  const handleSelect = (e) => {
    dispatch({ type: 'UPDATE_CUR_COMMAND_ACTION', data: action.set('type', e.target.value) })
  }
  const handleRemove = () => {
    dispatch({
      type: 'UPDATE_CUR_COMMAND',
      data: command.deleteIn(['actions', index]),
    })
  }
  const handleSwap = (i, j) => {
    dispatch({
      type: 'UPDATE_CUR_COMMAND',
      data: command.update('actions', (els) => {
        const el1 = els.get(i)
        const el2 = els.get(j)
        return els.set(i, el2).set(j, el1)
      }),
    })
  }

  let actionComponent
  switch (action.get('type')) {
    case 'send_message':
      actionComponent = <SendMessageAction action={action} changeAction={handleChangeAction} />
      break
    case 'change_state':
      actionComponent = <ChangeStateAction action={action} changeAction={handleChangeAction} />
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
          value={action.get('type')}
          onChange={handleSelect}
          label="Action"
          className={classes.select}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'send_message'}>Send message</MenuItem>
          <MenuItem value={'change_state'}>Change state</MenuItem>
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
          disabled={index === state.getIn(['currentCommand', 'actions']).size - 1}
        >
          <ArrowDownwardIcon />
        </IconButton>
      </div>
    </Paper>
  )
}

export default Action
