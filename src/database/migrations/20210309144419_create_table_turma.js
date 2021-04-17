
exports.up = knex => knex.schema.createTable('turmas', table => {
  table.increments('id');
  table.integer('serie').notNullable();
  table.string('nome').notNullable();
  table.string('turma').notNullable();
  //ano tipo 2020
  table.integer('ano').notNullable();
  table.foreign('serie').references('anoLetivo').inTable('series');
  table.unique(['nome', 'ano']);
});

exports.down = knex => knex.schema.dropTable('turmas');
