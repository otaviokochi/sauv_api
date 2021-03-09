const knex = require('knex')({
    client: 'mysql',
    connection: {
        port: 3306,
        user: "root",
        password: "password",
        database: "sauv",
        insecureAuth : true
    }
});

module.exports = knex;