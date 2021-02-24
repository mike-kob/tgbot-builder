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
  IconButton,
} from '@material-ui/core'
import { useRouter } from 'next/router'

import { UserContext } from 'src/utils/userContext'
import { logout } from '../../actions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(0, 1),
  },
  rightPanel: {
    marginLeft: 'auto',
  },
  menu: {
    margin: theme.spacing(1),
    zIndex: theme.zIndex.appBar,
  },
  logoText: {
    color: 'white',
  },
}))

const Header = (props) => {
  const [user] = useContext(UserContext)
  const router = useRouter()
  const classes = useStyles(props)
  const [open, setOpen] = useState(false)
  const anchorRef = React.useRef(null)

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
