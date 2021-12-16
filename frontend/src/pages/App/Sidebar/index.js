import React, { useContext } from 'react'
import {
  makeStyles,
  Divider,
  Typography,
  Box,
} from '@material-ui/core'

import { DiagramContext } from '../Context'
import CommandSection from './CommandSection'
import NameSection from './NameSection'

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
  const [state] = useContext(DiagramContext)

  const selectedId = state.getIn(['selected', 'id'])
  const current = state.getIn(['elements', selectedId])

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
      <NameSection current={current} />
      <Box m={1}>
        <Divider />
      </Box>
      <CommandSection current={current} />
    </div>
  )
}

export default Sidebar
