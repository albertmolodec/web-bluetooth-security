let ledCharacteristic = null;

export function connect(setConnected) {
  console.log('Запрос к Bluetooth-устройству...');
  navigator.bluetooth
    .requestDevice({
      acceptAllDevices: true,
      optionalServices: [0xff0d],
    })
    .then(device => {
      console.log('> Найдено устройство ' + device.name);
      console.log('Подключение к GATT серверу...');
      device.addEventListener('gattserverdisconnected', setConnected(false));
      return device.gatt.connect();
    })
    .then(server => {
      console.log('Получение сервиса 0xff0d - Light control...');
      return server.getPrimaryService(0xff0d);
    })
    .then(service => {
      console.log('Получение характеристики 0xfffc - Light control...');
      return service.getCharacteristic(0xfffb);
    })
    .then(characteristic => {
      console.log('Успех!');
      ledCharacteristic = characteristic;
      setConnected(true);
    })
    .catch(error => {
      console.log('Ошибка подключения. ' + error);
      setConnected(false);
    });
}

function powerOn(setPower) {
  let data = new Uint8Array([0xcc, 0x23, 0x33]);
  return ledCharacteristic
    .writeValue(data)
    .catch(err => console.log('Ошибка включения. ', err))
    .then(() => {
      setPower(true);
    });
}

function powerOff(setPower) {
  let data = new Uint8Array([0xcc, 0x24, 0x33]);
  return ledCharacteristic
    .writeValue(data)
    .catch(err => console.log('Ошибка выключения. ', err))
    .then(() => {
      setPower(false);
    });
}

export function togglePower(power, setPower) {
  if (power) {
    powerOff(setPower);
  } else {
    powerOn(setPower);
  }
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

export function red() {
  return setColor(255, 0, 0).then(() => console.log('Color set to Red'));
}

function green() {
  return setColor(0, 255, 0).then(() => console.log('Color set to Green'));
}

function blue() {
  return setColor(0, 0, 255).then(() => console.log('Color set to Blue'));
}
