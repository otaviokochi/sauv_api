exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("series")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("series").insert([
        {
          id: 1,
          serie: 1,
          disciplinas: {
            portugues: "Português",
            matematica: "Matemática",
          },
        },
        {
          id: 2,
          serie: 2,
          disciplinas: {
            portugues: "Português",
            matematica: "Matemática",
            geografia: "geografia",
            historia: "História",
          },
        },
      ]);
    });
};
