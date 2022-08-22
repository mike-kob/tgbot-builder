import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Image from 'next/image';
import Head from 'next/head';

import { useRouter } from 'next/router';
import clsx from 'clsx';
import Header from '@/components/Header';
import { getUser } from '@/actions';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: ' column',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  white: {
    backgroundColor: 'white',
  },
  mainSection: {
    height: '90vh',
  },
  secondarySection: {
    height: '500px',
    padding: theme.spacing(0, 4),
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(0, 12),
    },
  },
  button: {
    minWidth: theme.spacing(25),
  },
}));

function Home(props) {
  const classes = useStyles(props);
  const router = useRouter();

  const onGoToApp = async () => {
    const user = await getUser();
    await router.push(user.uid ? '/bots' : '/login');
  };

  return (
    <>
      <Head>
        <title>TGBot builder</title>
      </Head>
      <Header menuDisabled />
      <div className={classes.content}>
        <section className={clsx(classes.mainSection, classes.white, classes.fullWidth)}>
          <Box display="flex" alignItems="center">
            <Box flex="1 1 0px">
              <Box display="flex" flexDirection="column" alignItems="flex-start" mx={4} maxWidth={480}>
                <Typography variant="h1" color="textPrimary">
                  Create Telegram bot without code
                </Typography>
                <Box m={1} />
                <Typography variant="body1" color="textSecondary">
                  Configure your bots, set up commands, actions and deploy easily - all in UI without writing any code.
                </Typography>
                <Box m={1} />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={onGoToApp}
                  disableElevation
                  className={classes.button}
                >
                  Create my bot
                </Button>
              </Box>
            </Box>
            <Box flex="1 1 0px" textAlign="right">
              <Image
                alt="Welcome"
                src="/index/welcome-bot.svg"
                width={700}
                height={730}
              />
            </Box>
          </Box>
        </section>
        <section className={classes.secondarySection}>
          <Box m={4} />
          <Typography variant="h2" align="center">
            How does it work?
          </Typography>
          <Box m={4} />
          <Box display="flex">
            <Box m={5} width="33%">
              <Image
                alt="Create"
                src="/index/create-bot.svg"
                width={140}
                height={140}
              />
              <Typography color="textSecondary" variant="body1">
                1. Create bot with BotFather
              </Typography>
            </Box>
            <Box m={5} width="33%">
              <Image
                alt="Configure"
                src="/index/configure.svg"
                width={140}
                height={140}
              />
              <Typography color="textSecondary" variant="body1">
                2. Configure logic
              </Typography>
            </Box>
            <Box m={5} width="33%">
              <Image
                alt="Deploy"
                src="/index/deploy.svg"
                width={140}
                height={140}
              />
              <Typography color="textSecondary" variant="body1">
                3. Deploy with one click
              </Typography>
            </Box>
          </Box>
        </section>
        <section className={clsx(classes.fullWidth, classes.white, classes.secondarySection)}>
          <Box display="flex" alignItems="center" height="100%">
            <Box width="45%" textAlign="center">
              <Image
                alt="Messages"
                src="/index/message.svg"
                width={420}
                height={250}
              />
            </Box>
            <Box width="55%" maxWidth={500}>
              <Typography variant="h2" color="textPrimary" align="right">
                Send messages to users
              </Typography>
              <Typography variant="body1" color="textSecondary" align="right">
                Send personal and bulk messages to the bot users via interface.
                Use template variables to customize information in messages.
              </Typography>
            </Box>
          </Box>
        </section>
        <section className={clsx(classes.fullWidth, classes.secondarySection)}>
          <Box display="flex" alignItems="center" height="100%" mx={7}>
            <Box width="50%">
              <Box maxWidth={500}>
                <Typography variant="h2" color="textPrimary">
                  Chat with users via bot
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  You can browse history of bot and chat with user via our UI.
                </Typography>
              </Box>
            </Box>
            <Box width="50%" textAlign="center">
              <Image
                alt="Chat"
                src="/index/chat.svg"
                width={420}
                height={440}
              />
            </Box>
          </Box>
        </section>
      </div>
    </>
  );
}

export default Home;
