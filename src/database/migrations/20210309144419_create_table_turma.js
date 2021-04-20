exports.up = knex => knex.schema.createTable('turmas', table => {
  table.increments('id');
  table.integer('serie').notNullable();
  table.string('nome').notNullable();
  table.string('turma').notNullable();
  table.integer('ano').notNullable();
  table.foreign('serie').references('serie').inTable('series');
  table.unique(['serie', 'turma', 'ano']);
});

exports.down = knex => knex.schema.dropTable('turmas');
