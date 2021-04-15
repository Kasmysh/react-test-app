import React from 'react';
import moment from 'moment'
import TextField from '@material-ui/core/TextField';

import { useAppStyles } from 'styles'

export default function DatePicker({label, value = moment().format('YYYY-MM-DD'), onChange }) {
  const classes = useAppStyles();

  return (
    <div className={classes.container}>
      <TextField
        type="date"
        label={label}
        defaultValue={value}
        onChange={event => onChange(moment(event.target.value))}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
}
