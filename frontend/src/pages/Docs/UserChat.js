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
      marginBlockEnd: '16px',
    },
    '& code': {
      backgroundColor: '#e4e4e4',
      borderRadius: 4,
      padding: theme.spacing(0, 0.5),
    },
  },
}));

function UserChatPage() {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>User chat | Docs | TGBot builder</title>
      </Head>
      <Header />
      <main className={classes.root}>
        <Navigation />
        <Box pl={7} pt={4} maxWidth={700} className={classes.content}>
          <Typography variant="h2">User chat</Typography>
          <Typography variant="body2">
            In Users panel you can see users that have interacted with your bot.
            You see their information such as username,
            first/last name and user data that was saved with Save user data action and current state.
          </Typography>
          <Typography variant="body2">
            When you select user and click on View chat button,
            you see chat history with this user (up to 500 latest messages).
          </Typography>
          <Typography variant="body2">
            You can write message to user, though beware that any user input in reply will
            still trigger configured actions.
          </Typography>
          <Box m={10} />
        </Box>
      </main>
    </>
  );
}

export default UserChatPage;
