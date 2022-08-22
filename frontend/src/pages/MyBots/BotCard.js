import React from 'react';
import clsx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import {
  Typography,
  Paper,
  IconButton, Box,
} from '@mui/material';
import { useRouter } from 'next/router';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: theme.spacing(15),
  },
  editButton: {
    marginLeft: 'auto',
  },
  titleLink: {
    color: theme.palette.primary.dark,
    cursor: 'pointer',
  },
  active: {
    color: theme.palette.primary.main,
  },
  paused: {
    color: 'gray',
  },
}));

function BotCard(props) {
  const classes = useStyles();
  const router = useRouter();
  const { bot } = props;
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Paper className={fixedHeightPaper} elevation={0}>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        className={classes.titleLink}
        onClick={() => router.push(`/bot/${bot._id}`)}
      >
        {bot.name}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {bot.description}
      </Typography>
      <Box mt="auto" display="flex" alignItems="center" className={bot.status ? classes.active : classes.paused}>
        {bot.status ? <PlayArrowIcon /> : <PauseIcon />}
        <span>{bot.status ? 'Active' : 'Paused'}</span>
      </Box>
    </Paper>
  );
}

export default BotCard;
