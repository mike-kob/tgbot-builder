import React, { useContext } from 'react';
import makeStyles from '@mui/styles/makeStyles';

import ActionDrawer from './Drawer/ActionDrawer';
import Chart from './Chart';
import ToolPanel from './ToolPanel';
import Popup from './Popup';
import { DiagramContext } from '../Context';

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
}));

function Diagram(props) {
  const classes = useStyles();
  const [state] = useContext(DiagramContext);

  return (
    <div className={classes.root}>
      <div className={classes.diagram}>
        <Chart elements={Object.values(state.getIn(['bot', 'src']).toJS())} />
      </div>
      <ToolPanel />
      <ActionDrawer />
      <Popup />
    </div>
  );
}

export default Diagram;
