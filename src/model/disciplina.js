const knex = require('../database/db')

const Disciplina = function(disciplina) {
  this.nomeDisciplina = disciplina.nomeDisciplina;
  this.cargaHoraria = disciplina.cargaHoraria;
}

Disciplina.criar = (novaDisciplina, resultado) => {
  knex('disciplinas')
    .insert({
      ...novaDisciplina
    })
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

Disciplina.getAll = resultado => {
  knex('disciplinas')
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

Disciplina.getByName = (nomeDisciplina, resultado) => {
  knex('disciplinas')
    .where('nome', 'like', `%${nomeDisciplina}%`)
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null))
};

Disciplina.findById = (id, resultado) => {
  knex('disciplinas')
    .where('id', id)
    .then(response => resultado && resultado(null, response))
    .catch(err => resultado && resultado(err, null));
}

Disciplina.findDisciplinaById = async id => 
  knex('disciplinas').where('id', id)

Disciplina.update = (id, disciplina, resultado) => {
  knex('disciplinas')
    .where('id', id)
    .update({
      ...disciplina
    })
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

Disciplina.remove = (id, resultado) => {
  knex('disciplinas')
    .where('id', id)
    .del()
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

module.exports = Disciplina;