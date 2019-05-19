import React, { useState, useEffect } from 'react';

import * as bulb from '../utils/bulb';
import bulbProps from '../constants/bulbProps';

import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

function Bulb() {
  const [connected, setConnected] = useState(false);
  const [power, setPower] = useState(false);
  const [ledCharacteristic, setLedCharacteristic] = useState(null);
  const [serviceCodes, setServiceCodes] = useState(bulbProps.SERVICE_CODES);

  const handleConnect = () => bulb.connect(setConnected);
  const handlePower = () => bulb.togglePower(power, setPower);

  return (
    <>
      <section className="row">
        <Icon>bluetooth</Icon>
        <Switch checked={connected} onChange={handleConnect} color="primary" />
      </section>

      <section className="row">
        <Icon>{power ? 'power' : 'power_off'} </Icon>
        <Switch checked={power} onChange={handlePower} color="primary" />
      </section>

      <section className="row">
        <Button
          onClick={() => bulb.red()}
          variant="contained"
          color="secondary"
        >
          Красный
        </Button>
      </section>
    </>
  );
}

export default Bulb;
