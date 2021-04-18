
exports.up = knex => knex.schema.createTable('relation_turma_professor', table => {
  table.increments('id');
  table.integer('idProfessor').notNullable().unsigned();
  table.string('disciplina').notNullable();
  table.string('nomeProfessor').notNullable();
  table.integer('idTurma').unsigned().notNullable();
  table.string('turma').notNullable();
  table.string('nomeTurma').notNullable();
  table.integer('serieTurma').notNullable();
  table.integer('ano').notNullable();
  table.foreign('idProfessor').references('id').inTable('professores');
  table.foreign('idTurma').references('id').inTable('turmas');
});

exports.down = knex => knex.schema.dropTable('relation_turma_professor');
