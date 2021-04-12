
exports.up = knex => knex.schema.createTable('relation-professor-disciplina', table => {
  table.increments('id').primary();
  table.integer('professor_id');
  table.integer('disciplina_id');
}).createTable('professores', table => {
  table.increments('id').primary();
  table.string('nome').notNullable();
  table.string('cpf').notNullable();
  table.string('rg').notNullable();
  table.string('email').notNullable();
  table.string('telefone').notNullable();
  table.string('formacao').notNullable();
  table.string('cep').notNullable();
  table.string('bairro').notNullable();
  table.string('endereco').notNullable();
  table.string('complemento').notNullable();
  table.integer('disciplina_id').unsigned().references('relation-professor-disciplina.id');
});;

exports.down = knex => knex.schema.dropTable('professores').dropTable('relation-professor-disciplina');
