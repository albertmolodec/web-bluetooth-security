import React, { useState, useCallback } from 'react';
import useStoreon from 'storeon/react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

function Login({ classes }) {
  const { dispatch, auth, device } = useStoreon('auth', 'device');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = name => event => {
    if (name === 'email') setEmail(event.target.value);
    if (name === 'password') setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch('auth/login', { email, password });
  };

  return (
    <form
      className={classes.container}
      noValidate
      autoComplete="off"
      action="/"
      method="POST"
      onSubmit={handleSubmit}
    >
      <TextField
        className={classes.textField}
        type="email"
        label="Email"
        autoComplete="email"
        value={email}
        onChange={handleChange('email')}
        margin="normal"
        variant="outlined"
        required
      />
      <TextField
        className={classes.textField}
        type="password"
        label="Password"
        autoComplete="current-password"
        value={password}
        onChange={handleChange('password')}
        margin="normal"
        variant="outlined"
        required
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        label="Войти"
        type="submit"
      >
        Войти
      </Button>
    </form>
  );
}

export default withStyles(styles)(Login);
