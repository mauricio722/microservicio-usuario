const Helpers = module.exports;
const db = require('../app/utils/DB');

Helpers.db = db;

Helpers.migrate = () => db.migrate.latest();

Helpers.clear = async () => {
  await db('register').del();
};
Helpers.insertAuth = async (data) => db('register').insert(data);

Helpers.updateAuth = async (data, id) => db('register')
  .where('id', id).update(data).returning('*');
