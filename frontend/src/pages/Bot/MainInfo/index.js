import React, { useCallback, useContext, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  FormGroup,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';
import { Formik } from 'formik';

import { fromJS } from 'immutable';
import { deleteBot, updateBotInfo } from '@/actions';
import { DiagramContext } from '@/pages/Bot/Context';
import useLoader from '@/hooks/useLoader';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1, 2),
    width: '70%',
  },
  diagram: {
    width: '100%',
    height: '80vh',
    overflow: 'hidden',
    border: 'solid 2px #BEC2CC',
    borderRadius: '4px',
  },
  sidebar: {
    width: '30%',
  },
}));

function MainInfo(props) {
  const classes = useStyles();
  const [state, dispatch] = useContext(DiagramContext);
  const [, setLoading] = useLoader();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [enableSwitch, setEnableSwitch] = useState(true);
  const router = useRouter();
  const bot = state.get('bot').toJS();
  const handleStatusChange = (e) => {
    setEnableSwitch(false);
    setLoading(true);
    updateBotInfo(router.query.id, { status: e.target.checked }, (newBot) => {
      dispatch({
        type: 'SET_BOT',
        data: fromJS(newBot),
      });
      setEnableSwitch(true);
      setLoading(false);
    });
  };
  const handleDeleteBot = () => deleteBot(router.query.id, () => router.push('/bots'));

  return (
    <Box display="flex" flexDirection="column" mx={3} my={2} width="70%">
      <Formik
        initialValues={bot}
        enableReinitialize
        onSubmit={(values) => {
          setLoading(true);
          updateBotInfo(router.query.id, values, (newBot) => {
            dispatch({ type: 'SET_BOT', data: fromJS(newBot) });
            setLoading(false);
          });
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Typography variant="h6">Bot settings</Typography>
            <Box display="flex" flexDirection="column" width="50%" marginBottom={2}>
              <TextField
                value={values.name}
                onChange={handleChange}
                variant="outlined"
                name="name"
                label="Name"
                size="small"
                margin="normal"
              />
              <TextField
                value={values.token}
                onChange={handleChange}
                name="token"
                variant="outlined"
                label="API Token"
                type="password"
                size="small"
                margin="normal"
              />
              <TextField
                value={values.description}
                onChange={handleChange}
                name="description"
                variant="outlined"
                label="Description"
                type="password"
                size="small"
                margin="normal"
                multiline
                rows={4}
              />
            </Box>
            <Button
              variant="outlined"
              color="primary"
              component="label"
              onClick={handleSubmit}
            >
              Save changes
            </Button>
          </form>
        )}
      </Formik>
      <Box margin={1} />
      {bot.tokenInfo && (
      <>
        <Typography variant="h6">Token validation</Typography>
        {bot.tokenInfo.ok
          ? (
            <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(bot.tokenInfo.profile, null, 2)}
            </Typography>
          )
          : <Typography variant="body2" color="secondary">{bot.tokenInfo.reason}</Typography>}
        <Box margin={1} />
      </>
      )}
      <Typography variant="h6">Danger zone</Typography>
      <Box display="flex" flexDirection="column" width="50%">
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={bot.status} disabled={!enableSwitch} onChange={handleStatusChange} />}
            label="Activate"
          />
        </FormGroup>
        <Button
          variant="outlined"
          color="error"
          component="label"
          onClick={() => setDialogOpen(true)}
        >
          Delete bot
        </Button>
      </Box>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Do you want to delete this bot?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteBot} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MainInfo;
