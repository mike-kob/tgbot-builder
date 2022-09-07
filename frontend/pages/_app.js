import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../src/theme'
import getFirebase from '../src/utils/firebase'
import { Store, AppContext } from '@/utils/appContext'
import { getUser } from '../src/actions'
import './App.css'

function MyApp (props) {
  const [, dispatch] = React.useContext(AppContext)
  React.useEffect(async () => {
    const user = await getUser()
    dispatch({ user })
  }, [])
  React.useEffect(() => {
    const firebase = getFirebase()
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  })

  const { Component, pageProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>TG Bot builder</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="favicon.svg"/>
        <link rel="mask-icon" href="mask-icon.svg" color="#000000"/>
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledEngineProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default function WrappedApp (props) {
  return (
    <Store>
      <MyApp {...props} />
    </Store>
  )
}
