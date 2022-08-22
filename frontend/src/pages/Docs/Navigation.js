import React from 'react';
import {
  List, ListItem, ListItemText, Divider, Paper, Link,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';
import Header from '@/components/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(35),
    backgroundColor: theme.palette.background.paper,
  },
  drawerPaper: {
    width: theme.spacing(35),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function DocsPage() {
  const classes = useStyles();
  const router = useRouter();

  const page = router.pathname.replace('/docs', '');

  return (
    <Paper
      elevation={0}
      className={classes.drawerPaper}
    >
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <ListItem component={Link} href="/docs" color="textPrimary" button selected={page === ''}>
          <ListItemText primary="Quick start" primaryTypographyProps={{ variant: 'body2' }} />
        </ListItem>
        <Divider />
        <ListItem button selected={page.startsWith('/reference')} onClick={() => router.push('/docs/reference/main-info')}>
          <ListItemText primary="Reference" primaryTypographyProps={{ variant: 'body2' }} />
        </ListItem>
        <List component="div" disablePadding>
          <ListItem component={Link} href="/docs/reference/main-info" color="textPrimary" button className={classes.nested} selected={page === '/reference/main-info'}>
            <ListItemText primary="Main info" primaryTypographyProps={{ variant: 'body2' }} />
          </ListItem>
          <ListItem component={Link} href="/docs/reference/diagram" color="textPrimary" button className={classes.nested} selected={page === '/reference/diagram'}>
            <ListItemText primary="Diagram" primaryTypographyProps={{ variant: 'body2' }} />
          </ListItem>
          <ListItem component={Link} href="/docs/reference/triggers" color="textPrimary" button className={classes.nested} selected={page === '/reference/triggers'}>
            <ListItemText primary="Triggers" primaryTypographyProps={{ variant: 'body2' }} />
          </ListItem>
          <ListItem component={Link} href="/docs/reference/actions" color="textPrimary" button className={classes.nested} selected={page === '/reference/actions'}>
            <ListItemText primary="Actions" primaryTypographyProps={{ variant: 'body2' }} />
          </ListItem>
          <ListItem component={Link} href="/docs/reference/templating" color="textPrimary" button className={classes.nested} selected={page === '/reference/templating'}>
            <ListItemText primary="Template variables" primaryTypographyProps={{ variant: 'body2' }} />
          </ListItem>
        </List>
        <Divider />
        <ListItem component={Link} href="/docs/user-chat" color="textPrimary" button selected={page === '/user-chat'}>
          <ListItemText primary="User chat" primaryTypographyProps={{ variant: 'body2' }} />
        </ListItem>
      </List>
    </Paper>
  );
}

export default DocsPage;
