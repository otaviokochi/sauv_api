exports.up = knex => knex.schema.createTable('funcionario', table => {
    table.string('primNome').notNullable();
    table.string('sobrenome').notNullable();
    table.string('genero').notNullable();
    table.string('cpf').primary();
    table.string('rg').notNullable();
    table.string('email').notNullable();
    table.string('telefone').notNullable();
    table.string('logradouro').notNullable();
    table.string('pais').notNullable();
    table.string('estado').notNullable();
    table.string('cidade').notNullable();
});

exports.down = knex => knex.schema.dropTable('funcionario');