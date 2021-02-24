import React, { useContext } from 'react'
import {
  makeStyles,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core'

import { Context } from '../bot/store'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(2, 0),
  },
  select: {
    marginLeft: theme.spacing(3),
    minWidth: theme.spacing(20),
  },
}))

const Footer = (props) => {
  const classes = useStyles(props)
  const [state, dispatch] = useContext(Context)

  return (
    <div className={classes.root}>
      <TextField
        label="Greeting message"
        value={state.greeting}
        onChange={e => dispatch({ type: 'CHANGE_GREETING', data: e.target.value })}
        helperText="This msg is sent, when user types '/start' command"
        variant="outlined"
      />
      <Select
        className={classes.select}
        value={state.initState || ''}
        onChange={e => dispatch({ type: 'CHANGE_INIT_STATE', data: e.target.value })}
        variant="outlined"
        label="First state"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Object.keys(state.nodeInfo).map(key => (
          <MenuItem key={key} value={key}>{state.nodeInfo[key].label}</MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default Footer
