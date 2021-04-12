
exports.up = knex  => knex.schema.createTable('users', table => {
  table.increments('id');
  table.string('username').notNullable().unique();
  table.string('tipo').notNullable();
  table.string('senha').notNullable();
});

exports.down = knex => knex.schema.dropTable('users');
