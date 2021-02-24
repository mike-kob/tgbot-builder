import React, { useContext } from 'react'
import {
  makeStyles,
  Divider,
  Typography,
  Box,
} from '@material-ui/core'

import CommandSection from './commands/CommandSection'
import NameSection from './NameSection'
import { Context } from '../bot/store'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
  },
  rightPanel: {
    marginLeft: 'auto',
  },
  stateTitle: {

  },
  noSelected: {
    display: 'flex',
    height: '100%',
  },
}))

const Sidebar = (props) => {
  const classes = useStyles(props)
  const [state] = useContext(Context)

  const current = state.nodeInfo[state.selected.id]
  if (!current) {
    return (
      <div className={classes.noSelected}>
        <Typography variant="subtitle1" color="textSecondary" style={{ margin: 'auto' }}>
          No selected state
        </Typography>
      </div>
    )
  }

  return (
        <div className={classes.root}>
            <NameSection current={current}/>
            <Box m={1}>
              <Divider />
            </Box>
            <CommandSection commands={current.commands} />
        </div>
  )
}

export default Sidebar
