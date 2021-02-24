import React from 'react'
import {
  Box,
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core'

import Header from '@/components/Header'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: ' column',
    alignItems: 'center',
  },
  botImage: {
    maxWidth: theme.spacing(70),
    marginTop: theme.spacing(-5),
  },
  helloTitle: {
    marginTop: theme.spacing(-10),
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '48px',
    lineHeight: '72px',
  },
  subtitle: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    color: theme.palette.text.secondary,
  },
  button: {
    minWidth: theme.spacing(25),
  },
}))

const Home = (props) => {
  const classes = useStyles(props)
  const router = useRouter()

  const onGoToApp = async () => {
    const resp = await fetch('/api/user', { credentials: 'include' })
    const user = await resp.json()
    if (!user.uid) {
      router.push('/login')
    } else {
      router.push('/bots')
    }
  }

  return (
    <>
      <Header menuDisabled />
      <div className={classes.content}>
        <img className={classes.botImage} src="/hello-bot.svg" />
        <Typography variant="h3" className={classes.helloTitle}>
          Hello
          </Typography>
        <Typography variant="subtitle2" className={classes.subtitle}>
          This is my pet project
          </Typography>
        <Box m={3}>
          <Button
            variant="contained"
            color="secondary"
            onClick={onGoToApp}
            disableElevation
            className={classes.button}
          >
            Go to app
          </Button>
        </Box>
      </div>
    </>
  )
}

export default Home
