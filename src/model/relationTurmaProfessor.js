const knex = require('../database/db');

const RelationTurmaProfessor = function (relation) {
  this.idProfessor = relation.idProfessor;
  this.nomeProfessor = relation.nomeProfessor;
  this.disciplina = relation.disciplina;
  this.nomeTurma = relation.nomeTurma;
  this.serieTurma = relation.serieTurma;
  this.ano = relation.ano;
}

RelationTurmaProfessor.read = async () =>
  knex('relation_turma_professor')

RelationTurmaProfessor.findByIdTurma = async ({serieTurma, turma, ano}) =>
  knex('relation_turma_professor')
    .where({
      serieTurma,
      turma,
      ano
    })

RelationTurmaProfessor.create = async relation =>
  knex('relation_turma_professor')
    .insert(relation)

RelationTurmaProfessor.update = async (id, relation) =>
  knex('relation_turma_professor').where('id', id)
    .update(relation)

RelationTurmaProfessor.remove = async id =>
  knex('relation_turma_professor')
    .where('id', id)
    .del()

RelationTurmaProfessor.removeByIdTurma = async idTurma =>
  knex('relation_turma_professor')
    .where('idTurma', idTurma)
    .del()

module.exports = RelationTurmaProfessor;
