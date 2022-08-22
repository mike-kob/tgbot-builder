import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Link, TextField, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function ChangeStateAction(props) {
  const classes = useStyles();
  const {
    action,
    changeAction,
  } = props;

  const handleTextChange = (e) => changeAction(action.setIn(['options', 'text'], e.target.value));

  return (
    <div className={classes.root}>
      <TextField
        fullWidth
        label="Text"
        variant="outlined"
        multiline
        rows={5}
        maxRows={15}
        value={action.getIn(['options', 'text'], '')}
        onChange={handleTextChange}
      />
      <Typography variant="caption" color="textSecondary">
        You can use
        {' '}
        <Link href="/docs/reference/templating" target="_blank">Template variables</Link>
        {' '}
        here
      </Typography>
    </div>
  );
}

export default ChangeStateAction;
