const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const log4js = require('log4js');
const routes = require('./app/routes/authRoutes');
const ErrorHandlerMiddleware = require('./app/utils/ErrorHandlerMiddleware');
const { PREFIX } = require('./app/config/AppConfig');

const app = express();

const { PORT = 3002 } = process.env;

const logger = log4js.getLogger('user-ms');
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.set('port', PORT);

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  logger.error(reason.stack);
});

app.use(PREFIX, routes);
app.use(ErrorHandlerMiddleware.MainHandler);

app.listen(PORT, () => {
  console.log('listening on port:', PORT);
});

module.exports = app;
