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
    '& p': {
      marginBlockEnd: '16px',
    },
    '& code': {
      backgroundColor: '#e4e4e4',
      borderRadius: 4,
      padding: theme.spacing(0, 0.5),
    },
  },
}));

function MainInfoPage() {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Main | Docs | TGBot builder</title>
      </Head>
      <Header />
      <main className={classes.root}>
        <Navigation />
        <Box pl={7} pt={4} maxWidth={700} className={classes.content}>
          <Typography variant="h2">Main info</Typography>
          <Typography variant="body2">
            On the Main info page you can change Name, Description and API token of your bot.
            When you click Save, we revalidate the provided API token and in Token
            info section you&apos;ll see the info from Telegram about the bot, if the token is valid.
            Otherwise, there will be an error.
          </Typography>
          <Image
            alt="BotFather"
            src="/docs/main-info/main-info.png"
            width={700}
            height={420}
          />
          <Typography variant="body2">
            In danger zone you can Activate/Deactivate the bot.
            When the bot is inactive - it will not listen to updates and you&apos;re not able to chat
            with users through the bot.
          </Typography>
          <Typography variant="body2">
            If you want to delete bot, note that this will also delete all users and all history of messages
            related to this bot.
          </Typography>
          <Box m={10} />
        </Box>
      </main>
    </>
  );
}

export default MainInfoPage;
