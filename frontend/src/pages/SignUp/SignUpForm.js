import React, { useState } from 'react';
import {
  Avatar, Button, TextField, Box, Grid, Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { googleSignUp, defaultSignUp } from 'src/actions/auth';
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
  containedButton: {
    borderRadius: '7px',
    margin: theme.spacing(3, 'auto'),
    color: 'white',
  },
  outlinedButton: {
    border: '2px solid',
    '&:hover': {
      border: '2px solid',
    },
  },
}));

function SignUpForm(props) {
  const [, dispatch] = React.useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [, setLoading] = useLoader();
  const router = useRouter();

  const classes = useStyles(props);
  const onSuccess = (user) => {
    setLoading(false);
    dispatch({ user });
    router.push('/bots');
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box m={1} />
      <Button
        className={classes.outlinedButton}
        variant="outlined"
        fullWidth
        color="primary"
        onClick={() => googleSignUp(onSuccess)}
      >
        Sign up with Google
      </Button>
      <Box m={1}>
        <Typography align="center">or</Typography>
      </Box>
      <div className={classes.form}>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
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
        <TextField
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Confirm password"
          type="password"
          autoComplete="current-password"
          error={password !== password2}
          helperText={password !== password2 && 'Passwords do not match'}
        />
        <Button
          fullWidth
          disabled={password !== password2}
          variant="contained"
          color="primary"
          className={classes.containedButton}
          onClick={() => defaultSignUp(email, password, onSuccess)}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs />
          <Grid item>
            <Link href="/login">
              <a><Typography variant="body2">Already have an account? Sign In</Typography></a>
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default SignUpForm;
