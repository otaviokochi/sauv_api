
exports.up = knex  => knex.schema.createTable('users', table => {
  table.increments('id');
  table.string('username').notNullable().unique();
  table.string('type').notNullable();
  table.string('password').notNullable();
});

exports.down = knex => knex.schema.dropTable('users');
