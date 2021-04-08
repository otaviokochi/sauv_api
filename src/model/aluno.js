const { response } = require("express");
const knex = require("../database/db");

class Aluno {
  constructor(aluno) {
    this.nome = aluno.nome;
    this.cpf = aluno.cpf;
    this.rg = aluno.rg;
    this.email = aluno.email;
    this.sexo = aluno.sexo;
    this.serie = aluno.serie;
    this.turma = aluno.turma;
    this.nomeResponsavel = aluno.nomeResponsavel;
    this.cpfResponsavel = aluno.cpfResponsavel;
    this.telefoneResponsavel = aluno.telefoneResponsavel;
    this.emailResponsavel = aluno.emailResponsavel;
    this.cep = aluno.cep;
    this.bairro = aluno.bairro;
    this.endereco = aluno.endereco;
    this.complemento = aluno.complemento;
    this.estadoMatricula = "matriculado";
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
  static findByCPF(cpf, resultado) {
    knex("aluno")
      .where("cpf", cpf)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }
  static create(aluno, resultado) {
    knex("aluno")
      .insert(aluno)
      .then((response) => resultado(null, { id: response[0], ...aluno }))
      .catch((err) => resultado(err, null));
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
    aluno.estadoMatricula = "trancada";
    knex("aluno")
      .where("cpf", cpf)
      .update(aluno)
      .then((response) => resultado(null, response))
      .catch((err) => resultado(err, null));
  }
}

module.exports = Aluno;