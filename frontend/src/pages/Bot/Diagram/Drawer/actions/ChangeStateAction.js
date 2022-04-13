import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core'

import { DiagramContext } from '../../../Context'
import { INIT_NODE_ID } from '@/pages/Bot/constants'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const ChangeStateAction = (props) => {
  const classes = useStyles()
  const [state] = useContext(DiagramContext)
  const { action, changeAction } = props
  const selectedId = state.getIn(['selected', 'id'])
  const selectState = (e) => changeAction(action.setIn(['options', 'state'], e.target.value))

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" fullWidth className={classes.margin}>
        <InputLabel htmlFor="outlined-age-native-simple-2">State</InputLabel>
        <Select
          value={action.getIn(['options', 'state'], '')}
          onChange={selectState}
          label="State"
          inputProps={{
            name: 'State',
            id: 'outlined-age-native-simple-2',
          }}
        >
          <MenuItem value="">
            <em>-</em>
          </MenuItem>
          {state.getIn(['bot', 'src'])
            .filter(el => el.get('id') !== selectedId)
            .filter(el => el.get('id') !== INIT_NODE_ID)
            .map(el => (
              <MenuItem key={el.get('id')} value={el.get('id')}>
                {el.getIn(['data', 'label'])}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default ChangeStateAction
