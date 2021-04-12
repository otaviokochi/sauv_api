const Disciplina = require('../model/disciplina');

module.exports = {
  criar (req, res) {
    const disciplina = new Disciplina(req.body);

    Disciplina.criar(disciplina, (error, dados) => {
      if(error) {
        console.log(error);
        if (error.code === 'ER_DUP_ENTRY') {
          res.status(500).send({ message: `Disciplina duplicada!` });
        } else {
          res.status(500).send({ message: error.message });
        }
      } else {
        res.send(dados);
      }
    })
  },

  buscaDisciplinas (req, res) {
    if(req.query.nome) {
      Disciplina.getByName(req.query.nome, (error, dados) => {
        if(error) {
          console.log(error);
          res.status(500).send({ message: error });
        } else {
          console.log(dados)
          res.send(dados);
        }
      })
    } else {
      Disciplina.getAll((error, dados) => {
        if(error) {
          console.log(error);
          res.status(500).send({ message: error });
        } else {
          console.log(dados)
          res.send(dados);
        }
      })
    }
  },

  buscaDisciplina (req, res) {
    Disciplina.findById(req.params.id, (error, dados) => {
      if(error) {
        console.log(error);
        res.status(500).send({ message: error });
      } else {
        res.send(dados);
      }
    })
  },

  atualizar (req, res) {
    const disciplinaAtualizada = new Disciplina(req.body);
    Disciplina.update(req.params.id, disciplinaAtualizada, (error, dados) => {
      if(error) {
        console.log(error);
        res.status(500).send({ message: error });
      } else {
        //dados contem o numero de linhas afetadas
        if(dados > 0) {
          res.send({ message: `Disciplina de id ${req.params.id} atualizada com sucesso!`});
        } else {
          res.send({ message: `Disciplina de id ${req.params.id} não encontrada!`});
        }
      }
    })
  },

  deletar (req, res) {
    Disciplina.remove(req.params.id, (error, dados) => {
      if(error) {
        console.log(error);
        res.status(500).send({ message: error });
      } else {
        //dados contem o numero de linhas afetadas
        if(dados > 0) {
          res.send({ message: `Disciplina de id ${req.params.id} deletada com sucesso!`});
        } else {
          res.status(400).send({ message: `Disciplina de id ${req.params.id} não encontrada!`});
        }
      }
    })
  }
}