const connection = require('../../knexfile')
const { create, read } = require('./alunoController')

module.exports = {
  async create(request, response) {
    const {
      nome,
      cpf,
      rg,
      email,
      telefone,
      formacao,
      disciplinas,
      cep,
      bairro,
      endereco,
      complemento
    } = request.body

    await connection("professor").insert({
      nome,
      cpf,
      rg,
      email,
      telefone,
      formacao,
      disciplinas,
      cep,
      bairro,
      endereco,
      complemento
    })

    return response.json(200)
  },

  async read(request, response) {
    const [count] = await connection("professor").count();

    const professores = await connection("professor".select("*"))

    response.header("X-Total-Count", count["count(*)"])

    return response.json(professores)
  },

  async update(request, response) {
    const {
      nome,
      cpf,
      rg,
      email,
      telefone,
      formacao,
      disciplinas,
      cep,
      bairro,
      endereco,
      complemento
    } = request.body

    await connection("professor").update({
      nome,
      cpf,
      rg,
      email,
      telefone,
      formacao,
      disciplinas,
      cep,
      bairro,
      endereco,
      complemento
    })


    return response.sendStatus(200)
  },

  async delete(request, response) {
    const { cpf } = request.body;

    await connection("professor").delete(cpf);

    return response.sendStatus(200);
  },
}
