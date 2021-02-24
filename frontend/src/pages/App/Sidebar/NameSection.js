import React, { useContext } from 'react'
import {
  makeStyles,
  // Button,
  // Box,
  Typography,
  TextField,
} from '@material-ui/core'

import { changeNodeInfoAction } from '../bot/actions'
import { Context } from '../bot/store'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  nameField: {
    width: '100%',
    padding: theme.spacing(1, 0),
  },
}))

const NameSection = (props) => {
  const classes = useStyles(props)
  const [state, dispatch] = useContext(Context)
  const changeNodeInfo = changeNodeInfoAction(state, dispatch)

  const { current } = props
  return (
    <div className={classes.root}>
      <Typography variant="h6" align="center">User state</Typography>
      <TextField
        value={current.label}
        onChange={(e) => changeNodeInfo(current.id, { label: e.target.value })}
        variant="outlined"
        size="small"
        className={classes.nameField}
        inputProps={{
          maxLength: 10,
        }}
      />
    </div>
  )
}

export default NameSection
