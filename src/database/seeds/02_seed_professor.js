exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("professor")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("professor").insert([
        {
          id: 1,
          nome: "Maria",
          cpf: "56478912301",
          rg: "147852369",
          email: "maria@gmail.com",
          telefone: "123",
          formacao: "Sim",
          cep: "1",
          bairro: "Conjunto",
          endereco: "sim",
          complemento: "não",
        },
        {
          id: 2,
          nome: "João",
          cpf: "78978912301",
          rg: "142552369",
          email: "joao@gmail.com",
          telefone: "123",
          formacao: "Sim",
          cep: "1",
          bairro: "Conjunto",
          endereco: "sim",
          complemento: "não",
        },
      ]);
    });
};
