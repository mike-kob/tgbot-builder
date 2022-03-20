import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const ChangeStateAction = (props) => {
  const classes = useStyles()
  const {
    action,
    changeAction,
  } = props

  const handleTextChange = (e) => changeAction(action.setIn(['options', 'text'], e.target.value))

  return (
    <div className={classes.root}>
      <TextField
        fullWidth
        label="Text"
        variant="outlined"
        multiline
        rows={5}
        maxRows={15}
        value={action.getIn(['options', 'text'], '')}
        onChange={handleTextChange}
      />
      <Typography variant="caption" color="textSecondary">Some helper text</Typography>
    </div>
  )
}

export default ChangeStateAction
