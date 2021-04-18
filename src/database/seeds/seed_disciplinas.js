
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('disciplinas').del()
    .then(function () {
      // Inserts seed entries
      return knex('disciplinas').insert([
        {id: 1, nomeDisciplina: 'Matemática', cargaHoraria: 68},
        {id: 2, nomeDisciplina: 'História', cargaHoraria: 22},
      ]);
    });
};
