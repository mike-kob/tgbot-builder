import React from 'react';
import {
  Box, Button, Paper, Typography,
} from '@mui/material';
import Head from 'next/head';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';
import { getUser } from '@/actions';
import Header from '@/components/Header';

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: theme.spacing(45),
    margin: theme.spacing(1, 'auto'),
    padding: theme.spacing(2, 4),
  },
  button: {
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

function PricingPage() {
  const classes = useStyles();
  const router = useRouter();

  const onGoToApp = async () => {
    const user = await getUser();
    await router.push(user.uid ? '/bots' : '/login');
  };

  return (
    <>
      <Head>
        <title>Pricing | TGBot builder</title>
      </Head>
      <Header />
      <Box>
        <Box m={5} />
        <Typography variant="h1" align="center">
          Build Telegram bots easily!
        </Typography>
        <Box m={5} />
        <Paper className={classes.paper} elevation={1}>
          <Typography variant="h2" color="textSecondary" align="center">
            Beta Free
          </Typography>
          <Box textAlign="center" lineHeight="90px">
            <span style={{ fontSize: '90px' }}>0</span>
            <span style={{ fontSize: '39px' }}>$</span>
          </Box>
          <Box my={3}>
            <ul>
              <li><Typography>Up to 10 bots</Typography></li>
              <li><Typography>Up to 100 user states / bot</Typography></li>
              <li><Typography>Unlimited # of users</Typography></li>
              <li><Typography>Browse chat history of up to 500 messages</Typography></li>
            </ul>
          </Box>
          <Button className={classes.button} fullWidth onClick={onGoToApp}>Get started</Button>
        </Paper>
      </Box>
    </>
  );
}

export default PricingPage;
