
exports.up = knex => knex.schema.createTableIfNotExists('professores', table => {
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
  table.string('disciplinas').notNullable();
});

exports.down = knex => knex.schema.dropTable('professores');
