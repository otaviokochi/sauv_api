const User = require('../model/user');
const bcrypt = require('bcrypt');

module.exports = {
  async criar (req, res) {
    const password = await bcrypt.hash(req.body.senha, 10)
      .then(hash => hash)
      .catch(error => {
        console.log(error);
        return false;
      });
    if(password) {
      const user = {
        tipo: req.body.tipo,
        username: req.body.username,
        senha: password
      }
      User.criar(user, (error, dados) => {
        if(error) {
          console.log(error);
          res.status(500).send({ message: error });
        } else {
          res.send(dados);
        }
      })
    } else {
      res.status(400).send({ message: "Falha ao criar a senha do usuário, escolha outra!"})
    }
  },

  busca (req, res) {
    User.getUser(req.params.username, (error, dados) => {
      if(error) {
        console.log(error);
        res.status(500).send({ message: error });
      } else {
        res.send(dados);
      }
    })
  },

  async atualizar (req, res) {
    const password = await bcrypt.hash(req.password, 10).catch(error => false);
    if(password) {
      const user = {
        nome: req.nome,
        tipo: req.tipo,
        username: req.username,
        senha: password
      }
      User.update(req.params.username, user, (error, dados) => {
        if(error) {
          console.log(error);
          res.status(500).send({ message: error });
        } else {
          if(dados > 0) {
            res.send({ message: `Usuário de username ${req.params.user} atualizada com sucesso!`});
          } else {
            res.send({ message: `Usuário de username ${req.params.username} não encontrado!`});
          }
        }
      })
    } else {
      res.status(400).send({ message: "Falha ao criar a senha do usuário, escolha outra!"})
    }
  },

  deletar (req, res) {
    User.remove(req.params.username, (error, dados) => {
      if(error) {
        console.log(error);
        res.status(500).send({ message: error });
      } else {
        if(dados > 0) {
          res.send({ message: `Usuário de username ${req.params.username} deletado com sucesso!`});
        } else {
          res.send({ message: `Usuário de username ${req.params.username} não encotrando!`});
        }
      }
    })
  }

}