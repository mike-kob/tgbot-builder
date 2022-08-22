import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import BotsLayout from './BotsLayout';

function Bots(props) {
  return (
    <>
      <Head>
        <title>My bots | TGBot builder</title>
      </Head>
      <Header />
      <BotsLayout />
    </>
  );
}

export default Bots;
