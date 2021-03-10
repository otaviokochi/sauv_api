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

Serie.getById = (anoLetivo, resultado) => {
  knex('series')
    .where('anoLetivo', anoLetivo)
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

Serie.update = (anoLetivo, serie, resultado) => {
  knex('series')
    .where('anoLetivo', anoLetivo)
    .update({
      ...serie
    })
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

Serie.remove = (anoLetivo, resultado) => {
  knex('series')
    .where('anoLetivo', anoLetivo)
    .del()
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

module.exports = Serie;