const { response } = require("express");
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
    this.ano = aluno.ano;
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
    const response = await knex("aluno").where("cpf", cpf);
    return response;
  }
  static create(aluno, resultado) {
    knex("aluno")
      .insert(aluno)
      .then((response) => resultado(null, { id: response[0], ...aluno }))
      .catch((err) => resultado(err, null));
  }
  static update(id, aluno, resultado) {
    knex("aluno")
      .where("id", id)
      .update(aluno)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }
  static remove(id, resultado) {
    knex("aluno")
      .where("id", id)
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
