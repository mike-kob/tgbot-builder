import React, { useContext } from 'react'
import {
  makeStyles,
  Divider,
  Typography,
  Box,
  Link,
} from '@material-ui/core'

import { DiagramContext } from '../../../Context'
import { useRouter } from 'next/router'

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

const UsersOptions = (props) => {
  const classes = useStyles(props)
  const [state] = useContext(DiagramContext)
  const router = useRouter()

  const selected = state.get('selectedUser')

  if (!selected.id) {
    return (
      <Box mt={1} mx="auto" display="flex">
        <Typography variant="subtitle1" color="textSecondary" style={{ margin: 'auto' }}>
          No selected user
        </Typography>
      </Box>
    )
  }

  return (
    <div className={classes.root}>
      <Typography>
        {selected.firstName}
      </Typography>
      <Box m={1}>
        <Divider />
      </Box>
      <Typography>
        {selected.lastName}
      </Typography>
      <Link href={`/history/${router.query.id}/${selected.id}`} target="_blank">View chat</Link>
    </div>
  )
}

export default UsersOptions
