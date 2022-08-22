import React, { useContext } from 'react';
import { Button } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import { useRouter } from 'next/router';
import { updateBotInfo } from '@/actions';
import { DiagramContext, nodeFactory } from '../../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: theme.spacing(6),
    lineHeight: theme.spacing(6),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  rightPanel: {
    marginLeft: 'auto',
  },
  outlinedButton: {
    border: '2px solid',
    '&:hover': {
      border: '2px solid',
    },
  },
  containedButton: {
    color: 'white',
    marginLeft: theme.spacing(1),
  },
}));

function ToolPanel(props) {
  const classes = useStyles(props);
  const router = useRouter();
  const [state, dispatch] = useContext(DiagramContext);

  const handleAddNode = () => {
    const nodeNum = state.getIn(['bot', 'src']).size;
    dispatch({
      type: 'ADD_NODE',
      data: nodeFactory()
        .setIn(['data', 'label'], `New state ${nodeNum}`),
    });
  };

  return (
    <div className={classes.root}>
      <div>
        <Button
          className={classes.outlinedButton}
          variant="outlined"
          color="primary"
          onClick={handleAddNode}
        >
          + Add state
        </Button>
      </div>
      <div className={classes.rightPanel}>
        <Button
          onClick={() => router.push('/bots')}
          className={classes.outlinedButton}
          variant="outlined"
          color="primary"
        >
          Discard All
        </Button>
        <Button
          variant="contained"
          className={classes.containedButton}
          color="primary"
          onClick={() => updateBotInfo(router.query.id, state.get('bot').toJS())}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default ToolPanel;
