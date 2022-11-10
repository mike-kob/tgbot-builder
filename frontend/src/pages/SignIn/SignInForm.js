import React, { useState } from 'react';
import {
  Avatar, Button, TextField, Box, Grid, Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { googleSignIn, defaultSignIn } from 'src/actions/auth';
import useLoader from '@/hooks/useLoader';
import { AppContext } from '@/utils/appContext';

const useStyles = makeStyles((theme) => ({
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
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  outlinedButton: {
    border: '2px solid',
    borderRadius: '7px',
    margin: theme.spacing(1, 'auto'),
    '&:hover': {
      border: '2px solid',
    },
  },
  containedButton: {
    borderRadius: '7px',
    margin: theme.spacing(3, 'auto'),
    color: 'white',
  },
}));

function SignInForm(props) {
  const [, dispatch] = React.useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, setLoading] = useLoader();

  const classes = useStyles(props);
  const router = useRouter();

  const onSuccess = (user) => {
    setLoading(false);
    dispatch({ user });
    router.push('/bots');
  };
  const onError = () => {
    setLoading(false);
    setError('Something went wrong. Have you signed up?');
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box m={1} />
      <Typography variant="caption" color="secondary">{error}</Typography>
      <Button
        variant="outlined"
        color="primary"
        className={classes.outlinedButton}
        fullWidth
        onClick={async () => {
          setLoading(true);
          await googleSignIn(onSuccess, onError);
        }}
      >
        Sign in with Google
      </Button>
      <Box m={1}>
        <Typography align="center">or</Typography>
      </Box>
      <form className={classes.form} noValidate>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.containedButton}
          onClick={() => defaultSignIn(email, password, onSuccess)}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs />
          <Grid item>
            <Link href="/signup">
              <a><Typography variant="body2">Don&apos;t have an account? Sign Up</Typography></a>
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default SignInForm;
