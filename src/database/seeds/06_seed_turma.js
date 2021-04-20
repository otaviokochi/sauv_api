exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("turmas")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("turmas").insert([
        { id: 1, serie: 1, nome: "1 Série A", turma: "A", ano: 2020},
        { id: 2, serie: 1, nome: "1 Série B", turma: "B", ano: 2020},
        { id: 3, serie: 2, nome: "2 Série A", turma: "A", ano: 2020},
        { id: 4, serie: 2, nome: "2 Série B", turma: "B", ano: 2020},
        { id: 5, serie: 2, nome: "2 Série C", turma: "C", ano: 2020},
      ]);
    });
};