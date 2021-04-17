const knex = require('../database/db');
const {nomeTurma} = require('../utils/nomeTurma');

const Turma = function(turma) {
  this.serie = turma.serie;
  this.ano = turma.ano;
  this.turma = turma.turma.toUpperCase();
  this.nome = nomeTurma(turma.serie, turma.turma);
}

Turma.criar = (novaTurma) => new Promise((resolve, reject) => {
  knex('turmas')
    .insert({
      ...novaTurma
    })
    .then(response => resolve(response))
    .catch(err => reject(err));

})

Turma.getAll = () => new Promise((resolve, reject) => {
  knex('turmas')
    .then(response => resolve(response))
    .catch(err => reject(err));
})


Turma.getByName = (nomeTurma) => new Promise((resolve, reject) => {
  knex('turmas')
    .where('nome', 'like', `%${nomeTurma}%`)
    .then(response => resolve(response))
    .catch(err => reject(err));
})

Turma.getById = (id) => new Promise((resolve, reject) => {
  knex('turmas')
    .where('id', id)
    .then(response => resolve(response))
    .catch(err => reject(err));
})

Turma.getBySerie = (serie) => new Promise((resolve, reject) => {
  knex('turmas')
    .where('serie', serie)
    .then(response => resolve(response))
    .catch(err => reject(err));
})

Turma.update = (id, turma) => new Promise((resolve, reject) => {
  knex('turmas')
    .where('id', id)
    .update({
      ...turma
    })
    .then(response => resolve(response))
    .catch(err => reject(err));
})

Turma.remove = (id) => new Promise((resolve, reject) => {
  knex('turmas')
    .where('id', id)
    .del()
    .then(response => resolve(response))
    .catch(err => reject(err));
})


module.exports = Turma;