import React from 'react';
import Head from 'next/head';

import Header from 'src/components/Header';
import SignUpLayout from './SignUpLayout';

function SignUp(props) {
  return (
    <>
      <Head>
        <title>Sing Up | TG Bot builder</title>
      </Head>
      <Header menuDisabled />
      <SignUpLayout />
    </>
  );
}

export default SignUp;
