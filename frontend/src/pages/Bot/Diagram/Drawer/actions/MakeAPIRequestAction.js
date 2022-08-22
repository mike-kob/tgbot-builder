import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem, TextField,
} from '@mui/material';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(1),
  },
  select: {
    minWidth: '50%',
  },
}));

const ALLOWED_METHODS = [
  'GET',
  'POST',
  'PUT',
  'UPDATE',
  'DELETE',
];

function ChangeStateAction(props) {
  const classes = useStyles();
  const { action, changeAction } = props;
  const changeActionProp = (prop) => (e) => changeAction(action.setIn(['options', prop], e.target.value));

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={clsx(classes.margin, classes.select)}>
        <InputLabel htmlFor="outlined-age-native-simple-2">HTTP Method</InputLabel>
        <Select
          variant="standard"
          value={action.getIn(['options', 'method'], '')}
          onChange={changeActionProp('method')}
          label="HTTP Method"
          inputProps={{
            name: 'Method',
          }}
        >
          <MenuItem value="">-</MenuItem>
          {ALLOWED_METHODS.map((el) => (
            <MenuItem key={el} value={el}>{el}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        value={action.getIn(['options', 'url'])}
        onChange={changeActionProp('url')}
        label="URL"
        fullWidth
        variant="outlined"
        className={classes.margin}
      />
      <TextField
        value={action.getIn(['options', 'headers'])}
        onChange={changeActionProp('headers')}
        label="Headers (JSON)"
        fullWidth
        variant="outlined"
        multiline
        rows={3}
        className={classes.margin}
      />
      <TextField
        value={action.getIn(['options', 'body'])}
        onChange={changeActionProp('body')}
        label="Body"
        fullWidth
        variant="outlined"
        multiline
        rows={4}
        className={classes.margin}
      />
    </div>
  );
}

export default ChangeStateAction;
