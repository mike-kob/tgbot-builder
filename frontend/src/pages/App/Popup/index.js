import React, { useContext } from 'react';
import { makeStyles } from "@material-ui/core";
import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
} from '@material-ui/core';
import { openPopupAction, closePopupAction } from '../bot/actions';

import { Context } from '../bot/store';

const useStyles = makeStyles((theme) => ({}));

const Popup = (props) => {
    const classes = useStyles();
    const [state, dispatch] = useContext(Context);
    const closePopup = closePopupAction(state, dispatch);

    return (
        <Dialog
            open={state.popup.open}
            onClose={() => closePopup()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{state.popup.question}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {state.popup.description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    state.popup.onReject && state.popup.onReject();
                    closePopup();
                }} color="primary">
                    No
                </Button>
                <Button onClick={() => {
                    state.popup.onApprove && state.popup.onApprove();
                    closePopup();
                }} color="primary" variant="contained" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Popup;
