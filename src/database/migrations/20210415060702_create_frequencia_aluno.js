exports.up = (knex) =>
  knex.schema.createTable("frequencia-aluno", (table) => {
    table.increments("id").primary();
    table.date("dia_frequencia").notNullable();
    table.integer("faltas").notNullable();
    table.string("cpf_aluno").notNullable();
    table.integer("turma_id").notNullable().unsigned();
    table.foreign("cpf_aluno").references("cpf").inTable("aluno");
    table.foreign("turma_id").references("id").inTable("turmas");

    table.unique(["cpf_aluno","dia_frequencia","turma_id"]);
  });

exports.down = (knex) => knex.schema.dropTable("frequencia-aluno");
