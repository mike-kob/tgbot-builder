import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import Header from '@/components/Header'
import { DiagramProvider } from './Context'
const WorkingArea = dynamic(() => import('./WorkingArea'), { ssr: false })

const App = () => {
  return (
    <>
      <Head>
        <title>App - TG Bot builder</title>
      </Head>
      <Header />
      <DiagramProvider>
        <WorkingArea />
      </DiagramProvider>
    </>
  )
}

export default App
