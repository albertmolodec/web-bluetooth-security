'strict mode';

const http = require('http');
const path = require('path');

const rect = require('./src/models/bulb');

rect(2, 73, (err, rectangle) => {
  if (err) console.log('Че-то тут не так, братишка.', err.message);
  else {
    console.log('Площадь = ' + rectangle.area());
    console.log('Периметр = ' + rectangle.perimeter());
  }

  console.log(http);
  console.log(path);
});
