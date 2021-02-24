import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core'

import { Context } from '../../bot/store'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const ChangeStateAction = (props) => {
  const classes = useStyles()
  const [state] = useContext(Context)
  const { action, changeAction } = props

  const selectState = (e) => {
    changeAction({
      ...action,
      options: { state: e.target.value },
    })
  }

  return (
        <div className={classes.root}>
            <FormControl variant="outlined" fullWidth className={classes.margin}>
                <InputLabel htmlFor="outlined-age-native-simple-2">State</InputLabel>
                <Select
                    value={action.options.state || ''}
                    onChange={selectState}
                    label="State"
                    inputProps={{
                      name: 'State',
                      id: 'outlined-age-native-simple-2',
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {Object.keys(state.nodeInfo).map(key => (
                        <MenuItem key={key} value={key}>{state.nodeInfo[key].label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
  )
}

export default ChangeStateAction
