exports.up = (knex) =>
  knex.schema.createTable("aluno", (table) => {
    table.string("nome").notNullable();
    table.string("rg").notNullable();
    table.string("cpf").notNullable();
    table.string("email").notNullable();
    table.string("sexo").notNullable();
    table.string("serie").notNullable();
    table.string("turma").notNullable();
    table.string("nomeResponsavel").notNullable();
    table.string("cpfResponsavel").notNullable();
    table.string("telefoneResponsavel").notNullable();
    table.string("emailResponsavel").notNullable();
    table.string("cep").notNullable();
    table.string("bairro").notNullable();
    table.string("endereco").notNullable();
    table.string("complemento").notNullable();

    table.primary("cpf");

    table.foreign("serie").references("anoLetivo").inTable("series");
    table.foreign("turma").references("id").inTable("turma");
  });

exports.down = (knex) => knex.schema.dropTable("aluno");
