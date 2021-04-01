
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'otavio', type: 'funcionario', password: '$2b$10$/MhzQMtuQBlVR9ENJzMP7OpLpPUV.4f9UW74AbMri.xKkDTJg148C' },
        {id: 2, username: 'gustavo', type: 'professor', password: '$2b$10$K7I6cXpxHGe7rUoopfvmIu7DuaT.TFGVNOJQdSfE5MPpyqjrTsZX6' },
        {id: 3, username: 'thiago', type: 'coordenador', password: '$2b$10$t9Ep64QiW/ezsVAGP/90u.M9B.hszm1x.HHSlcoMMWGTghQ7ps4MS' },
      ]);
    });
};