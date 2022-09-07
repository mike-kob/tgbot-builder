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

function TemplatingPage() {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Template variables | Docs | TGBot builder</title>
      </Head>
      <Header />
      <main className={classes.root}>
        <Navigation />
        <Box pl={7} pt={4} maxWidth={700} className={classes.content}>
          <Typography variant="h2">Template variables</Typography>
          <Typography variant="body2">
            Template variables are needed, when you want to use information provided by bot user.
          </Typography>
          <Typography variant="body2">
            The general form of variable is
            {' '}
            <code>&#123;&#123; DOMAIN.key &#125;&#125;</code>
            . For now there are two domains:
          </Typography>
          <Typography variant="h3">
            DB
          </Typography>
          <Typography variant="body2">
            This is user DB. You can save keys to it with Save user data action.
            The key must contain only english lowercase letters or underscore.
          </Typography>
          <Typography variant="h3">
            UPD
          </Typography>
          <Typography variant="body2">
            This is information we received from update.
            It&apos;s not available in scheduled triggers, since there is no update.
            Available keys for UPD domain:
          </Typography>
          {['message_message_id',
            'message_date',
            'message_text',
            'message_from_id',
            'message_from_first_name',
            'message_from_last_name',
            'message_from_username',
            'message_from_language_code',
            'message_chat_type',
            'message_chat_title',
            'message_chat_username',
            'message_chat_first_name',
            'message_chat_last_name',
            'message_chat_description',
          ].map((key) => (
            <React.Fragment key={key}>
              <code>{key}</code>
              <br />
            </React.Fragment>
          ))}
          <Box m={10} />
        </Box>
      </main>
    </>
  );
}

export default TemplatingPage;
