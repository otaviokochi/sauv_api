const User = require('../model/user');
const bcrypt = require('bcrypt');

module.exports = {
  async criar (req, res) {
    const password = await bcrypt.hash(req.body.senha, 10)
      .catch(error => {
        console.log(error);
        return false;
      });
    if(password && req.body.tipo && req.body.username) {
        const user = {
          tipo: req.body.tipo.toUpperCase(),
          username: req.body.username,
          senha: password
        }
        User.criar(user, (error, dados) => {
          if(error) {
            if(error.code == 'ER_DUP_ENTRY') {
              console.log(error);
              res.status(400).send({ message: "Username já cadastrado!" });
            } else {
              console.log(error);
              res.status(500).send({ message: "Erro ao criar usuário" });
            }
          } else {
            console.log(dados);
            res.send({ message: "Usuário criado com sucesso!" });
          }
        })
    } else {
      res.status(400).send({ message: 'Dados do usuário faltando' })
    }
  },

  busca (req, res) {
    User.getUser(req.params.username, (error, dados) => {
      if(error) {
        console.log(error);
        res.status(500).send({ message: "Erro ao buscar usuário" });
      } else {
        res.send(dados);
      }
    })
  },

  async atualizar (req, res) {
    const password = await bcrypt.hash(req.body.senha, 10)
      .catch(error => {
        console.log(error);
        return false;
      });
    if(password && req.body.tipo && req.body.username) {
      const user = {
        tipo: req.body.tipo,
        username: req.body.username,
        senha: password
      }
      User.update(req.params.username, user, (error, dados) => {
        if(error) {
          console.log(error);
          res.status(500).send({ message: "Erro ao atualizar usuário" });
        } else {
          if(dados > 0) {
            res.send({ message: `Usuário de username ${req.params.username} atualizada com sucesso!`});
          } else {
            res.status(400).send({ message: `Usuário de username ${req.params.username} não encontrado!`});
          }
        }
      })
    } else {
      res.status(400).send({ message: 'Dados do usuário faltando' })
    }
  },

  deletar (req, res) {
    User.remove(req.params.username, (error, dados) => {
      if(error) {
        console.log(error);
        res.status(500).send({ message: "Erro ao deletar usuário" });
      } else {
        if(dados > 0) {
          res.send({ message: `Usuário de username ${req.params.username} deletado com sucesso!`});
        } else {
          res.status(400).send({ message: `Usuário de username ${req.params.username} não encotrando!`});
        }
      }
    })
  }

}