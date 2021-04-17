const knex = require('../database/db');

const User = function(user) {
  this.nome = user.nome;
  this.username = user.username;
  this.tipo = user.tipo;
  this.senha = user.senha;
}

User.criar = (novoUser, resultado) => {
  knex('users')
    .insert({
      ...novoUser
    })
    .then(response => resultado(null, {...novoUser, id: response[0]}))
    .catch(err => resultado(err, null));
}

// User.getUsers = resultado => {
//   knex('users')
//     .then(response => resultado(null, response))
//     .catch(err => resultado(err, null));
// }

User.getUser = (username, resultado) => {
  knex('users')
    .where('username', username)
    .first()
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
};

User.update = (username, user, resultado) => {
  knex('users')
    .where('username', username)
    .update({
      ...user
    })
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

User.remove = (username, resultado) => {
  knex('users')
    .where('username', username)
    .del()
    .then(response => resultado(null, response))
    .catch(err => resultado(err, null));
}

module.exports = User;