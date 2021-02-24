import React, { useContext } from 'react'
import {
  makeStyles,
  Button,
} from '@material-ui/core'

import { Context } from '../bot/store'
import { addNodeAction } from '../bot/actions'
import { nodeFactory, nodeInfoFactory } from '../bot/models'
import { useRouter } from 'next/router'
import { saveBot, deployBot } from '../../../actions'

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
  const [state, dispatch] = useContext(Context)

  const addNode = addNodeAction(state, dispatch)
  const onSave = async () => {
    await saveBot(router.query.id, state, () => router.push('/bots'))
  }
  const onDeploy = async () => {
    await saveBot(router.query.id, state, async () => {
      await deployBot(router.query.id, () => console.log('Deployed'))
    })
  }

  return (
        <div className={classes.root}>
            <div>
                <Button
                  className={classes.outlinedButton}
                  variant="outlined"
                  color="primary"
                  onClick={() => addNode(nodeFactory(), nodeInfoFactory())}
                  >
                    + Add state
                </Button>
            </div>
            <div className={classes.rightPanel}>
                {/* TODO */}
                <Button
                  onClick={() => router.push('/bots')}
                  className={classes.outlinedButton}
                  variant="outlined"
                  color="primary"
                  >
                    Discard All</Button>
                <Button
                  onClick={onDeploy}
                  className={classes.outlinedButton}
                  variant="outlined"
                  color="primary"
                  >
                    Deploy</Button>
                <Button
                  variant="contained"
                  className={classes.containedButton}
                  color="primary"
                  onClick={onSave}
                  >
                    Save</Button>
            </div>
        </div>
  )
}

export default ToolPanel
