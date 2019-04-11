import React, { useState } from 'react';

import * as bulb from '../utils/bulb';
import Button from '@material-ui/core/Button';

function Main() {
  const [connected, setConnected] = useState(false);

  const connect = () => {
    bulb.connect(setConnected);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={connect}
      >
        {connected ? 'Отключиться' : 'Подключиться'}
      </Button>
    </>
  );
}

export default Main;
