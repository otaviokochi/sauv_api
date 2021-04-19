 exports.up = knex => knex.schema.createTable('series', table => {
  table.increments('id');
  table.integer('serie').notNullable().unique();
  table.json('disciplinas').notNullable();
});

exports.down = knex => knex.schema.dropTable('series');
