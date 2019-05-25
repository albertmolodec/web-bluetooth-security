import React from 'react';
import Main from './_layout';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({});

function Register() {
  return <Main title="Зарегистрироваться">Зарегистрироваться</Main>;
}

export default withStyles(styles)(Register);
