module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: "localhost",
      user: "root",
      password: "27102017",
      database: "sauv"
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  },
};
