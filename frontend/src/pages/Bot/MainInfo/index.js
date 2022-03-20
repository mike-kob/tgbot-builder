import React, { useCallback, useContext, useState } from 'react'
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
  FormGroup,
  Switch,
  FormControlLabel,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core'
import { DiagramContext } from '@/pages/Bot/Context'
import { useRouter } from 'next/router'
import { Formik } from 'formik'

import { deleteBot, updateBotInfo } from '@/actions'
import { fromJS } from 'immutable'

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
}))

const MainInfo = props => {
  const classes = useStyles()
  const [state, dispatch] = useContext(DiagramContext)
  const [dialogOpen, setDialogOpen] = useState(false)
  const router = useRouter()
  const bot = state.get('bot').toJS()
  const handleStatusChange = (e) =>
    updateBotInfo(router.query.id, { status: e.target.checked }, (newBot) =>
      dispatch({
        type: 'SET_BOT',
        data: fromJS(newBot),
      }))
  const handleDeleteBot = () =>
    deleteBot(router.query.id, () => router.push('/bots'))

  return (
    <Box display="flex" flexDirection="column" mx={3} my={2} width="70%">
      <Formik
        initialValues={bot}
        enableReinitialize
        onSubmit={(values) =>
          updateBotInfo(router.query.id, values, (newBot) =>
            dispatch({
              type: 'SET_BOT',
              data: fromJS(newBot),
            }))
        }
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
      <Box margin={1}/>
      <Typography variant="h6">Danger zone</Typography>
      <Box display="flex" flexDirection="column" width="50%">
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={bot.status} onChange={handleStatusChange}/>}
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
  )
}

export default MainInfo
