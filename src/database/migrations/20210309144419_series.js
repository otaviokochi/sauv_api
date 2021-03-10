
exports.up = knex => knex.schema.createTable('series', table => {
  table.integer('anoLetivo').notNullable();
  table.json('disciplinas').notNullable();
  table.primary('anoLetivo');
});

exports.down = knex => knex.schema.dropTable('series');
