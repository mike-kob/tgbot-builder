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
import { useRouter } from 'next/router'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { googleSignIn, defaultSignIn } from 'src/actions/auth'

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

const SignInForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const classes = useStyles(props)
  const router = useRouter()

  const onSuccess = () => router.push('/bots')

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        Sign in
        </Typography>
      <Box m={1} />
      <Button
        variant={'outlined'}
        color="primary"
        className={classes.outlinedButton}
        fullWidth
        onClick={() => googleSignIn(onSuccess)}
      >
        Sign in with Google
      </Button>
      <Box m={1}>
        <Typography align="center">or</Typography>
      </Box>
      <form className={classes.form} noValidate>
        <TextField
          value={email}
          onChange={e => setEmail(e.target.value)}
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => defaultSignIn(email, password, onSuccess)}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default SignInForm
