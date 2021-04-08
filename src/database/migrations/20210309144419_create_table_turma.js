
exports.up = knex => knex.schema.createTable('turmas', table => {
  table.increments('id');
  table.integer('serie').notNullable();
  table.string('nome').notNullable().unique();
  table.string('turma').notNullable();
  table.foreign('serie').references('anoLetivo').inTable('series');
  table.unique(['serie', 'turma']);
});

exports.down = knex => knex.schema.dropTable('turmas');
