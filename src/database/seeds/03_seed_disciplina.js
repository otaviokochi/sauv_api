exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("disciplinas")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("disciplinas").insert([
        { id: 1, nomeDisciplina: "Matemática", cargaHoraria: "108" },
        { id: 2, nomeDisciplina: "Português", cargaHoraria: "108" },
        { id: 3, nomeDisciplina: "Física", cargaHoraria: "64" },
        { id: 4, nomeDisciplina: "Biologia", cargaHoraria: "64" },
        { id: 5, nomeDisciplina: "Química", cargaHoraria: "64" },
        { id: 6, nomeDisciplina: "Geografia", cargaHoraria: "64" },
        { id: 7, nomeDisciplina: "História", cargaHoraria: "64" },
        { id: 8, nomeDisciplina: "Arte", cargaHoraria: "32" },
      ]);
    });
};
