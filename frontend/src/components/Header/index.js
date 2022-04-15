import React, { useContext, useState } from 'react'
import {
  makeStyles,
  Toolbar,
  Typography,
  AppBar,
  Avatar,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  IconButton, CircularProgress, Box,
} from '@material-ui/core'
import { useRouter } from 'next/router'

import { AppContext } from '@/utils/appContext'
import { logout } from '../../actions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(0, 1),
  },
  rightPanel: {
    display: 'flex',
    marginLeft: 'auto',
  },
  menu: {
    margin: theme.spacing(1),
    zIndex: theme.zIndex.appBar,
  },
  logoText: {
    color: 'white',
  },
  loader: {
    color: 'white',
  },
}))

const Header = (props) => {
  const [state] = useContext(AppContext)
  const router = useRouter()
  const classes = useStyles(props)
  const [open, setOpen] = useState(false)
  const anchorRef = React.useRef(null)
  const { user, loading } = state

  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return
    }
    setOpen(false)
  }

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar className={classes.root}>
        <Typography variant="h6" className={classes.logoText}>
          TGBot builder
        </Typography>
        <div className={classes.rightPanel}>
          <Box p={1}>
            {loading && <CircularProgress className={classes.loader}/>}
          </Box>
          {user.uid &&
            <>
              <IconButton onClick={() => setOpen(s => !s)} disabled={props.menuDisabled}>
                <Avatar
                  alt="My picture"
                  src={'/avatar.svg'}
                  ref={anchorRef}
                />
              </IconButton>
              <Popper
                className={classes.menu}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                placement='bottom-end'
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'right top' : 'right top' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={() => setOpen(s => !s)}>
                          <MenuItem onClick={(e) => {
                            router.push('/bots')
                            handleClose(e)
                          }}>My bots</MenuItem>
                          <MenuItem onClick={(e) => {
                            router.push('/profile')
                            handleClose(e)
                          }}>Settings</MenuItem>
                          <MenuItem onClick={() => {
                            logout(() => { window.location.href = '/' })
                          }}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          }
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
