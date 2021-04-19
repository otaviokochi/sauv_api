const database = process.env.NODE_ENV === "test" ? "sauvTest" : "sauv";


module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: "localhost",
      user: "root",
      password: "otaviokochi",
      database: database
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }

  },

};