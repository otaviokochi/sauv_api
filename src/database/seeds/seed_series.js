
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('series').del()
    .then(function () {
      // Inserts seed entries
      return knex('series').insert([
        {id: 1, anoLetivo: 1, disciplinas: JSON.stringify(['Matemática', 'História'])},
      ]);
    });
};
