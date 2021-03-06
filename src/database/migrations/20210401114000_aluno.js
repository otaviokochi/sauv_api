exports.up = (knex) =>
  knex.schema.createTable("aluno", (table) => {
    table.string("nome").notNullable();
    table.string("rg").notNullable();
    table.string("cpf").primary();
    table.string("email").notNullable();
    table.string("sexo").notNullable();
    table.integer("serie").notNullable();
    table.string("turma").notNullable();
    table.integer("anoTurma").notNullable();
    table.string("nomeResponsavel").notNullable();
    table.string("cpfResponsavel").notNullable();
    table.string("telefoneResponsavel").notNullable();
    table.string("emailResponsavel").notNullable();
    table.string("cep").notNullable();
    table.string("bairro").notNullable();
    table.string("endereco").notNullable();
    table.string("complemento").notNullable();
    table.string('estadoMatricula');

    table.foreign("serie").references("serie").inTable("series");
    table.foreign("turma").references("turma").inTable("turmas");
  });

exports.down = (knex) => knex.schema.dropTable("aluno");
