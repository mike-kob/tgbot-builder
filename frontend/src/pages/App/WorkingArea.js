import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'

import CommandDrawer from './Drawer/CommandDrawer'
import Diagram from './Diagrams/Diagram'
import Sidebar from './Sidebar'
import ToolPanel from './ToolPanel'
import Popup from './Popup'
import Store, { Context } from './bot/store'
import { useRouter } from 'next/router'
import { getBot } from '../../actions'
import Footer from './Footer'

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

const WorkingArea = (props) => {
  const classes = useStyles()
  const router = useRouter()
  const [state, dispatch] = useContext(Context)

  useEffect(async () => {
    if (router.query.id) {
      const bot = await getBot(router.query.id)
      dispatch({ type: 'STATE_UPDATE', data: bot.src })
    }
  }, [router.query.id])

  return (
    <div className={classes.root}>
        <ToolPanel />
      <div className={classes.mainContent}>
        <div className={classes.diagram}>
          <Diagram chart={state.chart} dispatch={dispatch} />
        </div>
        <div className={classes.sidebar}>
          <Sidebar />
        </div>
      </div>
      <div className={classes.footerContent}>
        <Footer/>
      </div>
      <CommandDrawer drawerProps={state.drawer} />
      <Popup />
    </div>
  )
}

const Wrapped = () => (
  <Store>
    <WorkingArea />
  </Store>
)

export default Wrapped
