// REMOVER AUTENTICACAO DAS ROTAS PARA RODA O TESTE.

process.env.NODE_ENV = "test";
const knex = require("../src/database/db");
const request = require("supertest");
const app = require("../src/app.js");
const bcrypt = require("bcrypt");

beforeAll(
  async () =>
    await knex.schema.createTable("aluno", (table) => {
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
      table.string("estadoMatricula");
    })
);

afterAll(async () => await knex.schema.dropTable("aluno"));

describe("Aluno endpoints", () => {
  it("Criar aluno com sucesso!", async () => {
    const newAluno = await request(app).post("/aluno").send({
      nome: "Henrique",
      rg: "134090693",
      cpf: "10476744911",
      email: "sim",
      sexo: "0",
      serie: 1,
      turma: "A",
      anoTurma: 2020,
      nomeResponsavel: "Pai",
      cpfResponsavel: "12345678911",
      telefoneResponsavel: "123",
      emailResponsavel: "kkkkk",
      cep: "123",
      bairro: "sim",
      endereco: "Não",
      complemento: "kkk",
      estadoMatricula: "MATRICULADO",
    });

    expect(newAluno.statusCode).toBe(500);
  });

  it("Criar aluno com dados faltando!", async () => {
    const newAluno = await request(app).post("/aluno").send({
      nome: "Henrique",
      email: "sim",
      sexo: "0",
      serie: 1,
      turma: "A",
      anoTurma: 2020,
      nomeResponsavel: "Pai",
      cpfResponsavel: "12345678911",
      telefoneResponsavel: "123",
      emailResponsavel: "kkkkk",
      cep: "123",
      bairro: "sim",
      endereco: "Não",
      complemento: "kkk",
      estadoMatricula: "MATRICULADO",
    });

    expect(newAluno.statusCode).toBe(500);
  });
});
