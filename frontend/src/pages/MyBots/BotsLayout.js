import React, { useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  Container,
  Button,
  Typography,
  Grid,
} from '@mui/material';

import { getBotList } from '@/actions';
import useLoader from '@/hooks/useLoader';
import BotCard from './BotCard';
import EditBotDialog from './NewBotDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(3, 'auto'),
    maxWidth: '60%',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
  },
  subtitle: {
    margin: theme.spacing(2),
    textAlign: 'center',
  },
  ctaButton: {
    width: theme.spacing(50),
    margin: 'auto',
  },
}));

function BotsLayout(props) {
  const classes = useStyles();
  const [bots, setBots] = useState([]);
  const [curBot, setCurBot] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [, setLoading] = useLoader();

  useEffect(async () => {
    setLoading(true);
    const res = await getBotList();
    setBots(res);
    setLoading(false);
  }, []);

  const handleBotUpdate = async (bot) => {
    setBots(bots.map((b) => (b._id === bot._id ? bot : b)));
  };
  const handleBotAdd = async (bot) => {
    setBots([...bots, bot]);
  };
  const handleDelete = async (bot) => {
    setBots(bots.filter((b) => b._id !== bot._id));
  };

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.info}>
          <Typography variant="h2" className={classes.title}>
            Here you can create your bots
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle} color="textSecondary">
            This is page where you can view your bots and create new ones.
          </Typography>
          <Button
            onClick={() => {
              setCurBot({});
              setOpenDialog(true);
            }}
            className={classes.ctaButton}
            variant="contained"
            color="secondary"
          >
            Create bot
          </Button>
        </div>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {bots.map((bot, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                <BotCard
                  bot={bot}
                  onEdit={() => {
                    setCurBot(bot);
                    setOpenDialog(true);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
        <EditBotDialog
          bot={curBot}
          open={openDialog}
          setOpen={setOpenDialog}
          onDelete={handleDelete}
          onUpdate={handleBotUpdate}
          onAdd={handleBotAdd}
        />
      </main>
    </div>
  );
}

export default BotsLayout;
