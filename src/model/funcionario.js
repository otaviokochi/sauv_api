const knex = require("../database/db");

class Funcionario {
  constructor(funcionario) {
    this.primNome = funcionario.primNome;
    this.sobrenome = funcionario.sobrenome;
    this.genero = funcionario.genero;
    this.cpf = funcionario.cpf;
    this.rg = funcionario.rg;
    this.email = funcionario.email;
    this.email = funcionario.email;
    this.telefone = funcionario.telefone;
    this.logradouro = funcionario.logradouro;
    this.pais = funcionario.pais;
    this.estado = funcionario.pais;
    this.cidade = funcionario.cidade;
  }
  static read(resultado) {
    knex("funcionario")
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }
  static getByName(nome, resultado) {
    knex("funcionario")
      .where("nome", "like", `%${nome}%`)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }
  static findByCPF(cpf, resultado) {
    knex("funcionario")
      .where("cpf", cpf)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }
  static create(funcionario, resultado) {
    knex("funcionario")
      .insert(funcionario)
      .then((response) => resultado(null, { id: response[0], ...funcionario }))
      .catch((err) => resultado(err, null));
  }
  static update(cpf, funcionario, resultado) {
    knex("funcionario")
      .where("cpf", cpf)
      .update(funcionario)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }
  static remove(cpf, resultado) {
    knex("funcionario")
      .where("cpf", cpf)
      .del()
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }
}

module.exports = Funcionario;