import React from 'react';
import { Typography, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Image from 'next/image';
import Head from 'next/head';
import Navigation from '@/pages/Docs/Navigation';
import Header from '@/components/Header';

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
}));

function DiagramPage() {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Diagram | Docs | TGBot builder</title>
      </Head>
      <Header />
      <main className={classes.root}>
        <Navigation />
        <Box pl={7} pt={4} maxWidth={700} className={classes.content}>
          <Typography variant="h2">Diagram</Typography>
          <Typography variant="body2">
            Diagram is the canvas showing the transition between user states.
          </Typography>
          <Typography variant="body2">
            A user state defines the behavior of your bot.
            When a user have not yet interacted with the bot - it&apos;s in the Init state.
            This state is predefined for you and the only available trigger is command
            {' '}
            <code>/start</code>
            .
          </Typography>
          <Typography variant="body2">
            It’s recommended to always create a separate state with meaningful name for the logic
            of your bot and apply a single action of transition to your state on
            {' '}
            <code>/start</code>
            {' '}
            command
            of the Init state.
          </Typography>
          <Typography variant="body2">
            You can rename and remove states in the panel on the left.
            It&apos;s impossible to remove or rename the Init state.
          </Typography>
          <Image
            alt="Diagram"
            src="/docs/diagram/diagram.png"
            width={700}
            height={420}
          />
          <Box m={10} />
        </Box>
      </main>
    </>
  );
}

export default DiagramPage;
