const express = require('express')
const next = require('next')
const http = require('http')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const bodyParser = require('body-parser')
const logger = require('morgan')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const morganMode = dev ? 'dev' : 'common'

const controller = require('./controller')

app.prepare()
  .then(() => {
    const server = express();

    server.set('port', process.env.PORT || 8090);
    server.use(cookieParser());
    server.use(compression());
    server.use(logger(morganMode));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    // :TODO use redis to save sessions
    server.use((req, res, next) => {
      if (dev) req.app = app;
      next();
    });

    server.get('*', controller.handleNormalRequest);

    server.listen(server.get('port'), (err) => {
      if (err) throw err;
      console.log('|> !!!Server is running on http://localhost:%s', server.get('port'));
    });
  })
  .catch((ex) => {
    console.log(ex.stack);
    process.exit(1);
  });