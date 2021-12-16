import React, { useContext } from 'react'
import {
  makeStyles,
  Typography,
  TextField,
} from '@material-ui/core'

import { DiagramContext } from '../Context'

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
  const { current } = props
  const [, dispatch] = useContext(DiagramContext)

  const handleChange = (e) => {
    dispatch({ type: 'UPDATE_NODE', data: current.setIn(['data', 'label'], e.target.value) })
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6" align="center">User state</Typography>
      <TextField
        value={current.getIn(['data', 'label'])}
        onChange={handleChange}
        variant="outlined"
        size="small"
        className={classes.nameField}
        inputProps={{ maxLength: 10 }}
      />
    </div>
  )
}

export default NameSection
