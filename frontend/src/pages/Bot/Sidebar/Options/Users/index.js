import React, { useContext } from 'react'
import {
  makeStyles,
  Typography,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'

import { DiagramContext } from '../../../Context'

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
        User info
      </Typography>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="left">{selected.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>First name</TableCell>
            <TableCell align="left">{selected.firstName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Last name</TableCell>
            <TableCell align="left">{selected.lastName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="left">{selected.username}</TableCell>
          </TableRow>
        </TableBody>
        <Box m={1}/>
        <Typography variant="subtitle1">
          User data
        </Typography>
        <TableBody>
          {Object.entries(selected.db).map((row) => (
            <TableRow
              key={row[0]}
            >
              <TableCell component="th" scope="row" variant="head">
                {row[0]}
              </TableCell>
              <TableCell align="left">{row[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UsersOptions
