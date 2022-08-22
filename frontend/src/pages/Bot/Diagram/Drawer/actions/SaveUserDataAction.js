import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Link, TextField, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(1),
  },
}));

const KEY_REGEX = /^\w*$/;

function SaveUserDataAction(props) {
  const classes = useStyles();
  const {
    action,
    changeAction,
  } = props;

  const handleKeyChange = (e) => changeAction(action.setIn(['options', 'key'], e.target.value));
  const handleValueChange = (e) => changeAction(action.setIn(['options', 'value'], e.target.value));
  const errorText = action.getIn(['options', 'key'], '').match(KEY_REGEX)
    ? ''
    : 'Keys can only contain letters, numbers and underscores';

  return (
    <div className={classes.root}>
      <TextField
        fullWidth
        label="Key"
        variant="outlined"
        value={action.getIn(['options', 'key'], '')}
        onChange={handleKeyChange}
        className={classes.margin}
        error={Boolean(errorText)}
        helperText={errorText}
      />
      <TextField
        fullWidth
        label="Value"
        variant="outlined"
        multiline
        rows={2}
        value={action.getIn(['options', 'value'], '')}
        onChange={handleValueChange}
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

export default SaveUserDataAction;
