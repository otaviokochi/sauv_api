const knex = require('../database/db');

const RelationProfessorDisciplina = function (relation) {
  this.professorId = relation.professorId;
  this.disciplinaId = relation.disciplinaId;
}

RelationProfessorDisciplina.read = async () => 
  knex('relation-professor-disciplina')


RelationProfessorDisciplina.findById = async id => 
  knex('relation-professor-disciplina').where('professor_id', id)

RelationProfessorDisciplina.create = async relation =>
  knex('relation-professor-disciplina').insert(relation)

RelationProfessorDisciplina.update = (id, relation, resultado) => {
  knex('relation-professor-disciplina')
    .where('id', id)
    .update(relation)
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

RelationProfessorDisciplina.remove = async id =>
  knex('relation-professor-disciplina')
    .where('professor_id', id)
    .del()

module.exports = RelationProfessorDisciplina;
