const Bundler = require('parcel-bundler');
const helmet = require('helmet');
const app = require('express')();

const file = 'src/index.html';
const options = {
  watch: true,
};

const bundler = new Bundler(file, options);

app.use(helmet());
app.use(
  helmet.frameguard({
    action: 'allow-from',
    domain: 'http://localhost:3001/',
  }),
);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: ["'self'", 'fonts.gstatic.com'],
      styleSrc: ["'self'", 'fonts.googleapis.com', "'unsafe-inline'"],
      sandbox: ['allow-forms', 'allow-scripts'],
      connectSrc: ["'self'", 'albertmolodec.github.io'],
    },
  }),
);

app.use(bundler.middleware());

app.listen(Number(process.env.PORT || 3000));
