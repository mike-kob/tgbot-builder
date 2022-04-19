import React, { useCallback, useContext } from 'react'
import {
  makeStyles,
  Button,
  Box,
} from '@material-ui/core'

import { DiagramContext } from '../../../Context'
import ScheduleCard from './ScheduleCard'
import { scheduleFactory } from '@/pages/Bot/Context/models'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  outlinedButton: {
    border: '2px solid',
    borderRadius: '7px',
    maxWidth: theme.spacing(20),
    margin: theme.spacing(1, 'auto'),
    '&:hover': {
      border: '2px solid',
    },
  },
}))

const ScheduleSection = (props) => {
  const classes = useStyles(props)
  const [, dispatch] = useContext(DiagramContext)

  const { current } = props
  const scheduleEntries = current.getIn(['data', 'schedule'])

  const handleAdd = useCallback(() => {
    dispatch({
      type: 'UPDATE_NODE',
      data: current.updateIn(
        ['data', 'schedule'], els => els.push(scheduleFactory())),
    })
  }, [scheduleEntries])

  return (
    <div className={classes.root}>
      {scheduleEntries.map((entry, i) => (
        <Box m={1} key={i}>
          <ScheduleCard current={current} entry={entry} index={i} />
        </Box>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleAdd}
        className={classes.outlinedButton}
      >
        + Add schedule</Button>
    </div>
  )
}

export default ScheduleSection
