import React from 'react';
import {
  Paper, Grid, Typography, Box,
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import SignUpForm from './SignUpForm';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundColor: '#CCECFF',
    padding: theme.spacing(6),
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  imageBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  getStarted: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '28px',
    lineHeight: '36px',
  },
  botImage: {
    maxWidth: theme.spacing(45),
  },
}));

function LoginLayout(props) {
  const classes = useStyles(props);

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <div className={classes.imageBox}>
          <Typography variant="h3" className={classes.getStarted}>Let's get started</Typography>
          <Box m={5}>
            <img className={classes.botImage} src="/get-started-bot.svg" />
          </Box>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <SignUpForm />
      </Grid>
    </Grid>
  );
}

export default LoginLayout;
