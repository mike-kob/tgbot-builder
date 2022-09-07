import React from 'react';
import Head from 'next/head';

import Header from '@/components/Header';
import LoginLayout from './LoginLayout';

function Login(props) {
  return (
    <>
      <Head>
        <title>Login | TG Bot builder</title>
      </Head>
      <Header menuDisabled />
      <LoginLayout />
    </>
  );
}

export default Login;
