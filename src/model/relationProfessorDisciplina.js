const knex = require('../database/db');

const RelationProfessorDisciplina = function (relation) {
  this.professorId = relation.professorId;
  this.disciplinaId = relation.disciplinaId;
}

RelationProfessorDisciplina.read = resultado => {
  knex('relation-professor-disciplina')
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}


RelationProfessorDisciplina.findById = (id, resultado) => {
  knex('relation-professor-disciplina')
    .where('id', id)
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

RelationProfessorDisciplina.create = (relation, resultado) => {
  knex('relation-professor-disciplina').insert(relation)
    .then(response => resultado(null, { id: response[0], ...relation }))
    .catch(err => resultado(err, null))
}

RelationProfessorDisciplina.update = (id, relation, resultado) => {
  knex('relation-professor-disciplina')
    .where('id', id)
    .update(relation)
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

RelationProfessorDisciplina.remove = (id, resultado) => {
  knex('relation-professor-disciplina')
    .where('id', id)
    .del()
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

module.exports = RelationProfessorDisciplina;
