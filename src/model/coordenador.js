const knex = require("../database/db");

class Coordenador {
  constructor(coordenador) {
    this.primNome = coordenador.primNome;
    this.sobrenome = coordenador.sobrenome;
    this.genero = coordenador.genero;
    this.cpf = coordenador.cpf;
    this.rg = coordenador.rg;
    this.email = coordenador.email;
    this.email = coordenador.email;
    this.telefone = coordenador.telefone;
    this.logradouro = coordenador.logradouro;
    this.pais = coordenador.pais;
    this.estado = coordenador.pais;
    this.cidade = coordenador.cidade;
  }
  static read(resultado) {
    knex("coordenador")
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }
  static getByName(nome, resultado) {
    knex("coordenador")
      .where("nome", "like", `%${nome}%`)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }
  static findByCPF(cpf, resultado) {
    knex("coordenador")
      .where("cpf", cpf)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }
  static create(coordenador) {
    return new Promise((resolve, reject) => {
      knex("coordenador")
      .insert(coordenador)
      .then((response) => resolve({ id: response[0], ...coordenador }))
      .catch((err) => reject(err));
    });
  }
  static update(cpf, coordenador, resultado) {
    knex("coordenador")
      .where("cpf", cpf)
      .update(coordenador)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }
  static remove(cpf, resultado) {
    knex("coordenador")
      .where("cpf", cpf)
      .del()
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }
}

module.exports = Coordenador;
