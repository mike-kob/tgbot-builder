import React, { useCallback, useContext } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PeopleIcon from '@mui/icons-material/People';

import { DiagramContext } from '@/pages/Bot/Context';
import { VIEW_NAME } from '@/pages/Bot/constants';

function Navigation(props) {
  const [state, dispatch] = useContext(DiagramContext);
  const currentView = state.get('currentView');

  const setView = useCallback((view) => {
    dispatch({ type: 'SET_VIEW', data: view });
  }, [dispatch]);

  return (
    <List>
      <ListItem
        button
        selected={currentView === VIEW_NAME.MAIN}
        onClick={() => setView(VIEW_NAME.MAIN)}
      >
        <ListItemIcon>
          <PermDeviceInformationIcon />
        </ListItemIcon>
        <ListItemText primary="Main info" />
      </ListItem>
      <ListItem
        button
        selected={currentView === VIEW_NAME.DIAGRAM}
        onClick={() => setView(VIEW_NAME.DIAGRAM)}
      >
        <ListItemIcon>
          <AccountTreeIcon />
        </ListItemIcon>
        <ListItemText primary="Diagram" />
      </ListItem>
      <ListItem
        button
        selected={currentView === VIEW_NAME.USERS}
        onClick={() => setView(VIEW_NAME.USERS)}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
      <Divider />
    </List>
  );
}

export default Navigation;
