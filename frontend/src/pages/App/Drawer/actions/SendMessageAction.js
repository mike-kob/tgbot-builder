import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Typography, Select, FormControl, InputLabel, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
    }
}));

const ChangeStateAction = (props) => {
    const classes = useStyles();
    const {action, changeAction} = props;

    const changeText = (e) => changeAction({
        ...action,
        options: {text: e.target.value}
    });
    

    return (
        <div className={classes.root}>
           <TextField
             fullWidth
             id="outlined-basic" 
             label="Msg" 
             variant="outlined" v
             value={action.options.text} 
             onChange={changeText} 
            />
        </div>
    );
}

export default ChangeStateAction;