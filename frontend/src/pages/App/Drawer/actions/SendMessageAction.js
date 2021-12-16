import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'

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
        id="outlined-basic"
        label="Msg"
        variant="outlined" v
        value={action.getIn(['options', 'text'], '')}
        onChange={handleTextChange}
      />
    </div>
  )
}

export default ChangeStateAction
