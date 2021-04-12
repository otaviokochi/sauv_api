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

Serie.getAll = async (pages, resultado) => {
  // const limit = 10;
  // const page = pages || 1;
  // const res = knex('series').count('id');
  // const count = parseInt(res.count);
  knex('series')
    // .limit(limit)
    // .offset(page * limit - limit)
    .then(series => {
      resultado(null, series)
      // resultado(null, {
      //   data: series,
      //   count,
      //   limit
      // })
    })
    .catch(err => resultado(err, null))
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