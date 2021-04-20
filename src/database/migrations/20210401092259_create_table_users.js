exports.up = knex => knex.schema.raw(`
  CREATE TABLE
    users
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    tipo TEXT NOT NULL CHECK(tipo = "PROFESSOR" or tipo = "COORDENADOR" or TIPO = "FUNCIONARIO"),
    senha TEXT NOT NULL
  )
`);

exports.down = knex => knex.schema.raw(`
  DROP TABLE users
`);