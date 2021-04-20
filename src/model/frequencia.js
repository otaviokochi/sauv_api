const knex = require("../database/db");

class Frequencias {
  constructor(dados) {
    this.dia_frequencia = dados.dia_frequencia;
    this.faltas = dados.faltas;
    this.cpf_aluno = dados.cpf_aluno;
    this.turma_id = dados.turma_id;
  }

  static getById(id, resultado) {
    knex("frequencia-aluno")
      .where("id", id)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }

  static getByCPF(cpf, resultado) {
    knex("frequencia-aluno")
      .where("cpf_aluno", cpf)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }

  static create(frequencias) {
    return new Promise((resolve, reject) => {
      knex("frequencia-aluno")
        .insert(frequencias)
        .then((response) => resolve({ id: response[0], ...frequencias }))
        .catch((err) => reject(err));
    });
  }

  static update(id, frequencias) {
    return new Promise((resolve, reject) => {
        knex("frequencia-aluno")
          .where("id", id)
          .update(frequencias)
          .then((response) => resolve({ id: response[0], ...frequencias }))
          .catch((err) => reject(err));
    });
  }
}

module.exports = Frequencias