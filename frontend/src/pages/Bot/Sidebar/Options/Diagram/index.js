import React, { useContext, useEffect, useState } from 'react';
import {
  Divider, Typography, Box, Tabs, Tab,
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import { INIT_NODE_ID } from '@/pages/Bot/constants';
import InitialSection from '@/pages/Bot/Sidebar/Options/Diagram/InitialSection';
import MessageSection from '@/pages/Bot/Sidebar/Options/Diagram/MessageSection';
import ScheduleSection from '@/pages/Bot/Sidebar/Options/Diagram/ScheduleSection';
import NameSection from './NameSection';
import CommandSection from './CommandSection';
import { DiagramContext } from '../../../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
  },
  tab: {
    width: '33%',
    minWidth: 'unset',
  },
}));

function Sidebar(props) {
  const classes = useStyles(props);
  const [state] = useContext(DiagramContext);
  const [tab, setTab] = useState(1);

  const selectedId = state.getIn(['selected', 'id']);
  const initialSelected = selectedId === INIT_NODE_ID;
  const current = state.getIn(['bot', 'src', selectedId]);

  useEffect(() => {
    if (initialSelected) {
      setTab(1);
    }
  }, [selectedId]);

  if (!current) {
    return (
      <Box mt={1} mx="auto" display="flex">
        <Typography variant="subtitle1" color="textSecondary" style={{ margin: 'auto' }}>
          No selected state
        </Typography>
      </Box>
    );
  }

  return (
    <div className={classes.root}>
      <NameSection current={current} />
      <Box m={1}>
        <Divider />
      </Box>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        onChange={(event, newValue) => setTab(newValue)}
        aria-label="disabled tabs example"
      >
        <Tab label="Initial" className={classes.tab} disabled={initialSelected} />
        <Tab label="Commands" className={classes.tab} />
        <Tab label="Messages" className={classes.tab} disabled={initialSelected} />
        <Tab label="Schedule" className={classes.tab} disabled={initialSelected} />
      </Tabs>
      {tab === 0 && <InitialSection current={current} />}
      {tab === 1 && <CommandSection current={current} />}
      {tab === 2 && <MessageSection current={current} />}
      {tab === 3 && <ScheduleSection current={current} />}
    </div>
  );
}

export default Sidebar;
