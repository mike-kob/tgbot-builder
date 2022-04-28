import React from 'react'
import Header from '@/components/Header'
import {
  makeStyles,
  Typography,
  Box,
  Link,
} from '@material-ui/core'
import Navigation from '@/pages/Docs/Navigation'
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  drawer: {
    width: theme.spacing(40),
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.spacing(40),
    height: '92vh',
  },
  content: {
    '& p,h2,h3': {
      marginBlockEnd: '16px',
    },
    '& code': {
      backgroundColor: '#e4e4e4',
      borderRadius: 4,
      padding: theme.spacing(0, 0.5),
    },
  },
}))

const ActionsPage = () => {
  const classes = useStyles()

  return <>
    <Header/>
    <main className={classes.root}>
      <Navigation/>
      <Box pl={7} pt={4} maxWidth={700} className={classes.content}>
        <Typography variant="h2">Actions</Typography>
        <Typography variant="body2">
          When a particular trigger is applied, all actions in it are executed in order.
          You specify actions while editing the trigger in the drawer on the right side.
        </Typography>
        <Image
          alt="Diagram"
          src="/docs/actions/actions.png"
          width={300}
          height={425}
        />
        <Typography variant="h3">
          • Send message
        </Typography>
        <Typography variant="body2">
          The simplest action - send message back to user.
          You can use <Link href="/docs/reference/templating">Template variables</Link> in message body.
        </Typography>
        <Typography variant="h3">
          • Change state
        </Typography>
        <Typography variant="body2">
          Transition user to specified state.
        </Typography>
        <Typography variant="h3">
          • Make API request
        </Typography>
        <Typography variant="body2">
          You can make an HTTP request. You can use Template variables
          in URL and Body fields.
        </Typography>
        <Typography variant="h3">
          • Save user data
        </Typography>
        <Typography variant="body2">
          You can save any data, for example, user input to user DB and use it
          then in Template variables.
        </Typography>
        <Box m={10}/>
      </Box>
    </main>
  </>
}

export default ActionsPage
