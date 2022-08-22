import React, { useContext } from 'react';
import { Box } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import { DiagramContext } from '@/pages/Bot/Context';
import { VIEW_NAME } from '@/pages/Bot/constants';
import Navigation from './Navigation';
import DiagramOptions from './Options/Diagram';
import UsersOptions from './Options/Users';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
  },
  rightPanel: {
    marginLeft: 'auto',
  },
  stateTitle: {},
  noSelected: {
    display: 'flex',
    height: '100%',
  },
}));

function Sidebar(props) {
  const classes = useStyles(props);
  const [state] = useContext(DiagramContext);
  const currentView = state.get('currentView');

  return (
    <Box width="30%" minHeight="70vh">
      <Navigation />
      {currentView === VIEW_NAME.DIAGRAM && <DiagramOptions />}
      {currentView === VIEW_NAME.USERS && <UsersOptions />}
    </Box>
  );
}

export default Sidebar;
