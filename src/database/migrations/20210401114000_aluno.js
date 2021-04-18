exports.up = (knex) =>
  knex.schema.createTable("aluno", (table) => {
    table.increments("id");
    table.string("nome").notNullable();
    table.string("rg").notNullable();
    table.string("cpf").notNullable().unique();
    table.string("email").notNullable();
    table.string("sexo").notNullable();
    table.integer("serie").notNullable();
    table.integer("turma").notNullable();
    table.integer("ano").notNullable();
    table.string("nomeResponsavel").notNullable();
    table.string("cpfResponsavel").notNullable();
    table.string("telefoneResponsavel").notNullable();
    table.string("emailResponsavel").notNullable();
    table.string("cep").notNullable();
    table.string("bairro").notNullable();
    table.string("endereco").notNullable();
    table.string("complemento").notNullable();
    table.string('estadoMatricula');

    table.foreign("serie").references("id").inTable("series");
    table.foreign("turma").references("id").inTable("turmas");
  });

exports.down = (knex) => knex.schema.dropTable("aluno");
