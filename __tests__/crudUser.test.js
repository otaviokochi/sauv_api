// REMOVER AUTENTICACAO DAS ROTAS PARA RODA O TESTE.

process.env.NODE_ENV = "test"
const knex = require("../src/database/db");
const request = require("supertest");
const app = require('../src/app.js');
const bcrypt = require('bcrypt');
const { ROLE } = require("../src/utils/enum");

beforeAll(async () => 
  await knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('username').notNullable().unique();
    table.string('tipo').notNullable();
    table.string('senha').notNullable();
  })
)

beforeEach(async () => 
  await knex('users').del()
  .then(function () {
    // Inserts seed entries
    return knex('users').insert([
      {id: 1, username: 'otavio', tipo:  ROLE.funcionario, senha: '$2b$10$/MhzQMtuQBlVR9ENJzMP7OpLpPUV.4f9UW74AbMri.xKkDTJg148C' },
      {id: 2, username: 'gustavo', tipo: ROLE.professor, senha: '$2b$10$K7I6cXpxHGe7rUoopfvmIu7DuaT.TFGVNOJQdSfE5MPpyqjrTsZX6' },
      {id: 3, username: 'thiago', tipo:  ROLE.coordenador, senha: '$2b$10$t9Ep64QiW/ezsVAGP/90u.M9B.hszm1x.HHSlcoMMWGTghQ7ps4MS' },
    ]);
  })
)

afterAll(async () => 
  await knex.schema.dropTable('users')
)


describe('Users endpoints', () => {
  it('Criar usuário com sucesso!', async () => {
    const newUser = await request(app).post("/users").send({
      id: 4,
      username: 'Teste 1',
      tipo: ROLE.professor,
      senha: 'professor'
    })

    expect(newUser.body.message).toBe("Usuário criado com sucesso!");
    expect(newUser.statusCode).toBe(200);
  })

  it('Criar usuário com dados faltando!', async () => {
    const password = await bcrypt.hash('professor', 10);
    const newUser = await request(app).post("/users").send({
      id: 4,
      tipo: 'professor',
      senha: password
    })

    expect(newUser.body.message).toBe('Dados do usuário faltando');
    expect(newUser.statusCode).toBe(400);
  })

  it('Criar usuário com dados faltando!', async () => {
    const password = await bcrypt.hash('professor', 10);
    const newUser = await request(app).post("/users").send({
      id: 4,
      username: 'Teste 1',
      tipo: ROLE.professor
    })
    expect(newUser.body.message).toBe('Senha muito pequena!');
    expect(newUser.statusCode).toBe(400);
  })

  it('Busca usuário de username otavio', async () => {
    const user = await request(app).get("/users/otavio")
    expect(user.body.username).toBe('otavio');
    expect(user.body.tipo).toBe(ROLE.funcionario);
    expect(user.body.id).toBe(1);
    expect(user.statusCode).toBe(200);
  })

  it('Busca usuário que não esta no banco', async () => {
    const user = await request(app).get("/users/naoTaAqui")
    expect(user.body).toEqual({});
    expect(user.statusCode).toBe(200);
  })

  it('Deleta usuário otavio', async () => {
    const delUser = await request(app).delete("/users/otavio")
    expect(delUser.body.message).toBe('Usuário de username otavio deletado com sucesso!')
    expect(delUser.statusCode).toBe(200);
  })

  it('Deleta usuário que não esta no banco', async () => {
    const delUser = await request(app).delete("/users/naoTaAqui")
    expect(delUser.body.message).toBe('Usuário de username naoTaAqui não encotrando!')
    expect(delUser.statusCode).toBe(400);
  })

  it('Atualiza usuário otavio', async () => {
    const updateUser = await request(app).put("/users/otavio").send({
      username: 'otaviokochi',
      senha: 'otaviokochi',
      tipo: ROLE.professor
    })
    console.log(updateUser.body);
    expect(updateUser.body.message).toBe('Usuário de username otavio atualizada com sucesso!');
    expect(updateUser.statusCode).toBe(200);
  })

  it('Atualiza usuário otavio com dados faltando', async () => {
    const updateUser = await request(app).put("/users/otavio").send({
      username: 'otaviokochi',
      tipo: ROLE.professor
    })
    expect(updateUser.body.message).toBe('Dados do usuário faltando');
    expect(updateUser.statusCode).toBe(400);
  })

  it('Atualiza usuário que não esta no banco', async () => {
    const updateUser = await request(app).put("/users/naoTaAqui").send({
      username: 'ricardo',
      senha: 'ricardo',
      tipo: ROLE.professor
    })
    expect(updateUser.body.message).toBe('Usuário de username naoTaAqui não encontrado!');
    expect(updateUser.statusCode).toBe(400);
  })
  
})