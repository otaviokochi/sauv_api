const mysql = require('mysql');

//conexao com banco de dados local
const connection = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
});

connection.connect(error => {
    if(error) throw error;
    console.log("Connected!")
});

module.exports = connection;