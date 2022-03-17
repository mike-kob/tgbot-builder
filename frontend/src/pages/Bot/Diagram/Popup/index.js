import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core'
import { Map } from 'immutable'
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from '@material-ui/core'

import { DiagramContext } from '../../Context'

const useStyles = makeStyles((theme) => ({}))

const Popup = (props) => {
  const classes = useStyles()
  const [state, dispatch] = useContext(DiagramContext)

  const handleClose = () => {
    dispatch({ type: 'UPDATE_POPUP', data: Map({ open: false }) })
  }

  return (
    <Dialog
      open={state.getIn(['popup', 'open'])}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{state.getIn(['popup', 'question'])}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {state.getIn(['popup', 'description'])}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          state.hasIn(['popup', 'onReject']) && state.getIn(['popup', 'onReject'])()
          handleClose()
        }} color="primary">
          No
        </Button>
        <Button onClick={() => {
          state.hasIn(['popup', 'onApprove']) && state.getIn(['popup', 'onApprove'])()
          handleClose()
        }} color="primary" variant="contained" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Popup
