exports.up = (knex) =>
  knex.schema.createTable("notas", (table) => {
    table.increments("id").primary();
    table.float("nota1b");
    table.float("nota2b");
    table.float("nota3b");
    table.float("nota4b");
    table.string("cpfAluno").notNullable();
    table.integer("turmaId").notNullable();
    table.integer("disciplinaId").notNullable();

    table.foreign("cpfAluno").references("cpf").inTable("aluno");
    table.foreign("turmaId").references("id").inTable("turmas");
    table.foreign("disciplinaId").references("id").inTable("disciplinas");
    table.unique(["cpfAluno", "disciplinaId", "turmaId"]);
  });

exports.down = (knex) => knex.schema.dropTable("notas");