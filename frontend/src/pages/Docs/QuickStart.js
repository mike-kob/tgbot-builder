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

function QuickStartPage() {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>QuickStart | Docs | TGBot builder</title>
      </Head>
      <Header />
      <main className={classes.root}>
        <Navigation />
        <Box pl={7} pt={4} maxWidth={700} className={classes.content}>
          <Typography variant="h2">Quick Start</Typography>
          <Typography variant="body2">Let’s create your first bot in TGBot Builder.</Typography>
          <Typography variant="body2">
            First of all, you need to create a bot in Telegram
            with
            {' '}
            <Link href="https://t.me/BotFather" target="_blank" rel="noopener nofollow">BotFather</Link>
            .
            This is the place, where you configure the appearance of your bot.
          </Typography>
          <Image
            alt="BotFather"
            src="/docs/quick-start/bot-father.png"
            width={700}
            height={440}
          />
          <Typography variant="body2">
            When the bot is created BotFather will show you API token.
          </Typography>
          <Typography variant="body2">
            Now, lets go
            to
            {' '}
            <Link href="/bots" target="_blank">My bots</Link>
            {' '}
            page and
            click Create bot button.
          </Typography>
          <Typography variant="body2">
            Provide a name and a short description.
            From this moment, you can start configuring your bot.
            Let’s do the basic echo-bot example.
          </Typography>
          <Image
            alt="Init state"
            src="/docs/quick-start/init-state.png"
            width={700}
            height={410}
          />
          <Typography variant="body2">
            To configure the bot in Diagram section we see the diagram of user behaviour.
            Users that have not yet interacted with the bot are in &quot;Init state&quot;.
            Because of security settings of Telegram users must contact bots first with
            {' '}
            <code>/start</code>
            {' '}
            command.
            That’s why only one command is available in this state.
          </Typography>
          <Typography variant="body2">
            Let’s add a new state &quot;Echo&quot;.
            And add an action to
            {' '}
            <code>/start</code>
            {' '}
            command to change state to &quot;Echo&quot;.
            Now, users that started conversations with the bot will transfer to our new state.
          </Typography>
          <Image
            alt="Echo state"
            src="/docs/quick-start/echo-state.png"
            width={700}
            height={410}
          />
          <Image
            alt="Change state action"
            src="/docs/quick-start/change-state-action.png"
            width={700}
            height={460}
          />
          <Typography variant="body2">
            Now, we want all messages of users to be echoed back. Let&apos;s add a Message trigger with regexp
            <code>/.*/</code>
            {' '}
            which will match all messages and add action Send message.
          </Typography>
          <Image
            alt="Message trigger"
            src="/docs/quick-start/message-trigger.png"
            width={700}
            height={460}
          />
          <Typography variant="body2">
            We use template variable
            {' '}
            <code>&#123;&#123; UPD.message_text &#125;&#125;</code>
            {' '}
            to reply back what
            user sent us. You can read more about template variables
            {' '}
            <Link href="/docs/reference/templating">here</Link>
            .
          </Typography>
          <Typography variant="body2">
            Everything’s ready, don&apos;t forget to click Save button.
            And then we can Activate the bot in Main info panel and test it in Telegram.
          </Typography>
          <Typography variant="body2">
            That’s all, the bot is ready!
          </Typography>
          <Box m={10} />
        </Box>
      </main>
    </>
  );
}

export default QuickStartPage;
