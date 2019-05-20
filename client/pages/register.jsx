import React from 'react';
import Layout from './_layout';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({});

function Register() {
  return <Layout title="Зарегистрироваться">Зарегистрироваться</Layout>;
}

export default withStyles(styles)(Register);
