import React, { useContext, useEffect } from 'react'
import { Box, Link, makeStyles, TextField, Typography, FormGroup, Switch, FormControlLabel } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { DiagramContext } from '@/pages/Bot/Context'
import { useRouter } from 'next/router'

import { getBotUsers } from '@/actions'
import { fromJS } from 'immutable'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1, 2),
    width: '70%',
  },
  diagram: {
    width: '100%',
    height: '80vh',
    overflow: 'hidden',
    border: 'solid 2px #BEC2CC',
    borderRadius: '4px',
  },
  sidebar: {
    width: '30%',
  },
}))

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
  },
  {
    field: 'username',
    headerName: 'Username',
    width: 150,
  },
  {
    field: 'username',
    headerName: 'Username',
    width: 150,
  },
  {
    field: 'chat',
    headerName: 'Chat',
    sortable: false,
    width: 100,
    filter: false,
    renderCell: (params) => (
      <Link href={`/history/${params.row.botId}/${params.row.id}`} target="_blank">View chat</Link>
    ),
  },
]

const Users = props => {
  const classes = useStyles()
  const router = useRouter()
  const [state, dispatch] = useContext(DiagramContext)

  useEffect(async () => {
    if (router.query.id) {
      const users = await getBotUsers(router.query.id)
      dispatch({ type: 'SET_USERS', data: fromJS(users) })
    }
  }, [router.query.id])

  const handleSelect = (row) =>
    dispatch({ type: 'SET_SELECTED_USER', data: row.row })

  return (
    <Box display="flex" flexDirection="column" mx={3} my={2} width="70%">
      <Typography variant="h6">Users</Typography>
      <Box mt={2} display="flex" flexDirection="column" height={650}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={state.get('users').toJS()}
          columns={columns}
          onRowClick={handleSelect}
          pageSize={10}
        />
      </Box>
    </Box>
  )
}

export default Users
