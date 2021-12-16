import React, { useContext } from 'react'
import {
  makeStyles,
  Button,
} from '@material-ui/core'

import { DiagramContext, nodeFactory } from '../Context'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: theme.spacing(6),
    lineHeight: theme.spacing(6) + 'px',
    marginBottom: theme.spacing(1),
  },
  rightPanel: {
    marginLeft: 'auto',
  },
  outlinedButton: {
    border: '2px solid',
    marginLeft: theme.spacing(1),
    '&:hover': {
      border: '2px solid',
    },
  },
  containedButton: {
    color: 'white',
    marginLeft: theme.spacing(1),
  },
}))

const ToolPanel = (props) => {
  const classes = useStyles(props)
  const router = useRouter()
  const [state, dispatch] = useContext(DiagramContext)

  const handleAddNode = () => {
    dispatch({ type: 'ADD_NODE', data: nodeFactory() })
  }

  // const onSave = async () => {
  //   await saveBot(router.query.id, state, () => router.push('/bots'))
  // }
  // const onDeploy = async () => {
  //   await saveBot(router.query.id, state)
  // }

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
          Discard All</Button>
        <Button
          onClick={() => {}}
          className={classes.outlinedButton}
          variant="outlined"
          color="primary"
        >
          Deploy
        </Button>
        <Button
          variant="contained"
          className={classes.containedButton}
          color="primary"
          onClick={() => {}}
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default ToolPanel
