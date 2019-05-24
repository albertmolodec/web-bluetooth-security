import React, { useState } from 'react';
import Layout from './_layout';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NoSsr from '@material-ui/core/NoSsr';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLogging] = useState(false);

  const handleChange = name => event => {
    if (name === 'email') setEmail(event.target.value);
    if (name === 'password') setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!loggingIn) {
      setLogging(true);

      setTimeout(() => {
        setLogging(false);
      }, 3000);
    }
  };

  console.log(email, password);

  return (
    <Layout title="Войти">
      <NoSsr>
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
            {loggingIn ? 'Производится вход..' : 'Войти'}
          </Button>
        </form>
      </NoSsr>
    </Layout>
  );
}

export default withStyles(styles)(Login);
