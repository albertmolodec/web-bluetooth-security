let ledCharacteristic = null;
let poweredOn = false;

function onConnected() {
  document.querySelector('.connect-button').classList.add('hidden');
  document.querySelector('.color-buttons').classList.remove('hidden');
  document.querySelector('.mic-button').classList.remove('hidden');
  document.querySelector('.power-button').classList.remove('hidden');
  poweredOn = true;
}

function onDisconnected() {
  document.querySelector('.connect-button').classList.remove('hidden');
  document.querySelector('.color-buttons').classList.add('hidden');
  document.querySelector('.mic-button').classList.add('hidden');
  document.querySelector('.power-button').classList.add('hidden');
}

export function connect(setConnected) {
  console.log('Requesting Bluetooth Device...');
  navigator.bluetooth
    .requestDevice({
      acceptAllDevices: true,
      optionalServices: [0xff0d],
    })
    .then(device => {
      console.log('> Found ' + device.name);
      console.log('Connecting to GATT Server...');
      device.addEventListener('gattserverdisconnected', setConnected(false));
      return device.gatt.connect();
    })
    .then(server => {
      console.log('Getting Service 0xff0d - Light control...');
      return server.getPrimaryService(0xff0d);
    })
    // Просто цвет
    // .then(service => {
    //     console.log('Getting Characteristic 0xfffc - Light control...');
    //     return service.getCharacteristic(0xfffc);
    // })
    .then(service => {
      console.log('Getting Characteristic 0xfffc - Light control...');
      return service.getCharacteristic(0xfffb);
    })
    .then(characteristic => {
      console.log('All ready!');
      ledCharacteristic = characteristic;
      setConnected(true);
    })
    .catch(error => {
      console.log('Argh! ' + error);
      setConnected(false);
    });
}

function powerOn() {
  let data = new Uint8Array([0xcc, 0x23, 0x33]);
  return ledCharacteristic
    .writeValue(data)
    .catch(err => console.log('Error when powering on! ', err))
    .then(() => {
      poweredOn = true;
      toggleButtons();
    });
}

function powerOff() {
  let data = new Uint8Array([0xcc, 0x24, 0x33]);
  return ledCharacteristic
    .writeValue(data)
    .catch(err => console.log('Error when switching off! ', err))
    .then(() => {
      poweredOn = false;
      toggleButtons();
    });
}

function togglePower() {
  if (poweredOn) {
    powerOff();
  } else {
    powerOn();
  }
}

function toggleButtons() {
  Array.from(document.querySelectorAll('.color-buttons button')).forEach(
    function(colorButton) {
      colorButton.disabled = !poweredOn;
    },
  );
  document.querySelector('.mic-button button').disabled = !poweredOn;
}

// 0xfffc
function setColor(red, green, blue) {
  // 1. Яркость (белота), хз как сказать
  // 2. Красный
  // 3. Зеленый
  // 4. Синий
  // 5. ??
  // 6. Скорость
  // 7. Скорость
  let data = new Uint8Array([0x56, red, green, blue, 0x00, 0xf0, 0xaa]);
  // return ledCharacteristic.writeValue(data)
  //     .catch(err => console.log('Error when writing value! ', err));
  return ledCharacteristic
    .writeValue(new Uint8Array([0x11, 0, 255, 0]))
    .catch(err => console.log('Error when writing value! ', err));
}

// 0xfffb
function setRainbow(red, green, blue) {
  // 1. 00 → ff, ничего не изменилось
  // 2. Красный
  // 3. Зеленый
  // 4. Синий
  // 5. 03 → ?? Когда не 03, не меняется
  // 6. 00 → ff, ничего не изменилось
  // 7. 23 → 14, ускорилось. → 41, замедлилось
  // 8. 00 → ff, ничего не изменилось
  let data = new Uint8Array([0x00, red, green, blue, 0x03, 0xff, 0x41, 0xff]);
  return ledCharacteristic
    .writeValue(data)
    .catch(err => console.log('Error when writing value! ', err));
}

function rainbow() {
  return setRainbow(100, 100, 0).then(() =>
    console.log('Color set to Rainbow'),
  );
}

function red() {
  return setColor(255, 0, 0).then(() => console.log('Color set to Red'));
}

function green() {
  return setColor(0, 255, 0).then(() => console.log('Color set to Green'));
}

function blue() {
  return setColor(0, 0, 255).then(() => console.log('Color set to Blue'));
}
