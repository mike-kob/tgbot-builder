import React, { useContext, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { fromJS } from 'immutable';
import { DiagramContext } from '@/pages/Bot/Context';

import { getBotUsers } from '@/actions';
import useLoader from '@/hooks/useLoader';
import ChatHistoryDrawer from '@/pages/Bot/Users/ChatHistoryDrawer';

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
  marginLeft: {
    marginLeft: 'auto',
  },
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'username',
    headerName: 'Username',
    width: 150,
  },
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
    field: 'state',
    headerName: 'State',
    width: 150,
  },
];

function Users(props) {
  const classes = useStyles();
  const router = useRouter();
  const [state, dispatch] = useContext(DiagramContext);
  const [, setLoading] = useLoader();

  const handleSelect = (row) => dispatch({ type: 'SET_SELECTED_USER', data: fromJS(row.row) });

  const handleRefresh = async () => {
    setLoading(true);
    const users = await getBotUsers(router.query.id);
    dispatch({ type: 'SET_USERS', data: fromJS(users) });
    setLoading(false);
  };

  useEffect(async () => {
    if (router.query.id) {
      await handleRefresh();
    }
  }, [router.query.id]);

  const rows = state.get('users')
    .map((user) => user.update('state', (s) => state.getIn(['bot', 'src', s, 'data', 'label'])))
    .toJS();

  return (
    <Box display="flex" flexDirection="column" mx={3} my={2} width="70%">
      <Box display="flex">
        <Typography variant="h6" display="inline">Users</Typography>
        <Button className={classes.marginLeft} onClick={handleRefresh}>Refresh</Button>
      </Box>
      <Box mt={2} display="flex" flexDirection="column" height={650}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
          onRowClick={handleSelect}
          pageSize={10}
        />
      </Box>
      <ChatHistoryDrawer />
    </Box>
  );
}

export default Users;
