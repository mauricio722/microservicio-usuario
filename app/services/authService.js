const authService = module.exports;
const bcrypt = require('bcryptjs');
const authRepository = require('../repositories/authRepository');
const log4j = require('../utils/logger');
const HTTPClient = require('../utils/HTTPClient');

const { MICROSERVICE_URL = 'http://localhost:4001' } = process.env;

const BASE_URL = `${MICROSERVICE_URL}/api/notification-ms/notification`;


const defaultLogger = log4j.getLogger('authService');

authService.getAuthById = async (id, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`authService.getAuthByEmail with ${JSON.stringify(id)}`);

  return authRepository.getAuthByEmail(id);
};

authService.login = async (body, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`authService.login with ${JSON.stringify(body)}`);
  let resp;
  try {
    let [hash] = await authRepository.getUserEmail(body.email, body.id);
    console.log(hash);
    [resp] = await authRepository.getUserEmail(body.email);

    console.log(hash.password);
    console.log(body.password);
    hash = bcrypt.compareSync(body.password, hash.password);
    if (hash) {
      return { id: resp.id, email: resp.email };
    }
    if (resp.email == null) {
      return null;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

authService.create = async (auth, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`authService.create with ${JSON.stringify(auth)}`);

  const hashPassword = async (plaintextPassword) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    return bcrypt.hash(plaintextPassword, salt);
  };

  const {
    email, password, name, lastName, numDocument, cellPhone, address,
  } = auth;


  return authRepository.create({
    email,
    password: await hashPassword(password),
    name,
    lastName,
    numDocument,
    cellPhone,
    address,
  });
};

authService.updateAuthPassword = async (user, email, options = {}) => {
  const { logger = defaultLogger } = options;

  logger.info(`authService.update with ${email}`);
  logger.info(`authService.update with ${JSON.stringify(user)}`);

  let hash = await authRepository.getUserByEmail(email);
  hash = bcrypt.compareSync(user.password, hash.password);
  console.log(email, user, hash);

  if (hash) {
    hash = bcrypt.hashSync(user.newPassword);
    const [res] = await authRepository.changePassword({ password: hash }, email);
    const resUser = {};
    resUser.id = res.id;
    resUser.email = res.email;
  }

  return user;
};

authService.getUserByEmail = async (email, options = {}) => {
  const { logger = defaultLogger } = options;

  logger.info(`authService.getUserByEmail: params ${JSON.stringify(email)}`);

  const res = authRepository.getUserByEmail(email);

  return res;
};

authService.updateAuth = async (id, auth, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`authService.update with ${JSON.stringify(id)}`);
  logger.info(`authService.update with ${JSON.stringify(auth)}`);
  const [user] = await authRepository.updateAuth(id, auth);

  return user;
};


authService.recoverPassword = async (email, body, options) => {
  const { logger = defaultLogger } = options;
  logger.info(`Start authService.recoverPassword: params ${JSON.stringify(email)}`);

  const password = Math.random().toString(36).substring(2);


  const { dataBody } = body;
  HTTPClient.post(`${BASE_URL}/${email}`, { dataBody, password });
  const hash = bcrypt.hashSync(password);
  console.log({ password, hash });


  return authRepository.recoverPassword(email, hash);
};
