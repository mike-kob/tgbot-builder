import React, { useContext } from 'react'
import {
  makeStyles,
  Divider,
  Typography,
  Box,
} from '@material-ui/core'

import { DiagramContext } from '../../../Context'
import CommandSection from './CommandSection'
import NameSection from './NameSection'
import { INIT_NODE_ID } from '@/pages/Bot/constans'

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
  },
}))

const Sidebar = (props) => {
  const classes = useStyles(props)
  const [state] = useContext(DiagramContext)

  const selectedId = state.getIn(['selected', 'id'])
  const current = selectedId === INIT_NODE_ID
    ? state.getIn(['bot', 'initState'])
    : state.getIn(['bot', 'src', selectedId])

  if (!current) {
    return (
      <Box mt={1} mx="auto" display="flex">
        <Typography variant="subtitle1" color="textSecondary" style={{ margin: 'auto' }}>
          No selected state
        </Typography>
      </Box>
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
