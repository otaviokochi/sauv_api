exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("turmas")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("turmas").insert([
        { id: 1, serie: 1, turma: "A" },
        { id: 2, serie: 1, turma: "B" },
        { id: 3, serie: 2, turma: "A" },
        { id: 4, serie: 2, turma: "B" },
        { id: 5, serie: 2, turma: "C" },
      ]);
    });
};
