import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'

import CommandDrawer from '../Drawer/CommandDrawer'
import Diagram from '../Diagrams/Diagram'
import Sidebar from '../Sidebar'
import ToolPanel from '../ToolPanel'
import Popup from '../Popup'
import { DiagramContext } from '../Context'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1, 2),
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  diagram: {
    width: '70%',
    height: '70vh',
    overflow: 'hidden',
    border: 'solid 2px #BEC2CC',
    borderRadius: '4px',
  },
  sidebar: {
    width: '30%',
  },
}))

const Index = (props) => {
  const classes = useStyles()
  const [state, dispatch] = useContext(DiagramContext)
  useEffect(async () => {
    // const bot = await getBot('6193f7eb572e5ca930cb0322')
    // setTimeout(() => setBot(state), 100)
  }, [])

  return (
    <DiagramContext.Provider value={[state, dispatch]}>
      <div className={classes.root}>
        <ToolPanel/>
        <div className={classes.mainContent}>
          <div className={classes.diagram}>
            <Diagram elements={state.get('elements').toJS()}/>
          </div>
          <div className={classes.sidebar}>
            <Sidebar/>
          </div>
        </div>
        <div className={classes.footerContent}>
        </div>
        <CommandDrawer/>
        <Popup/>
      </div>
    </DiagramContext.Provider>
  )
}

export default Index
