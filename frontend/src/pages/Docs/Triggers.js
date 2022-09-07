import React from 'react';
import { Typography, Box, Link } from '@mui/material';
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
      marginBlockEnd: theme.spacing(2),
    },
    '& code': {
      backgroundColor: '#e4e4e4',
      borderRadius: 4,
      padding: theme.spacing(0, 0.5),
    },
  },
}));

function TriggersPage() {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Triggers | Docs | TGBot builder</title>
      </Head>
      <Header />
      <main className={classes.root}>
        <Navigation />
        <Box pl={7} pt={4} maxWidth={700} className={classes.content}>
          <Typography variant="h2">Triggers</Typography>
          <Typography variant="body2">
            Triggers are basically the core of your bot.
            You configure triggers for each state and specify what actions will be applied,
            when a certain trigger activates. There are 4 types of triggers:
          </Typography>
          <Typography variant="h3">
            Initial
          </Typography>
          <Typography variant="body2">
            There’s a singleton trigger in this category.
            It contains actions that will be applied immediately, when a user enters this state.
          </Typography>
          <Image
            alt="Initial triggers"
            src="/docs/triggers/initial.png"
            width={300}
            height={317}
          />
          <Typography variant="h3">
            Commands
          </Typography>
          <Typography variant="body2">
            You specify commands that user can use in this state.
            Commands must be unique, thus, only one command will be triggered on user input.
          </Typography>
          <Image
            alt="Command triggers"
            src="/docs/triggers/command.png"
            width={300}
            height={445}
          />
          <Typography variant="h3">
            Messages
          </Typography>
          <Typography variant="body2">
            You specify regular expression to match the user input against.
            Regexps will be tried from top to bottom and no more than one pattern will be applied.
          </Typography>
          <Image
            alt="Message triggers"
            src="/docs/triggers/message.png"
            width={300}
            height={500}
          />
          <Typography variant="h3">
            Schedule
          </Typography>
          <Typography variant="body2">
            You can specify scheduled actions using cron expression.
            Note that the choice of actions for this trigger is limited.
          </Typography>
          <Image
            alt="Diagram"
            src="/docs/triggers/schedule.png"
            width={700}
            height={420}
          />
          <Box m={10} />
        </Box>
      </main>
    </>
  );
}

export default TriggersPage;
