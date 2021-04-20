const knex = require("../database/db");

class Notas {
  constructor(dados) {
    if (dados.nota1b) this.nota1b = dados.nota1b;
    else this.nota1b = 0;
    if (dados.nota2b) this.nota2b = dados.nota2b;
    else this.nota2b = 0;
    if (dados.nota3b) this.nota3b = dados.nota3b;
    else this.nota3b = 0;
    if (dados.nota4b) this.nota4b = dados.nota4b;
    else this.nota4b = 0;
    this.cpfAluno = dados.cpfAluno;
    this.turmaId = dados.turmaId;
    this.disciplinaId = dados.disciplinaId;
  }

  static getAll(turmaId, disciplinaId, resultado) {
    knex("notas")
      .join("aluno", "notas.cpfAluno", "=", "aluno.cpf")
      .join("disciplinas", "notas.disciplinaId", "=", "disciplinas.id")
      .select(
        "aluno.nome",
        "disciplinas.id",
        "disciplinas.nomeDisciplina",
        "notas.nota1b",
        "notas.nota2b",
        "notas.nota3b",
        "notas.nota4b"
      )
      .where("notas.turmaId", turmaId)
      .andWhere("notas.disciplinaId", disciplinaId)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }

  static getById(id, resultado) {
    knex("notas")
      .where("id", id)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }

  static getByCPF(cpfAluno, turmaId, disciplinaId, resultado) {
    knex("notas")
      .where("cpfAluno", cpfAluno)
      .andWhere("turmaId", turmaId)
      .andWhere("disciplinaId", disciplinaId)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }

  static create(notas) {
    return new Promise((resolve, reject) => {
      knex("notas")
        .insert(notas)
        .then((response) => resolve({ id: response[0], ...notas }))
        .catch((err) => reject(err));
    });
  }

  static nota1(id, nota) {
    return new Promise((resolve, reject) => {
      knex("Notas")
        .where("id", id)
        .update({ nota1b: nota })
        .then((response) => resolve({ id: response[0], ...nota }))
        .catch((err) => reject(err));
    });
  }

  static nota2(id, nota) {
    return new Promise((resolve, reject) => {
      knex("Notas")
        .where("id", id)
        .update({ nota2b: nota })
        .then((response) => resolve({ id: response[0], ...nota }))
        .catch((err) => reject(err));
    });
  }

  static nota3(id, nota) {
    return new Promise((resolve, reject) => {
      knex("Notas")
        .where("id", id)
        .update({ nota3b: nota })
        .then((response) => resolve({ id: response[0], ...nota }))
        .catch((err) => reject(err));
    });
  }

  static nota4(id, nota) {
    return new Promise((resolve, reject) => {
      knex("Notas")
        .where("id", id)
        .update({ nota4b: nota })
        .then((response) => resolve({ id: response[0], ...nota }))
        .catch((err) => reject(err));
    });
  }
}
module.exports = Notas;
