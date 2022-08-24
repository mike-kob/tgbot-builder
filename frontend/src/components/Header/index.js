import React, { useContext, useState } from 'react';
import {
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
  CircularProgress,
  Box,
  Button,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import Link from '@/components/Link';
import { AppContext } from '@/utils/appContext';
import { logout } from '@/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(0, 1),
  },
  rightPanel: {
    display: 'flex',
    marginLeft: 'auto',
    alignItems: 'center',
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
  containedButton: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  headerLink: {
    fontSize: '18px',
    color: 'white',
    marginLeft: theme.spacing(2),
  },
  activeLink: {
    fontWeight: 'bold',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function Header(props) {
  const [state] = useContext(AppContext);
  const router = useRouter();
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const { user, loading } = state;

  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <AppBar position="relative" elevation={1} className={classes.appBar}>
      <Toolbar className={classes.root}>
        <Link href="/">
          <Typography variant="h6" className={classes.logoText}>
            TGBot builder
          </Typography>
        </Link>
        <Box m={1} />
        <Link href="/docs">
          <Typography
            variant="h6"
            className={clsx(classes.headerLink, router.pathname.startsWith('/docs') && classes.activeLink)}
          >
            Docs
          </Typography>
        </Link>
        <Link href="/pricing">
          <Typography
            variant="h6"
            className={clsx(classes.headerLink, router.pathname === '/pricing' && classes.activeLink)}
          >
            Pricing
          </Typography>
        </Link>
        <div className={classes.rightPanel}>
          <Box p={1}>
            {loading && <CircularProgress className={classes.loader} />}
          </Box>
          {user.uid
            ? (
              <>
                <IconButton onClick={() => setOpen((s) => !s)} size="large">
                  <Avatar
                    alt="My picture"
                    src="/avatar.svg"
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
                  placement="bottom-end"
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom' ? 'right top' : 'right top' }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={() => setOpen((s) => !s)}>
                            <MenuItem onClick={(e) => {
                              router.push('/bots');
                              handleClose(e);
                            }}
                            >
                              My bots
                            </MenuItem>
                            <MenuItem onClick={(e) => {
                              router.push('/profile');
                              handleClose(e);
                            }}
                            >
                              Settings
                            </MenuItem>
                            <MenuItem onClick={() => {
                              logout(() => { window.location.href = '/'; });
                            }}
                            >
                              Logout
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </>
            )
            : (
              <Box>
                <Button
                  className={classes.containedButton}
                  color="primary"
                  onClick={() => router.push('/login')}
                >
                  Log in
                </Button>
              </Box>
            )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
