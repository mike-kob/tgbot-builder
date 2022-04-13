import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(1)
  },
}))

const SaveUserDataAction = (props) => {
  const classes = useStyles()
  const {
    action,
    changeAction,
  } = props

  const handleKeyChange = (e) => changeAction(action.setIn(['options', 'key'], e.target.value))
  const handleValueChange = (e) => changeAction(action.setIn(['options', 'value'], e.target.value))

  return (
    <div className={classes.root}>
      <TextField
        fullWidth
        label="Key"
        variant="outlined"
        value={action.getIn(['options', 'key'], '')}
        onChange={handleKeyChange}
        className={classes.margin}
      />
      <TextField
        fullWidth
        label="Value"
        variant="outlined"
        multiline
        rows={2}
        value={action.getIn(['options', 'value'], '')}
        onChange={handleValueChange}
      />
      <Typography variant="caption" color="textSecondary">Some helper text</Typography>
    </div>
  )
}

export default SaveUserDataAction
