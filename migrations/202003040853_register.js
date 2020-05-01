exports.up = (knex) => knex.schema.createTable('register', (t) => {
  t.increments('id').unsigned().primary();
  t.string('email').notNull();
  t.string('password').notNull();
  t.string('emailAlternate').notNull();
  t.string('name').notNull();
  t.string('lastName').nullable();
  t.string('numDocument').nullable();
  t.string('cellPhone').notNull();
  t.string('address').notNull();
});

exports.down = (knex) => knex.schema.dropTable('register');
