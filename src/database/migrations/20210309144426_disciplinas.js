
exports.up = knex => knex.schema.createTable('disciplinas', table => {
  table.increments('id');
  table.string('nomeDisciplina').notNullable().unique();
  table.integer('cargaHoraria').notNullable();
  table.string('professor');
});

exports.down = knex => knex.schema.dropTable('disciplinas');
