const authRepository = module.exports;
const DB = require('../utils/DB');

authRepository.count = async (id) => DB('register').count('*').where('id', id).first();

authRepository.getAuthByEmail = async (id) => DB('register').select('*').where('id', id);

authRepository.create = (auth) => DB('register').insert(auth).returning('*');

authRepository.getAuthByEmail = async (id) => DB('register').select('*').where('id', id);

authRepository.getUserEmail = async (email) => DB('register').select('*').where('email', email);

authRepository.changePassword = async (user, email) => DB('register').where({ email }).update(user).returning('*');

authRepository.getUserByEmail = async (email) => DB('register').where({ email }).select('*').first();


authRepository.updateAuth = async (id, Auth) => DB('register').where('id', '=', id).update(Auth).returning('*');

authRepository.recoverPassword = async (email, password) => DB('register').where({ email }).update({ password }).returning('*');
