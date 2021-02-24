import React from 'react'
import Head from 'next/head'

import Header from '@/components/Header'
import WorkingArea from './WorkingArea'

const App = () => {
  return (
    <>
      <Head>
        <title>App - TG Bot builder</title>
      </Head>
      <Header />
      <WorkingArea />
    </>
  )
}

export default App
