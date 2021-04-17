
exports.up = knex => knex.schema.createTable('disciplinas', table => {
  table.increments('id').primary();
  table.string('nomeDisciplina').notNullable().unique();
  table.integer('cargaHoraria').notNullable();
});

exports.down = knex => knex.schema.dropTable('disciplinas');
