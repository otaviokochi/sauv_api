exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("turmas")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("turmas").insert([
        { id: 1, serie: 1, nome: "1ª Série A", turma: "A", ano: 2020},
        { id: 2, serie: 1, nome: "1ª Série B", turma: "B", ano: 2020},
        { id: 3, serie: 2, nome: "2ª Série A", turma: "A", ano: 2020},
        { id: 4, serie: 2, nome: "2ª Série B", turma: "B", ano: 2020},
        { id: 5, serie: 2, nome: "2ª Série C", turma: "C", ano: 2020},
      ]);
    });
};