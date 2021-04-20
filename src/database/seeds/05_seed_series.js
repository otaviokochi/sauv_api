exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('series').del()
    .then(function () {
      // Inserts seed entries
      return knex('series').insert([
        {id: 1, serie: 1, disciplinas: JSON.stringify(['Matemática', 'História'])},
        {id: 2, serie: 2, disciplinas: JSON.stringify(["Português", "Matemática", "Geografia", "História"])},
      ]);
    });
};