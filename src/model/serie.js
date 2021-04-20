const knex = require("../database/db");

const Serie = function (serie) {
  this.serie = serie.serie;
  this.disciplinas = JSON.stringify(serie.disciplinas);
};

Serie.criar = (novaSerie, resultado) => {
  knex("series")
    .insert({
      ...novaSerie,
    })
    .then((response) => resultado(null, response))
    .catch((err) => resultado(err, null));
};

Serie.getAll = async (resultado) => {
  knex("series")
    .then((series) => {
      resultado(null, series);
    })
    .catch((err) => resultado(err, null));
};

Serie.getByAnoLetivo = (serie, resultado) => {
  knex("series")
    .where("serie", serie)
    .first()
    .then((response) => resultado(null, response))
    .catch((err) => resultado(err, null));
};

Serie.getById = (id, resultado) => {
  knex("series")
    .where("id", id)
    .first()
    .then((response) => resultado(null, response))
    .catch((err) => resultado(err, null));
};

Serie.update = (id, serie, resultado) => {
  knex("series")
    .where("id", id)
    .update({
      ...serie,
    })
    .then((response) => resultado(null, response))
    .catch((err) => resultado(err, null));
};

Serie.remove = (id, resultado) => {
  knex("series")
    .where("id", id)
    .del()
    .then((response) => resultado(null, response))
    .catch((err) => resultado(err, null));
};

module.exports = Serie;
