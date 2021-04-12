const knex = require('../database/db');

const Professor = function (professor) {
  this.nome = professor.nome;
  this.cpf = professor.cpf;
  this.rg = professor.rg;
  this.email = professor.email;
  this.telefone = professor.telefone;
  this.formacao = professor.formacao;
  this.cep = professor.cep;
  this.bairro = professor.bairro;
  this.endereco = professor.endereco;
  this.complemento = professor.complemento;
}

Professor.read = () => knex('professores')

Professor.getByName = nome => 
  knex('professores').where('nome', 'like', `%${nome}%`)

Professor.findById = (id, resultado) => {
  knex('professores')
    .where('id', id)
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

Professor.create = (professor, resultado) => {
  knex('professores').insert(professor)
    .then(response => resultado(null, { id: response[0], ...professor }))
    .catch(err => resultado(err, null))
}

Professor.update = (id, professor) => 
  knex('professores').where('id', id).update(professor)

Professor.remove = (id, resultado) => {
  knex('professores')
    .where('id', id)
    .del()
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

module.exports = Professor;
