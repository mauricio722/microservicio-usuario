exports.up = (knex) => knex.schema.alterTable('register', (t) => {
  t.dropColumn('emailAlternate');
});

exports.down = (knex) => knex.schema.dropTable('register');
