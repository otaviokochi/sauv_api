exports.up = (knex) =>
  knex.schema
    .createTable("professores", (table) => {
      table.increments("id").primary();
      table.string("nome").notNullable();
      table.string("cpf").notNullable();
      table.string("rg").notNullable();
      table.string("email").notNullable();
      table.string("telefone").notNullable();
      table.string("formacao").notNullable();
      table.string("cep").notNullable();
      table.string("bairro").notNullable();
      table.string("endereco").notNullable();
      table.string("complemento").notNullable();
    })
    .createTable("relation-professor-disciplina", (table) => {
      table.increments("id").primary();
      table.integer("professor_id").unsigned();
      table.integer("disciplina_id").unsigned();
      table.foreign("professor_id").references("id").inTable("professores");
      table.foreign("disciplina_id").references("id").inTable("disciplinas");
    });

exports.down = (knex) =>
  knex.schema
    .dropTable("professores")
    .dropTable("relation-professor-disciplina");
