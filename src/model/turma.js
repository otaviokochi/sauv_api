const knex = require('../database/db');
const {nomeTurma} = require('../nomeTurma');

const Turma = function(turma) {
  this.serie = turma.serie;
  this.turma = turma.turma.toUpperCase();
  this.nome = nomeTurma(turma.serie, turma.turma);
}

Turma.criar = (novaTurma, resultado) => {
  knex('turmas')
    .insert({
      ...novaTurma
    })
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

Turma.getAll = resultado => {
  knex('turmas')
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

Turma.getByName = (nomeTurma, resultado) => {
  knex('turmas')
    .where('nome', 'like', `%${nomeTurma}%`)
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
};

Turma.getBySerie = (serie, resultado) => {
  knex('turmas')
    .where('serie', serie)
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

Turma.update = (id, turma, resultado) => {
  knex('turmas')
    .where('id', id)
    .update({
      ...turma
    })
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

Turma.remove = (id, resultado) => {
  knex('turmas')
    .where('id', id)
    .del()
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

module.exports = Turma;