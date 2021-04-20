// REMOVER AUTENTICACAO DAS ROTAS PARA RODA O TESTE.

process.env.NODE_ENV = "test"
const knex = require("../src/database/db");
const request = require("supertest");
const app = require('../src/app.js');

beforeAll(async () => 
  await knex.schema.createTable("notas", (table) => {
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
  })
)

beforeEach(async () => 
  await knex('notas').del()
  .then(function () {
    // Inserts seed entries
    return knex('notas').insert([
      {
        "nota1b":9,
        "nota2b":10,
        "nota3b":1,
        "nota4b":3,
        "cpfAluno":"1",
        "turmaId":1,
        "disciplinaId":1
      },
      {
        "nota1b":9,
        "nota2b":10,
        "nota3b":1,
        "nota4b":3,
        "cpfAluno":"2",
        "turmaId":1,
        "disciplinaId":1
      },
      {
        "nota1b":9,
        "nota2b":10,
        "nota3b":1,
        "nota4b":3,
        "cpfAluno":"3",
        "turmaId":1,
        "disciplinaId":1
      }]);
  })
)

afterAll(async () => 
  await knex.schema.dropTable('notas')
)


describe('Error! without table Aluno, Turma and Disciplina   ', () => {
  it('Error POST', async () => {
    const newUser = await request(app).post("/notas").send({
      "nota1b":9,
      "nota2b":10,
      "nota3b":1,
      "nota4b":3,
      "cpfAluno":"1",
      "turmaId":1,
      "disciplinaId":1
    })
    expect(newUser.statusCode).toBe(401);
  })

  it('Error UPDATE', async () => {
    const newUser = await request(app).patch("/notas").send({
      "nota1b":9,
      "nota2b":10,
      "nota3b":1,
      "nota4b":3,
      "cpfAluno":"1",
      "turmaId":1,
      "disciplinaId":1
    })
    expect(newUser.statusCode).toBe(401);
  })

  it('Error GET', async () => {
    const newUser = await request(app).get("/notas")
    expect(newUser.statusCode).toBe(401);
  })
  
})