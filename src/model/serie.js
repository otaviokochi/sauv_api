const knex = require('../database/db')

const Serie = function(serie) {
  this.anoLetivo = serie.anoLetivo;
  this.disciplinas = JSON.stringify(serie.disciplinas);
}

Serie.criar = (novaSerie, resultado) => {
  knex('series')
    .insert({
      ...novaSerie
    })
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

Serie.getAll = resultado => {
  knex('series')
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

Serie.getByAnoLetivo = (anoLetivo, resultado) => {
  knex('series')
    .where('anoLetivo', anoLetivo)
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

Serie.getById = (id, resultado) => {
  knex('series')
    .where('id', id)
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

Serie.update = (id, serie, resultado) => {
  knex('series')
    .where('id', id)
    .update({
      ...serie
    })
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

Serie.remove = (id, resultado) => {
  knex('series')
    .where('id', id)
    .del()
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

module.exports = Serie;