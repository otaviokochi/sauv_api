exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("relation-professor-disciplina")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("relation-professor-disciplina").insert([
        { id: 1, professor_id: "1", disciplina_id: "1" },
        { id: 2, professor_id: "2", disciplina_id: "2" },
        { id: 3, professor_id: "1", disciplina_id: "3" },
        { id: 4, professor_id: "2", disciplina_id: "4" },
        { id: 5, professor_id: "1", disciplina_id: "5" },
        { id: 6, professor_id: "2", disciplina_id: "6" },
        { id: 7, professor_id: "1", disciplina_id: "7" },
        { id: 8, professor_id: "2", disciplina_id: "8" },
      ]);
    });
};
