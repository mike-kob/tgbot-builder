import React, { useState } from 'react'
import {
  makeStyles,
  Avatar,
  Button,
  TextField,
  Link,
  Box,
  Grid,
  Typography,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { googleSignUp, defaultSignUp } from 'src/actions/auth'
import { useRouter } from 'next/router'

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
    '&:hover': {
      border: '2px solid',
    },
  },
}))

const SignUpForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const router = useRouter()

  const classes = useStyles(props)
  const onSuccess = () => router.push('/bots')

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
        variant={'outlined'}
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
          onChange={e => setEmail(e.target.value)}
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
          onChange={e => setPassword(e.target.value)}
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
          onChange={e => setPassword2(e.target.value)}
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
          className={classes.submit}
          onClick={() => defaultSignUp(email, password, onSuccess)}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs>

          </Grid>
          <Grid item>
            <Link href="/login" variant="body2">
              {'Already have an account? Sign In'}
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default SignUpForm
