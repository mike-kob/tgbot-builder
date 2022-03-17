import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { fromJS } from 'immutable'
import { Box } from '@material-ui/core'

import Header from '@/components/Header'
import { DiagramContext, DiagramProvider } from './Context'
import Sidebar from './Sidebar'
import { VIEW_NAME } from './constans'
import { getBot } from '@/actions'

const MainInfo = dynamic(() => import('./MainInfo'), { ssr: false })
const Diagram = dynamic(() => import('./Diagram'), { ssr: false })
const Users = dynamic(() => import('./Users'), { ssr: false })

const View = () => {
  const [state, dispatch] = useContext(DiagramContext)
  const router = useRouter()
  const currentView = state.get('currentView')

  useEffect(async () => {
    if (router.query.id) {
      const bot = await getBot(router.query.id)
      dispatch({ type: 'SET_BOT', data: fromJS(bot) })
    }
  }, [router.query.id])

  const dict = {
    [VIEW_NAME.MAIN]: MainInfo,
    [VIEW_NAME.DIAGRAM]: Diagram,
    [VIEW_NAME.USERS]: Users,
  }
  const Comp = dict[currentView]
  return Comp ? <Comp/> : <></>
}

const BotPage = () => {
  return (
    <>
      <Head>
        <title>App - TG Bot builder</title>
      </Head>
      <Header/>
      <DiagramProvider>
        <Box display={'flex'} flexDirection={'row'}>
          <Sidebar/>
          <View />
        </Box>
      </DiagramProvider>
    </>
  )
}

export default BotPage
