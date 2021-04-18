const knex = require("../database/db");

const estadoMatriculaEnum = {
  matriculado: "MATRICULADO",
  matricula_vencida: "MATRICULA_VENCIDA",
  inativo: "INATIVO",
  trancada: "TRANCADA"
};

class Aluno {
  constructor(aluno) {
    this.nome = aluno.nome;
    this.cpf = aluno.cpf;
    this.rg = aluno.rg;
    this.email = aluno.email;
    this.sexo = aluno.sexo;
    this.serie = aluno.serie;
    this.turma = aluno.turma;
    this.anoTurma = aluno.anoTurma;
    this.nomeResponsavel = aluno.nomeResponsavel;
    this.cpfResponsavel = aluno.cpfResponsavel;
    this.telefoneResponsavel = aluno.telefoneResponsavel;
    this.emailResponsavel = aluno.emailResponsavel;
    this.cep = aluno.cep;
    this.bairro = aluno.bairro;
    this.endereco = aluno.endereco;
    this.complemento = aluno.complemento;
    this.estadoMatricula = estadoMatriculaEnum.matriculado;
  }
  static read(resultado) {
    knex("aluno")
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }
  static getByName(nome, resultado) {
    knex("aluno")
      .where("nome", "like", `%${nome}%`)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }

  static async findByCPF(cpf, resultado) {
    knex("aluno")
      .where("cpf", cpf)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }

  static async getQtddAlunosTurma({serie, turma, anoTurma}) {
    return knex("aluno")
      .where({
        serie,
        turma,
        anoTurma
      }).count('cpf as quantidadeAlunos')
  }

  static async alunosTurma({serie, turma, anoTurma}) {
    return knex("aluno")
      .where({
        serie,
        turma,
        anoTurma
      }).select('nome as nomeAluno', 'cpf as cpfAluno', 'nomeResponsavel', 'cep')
  }

  static create(aluno) {
    return new Promise((resolve, reject) => {
      knex("aluno")
        .insert(aluno)
        .then((response) => resolve({ id: response[0], ...aluno }))
        .catch((err) => reject(err));
    })
  }

  static update(cpf, aluno, resultado) {
    knex("aluno")
      .where("cpf", cpf)
      .update(aluno)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }
  static remove(cpf, resultado) {
    knex("aluno")
      .where("cpf", cpf)
      .del()
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }

  static trancar(cpf, aluno, resultado) {
    aluno.estadoMatricula = estadoMatriculaEnum.trancada;
    knex("aluno")
      .where("cpf", cpf)
      .update(aluno)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }
}

module.exports = Aluno;
