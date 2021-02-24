import React from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import BotsLayout from './BotsLayout'

const Bots = (props) => {
  return (
    <>
      <Head>
        <title>My bots</title>
      </Head>
      <Header />
      <BotsLayout />
    </>
  )
}

export default Bots
