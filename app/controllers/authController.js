const authController = module.exports;
const authService = require('../services/authService');
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const log4j = require('../utils/logger');
const LogUtils = require('../utils/LogUtils');
const authSchema = require('../validators/authSchema');
const passSchema = require('../validators/passSchema');
const UpdateSchema = require('../validators/UpdateSchema');

const validator = require('../validators/Validator');

authController.getAuthByCode = async (req, res, next) => {
  const { params } = req;
  const logName = 'Get Auth By Id:';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  logger.info(`Start authController.getAuthById params: ${JSON.stringify(params)}`);

  return authService.getAuthById(params.id, { logger, logName })
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};
authController.create = async (req, res, next) => {
  const logName = 'CreateAuth: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  logger.info(`Starts authController.create: params ${JSON.stringify(body)}`);
  try {
    validator(authSchema).validateRequest(body);

    return authService.create(body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};
authController.login = async (req, res, next) => {
  const { body } = req;
  const logName = 'login';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  logger.info(`Start authController.login body: ${JSON.stringify(body)}`);

  return authService.login(body, { logger, logName })
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

authController.updateAuthPassword = async (req, res, next) => {
  const logName = 'UpdateAuth: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  const { email } = req.params;

  logger.info(`Starts authController.updateAuthPassword: params ${JSON.stringify(email)}`);
  try {
    validator(passSchema).validateRequest(body);

    return authService.updateAuthPassword(body, email, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};


authController.getUserByEmail = async (req, res, next) => {
  const logName = 'get user by email';
  const { email } = req.params;
  const logger = LogUtils.getLoggerWithId(log4j, logName);

  logger.info(`Start UserControlle.getUserByEmail: params ${JSON.stringify(email)}`);
  console.log(email);
  try {
    return authService.getUserByEmail(email, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.messsage)));
  } catch (error) {
    return next(error);
  }
};

authController.updateAuth = async (req, res, next) => {
  const logName = 'UpdateAuth: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  const { params } = req;
  logger.info(`Starts authController.updateAuth: params ${JSON.stringify(params.id)}`);

  try {
    validator(UpdateSchema).validateRequest(body);

    return authService.updateAuth(params.id, body)
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};

authController.recoverPassword = async (req, res, next) => {
  const logName = 'Send email user: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { email } = req.params;
  const { body } = req;
  logger.info(`Start authController.recoverPassword: params ${JSON.stringify(email)}`);


  return authService.recoverPassword(email, body, { logger, logName })
    .then((response) => res.send({ response }))
    .catch((error) => next(new BaseError(error.message)));
};
