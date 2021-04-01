const Turma = require('../model/turma');

module.exports = {
  criar (req, res) {
    const turma = new Turma(req.body);
    Turma.criar(turma, (error, dados) => {
      if(error) {
        if(error.code == 'ER_DUP_ENTRY') {
          console.log(error);
          res.status(500).send({ message: "Turma já criada" });
        } else if (error.code == "ER_NO_REFERENCED_ROW_2") {
          console.log(error);
          res.status(500).send({ message: "Série não encontrada!" });
        }
        else {
          console.log(error);
          res.status(500).send({ message: error });
        }
      } else {
        res.send(dados);
      }
    })
  },

  buscaTurmas (req, res) {
    if(req.params.nome) {
      Turma.getByName(req.params.nome, (error, dados) => {
        if(error) {
          console.log(error);
          res.status(500).send({ message: error });
        } else {
          res.send(dados);
        }
      })
    } else {
      Turma.getAll((error, dados) => {
        if(error) {
          console.log(error);
          res.status(500).send({ message: error });
        } else {
          res.send(dados);
        }
      })
    }
  },

  buscaTurma (req, res) {
    Turma.getById(req.params.id, (error, dados) => {
      if(error) {
        console.log(error);
        res.status(500).send({ message: error });
      } else {
        res.send(dados);
      }
    })
  },

  atualizar (req, res) {
    const turmaAtualizada = new Turma(req.body);
    Turma.update(req.params.id, turmaAtualizada, (error, dados) => {
      if(error) {
        console.log(error);
        res.status(500).send({ message: error });
      } else {
        if(dados > 0) {
          res.send({ message: `Turma de id ${req.params.turma} atualizada com sucesso!`});
        } else {
          res.send({ message: `Turma de id ${req.params.id} não encontrada!`});
        }
      }
    })
  },

  deletar (req, res) {
    Turma.remove(req.params.id, (error, dados) => {
      if(error) {
        console.log(error);
        res.status(500).send({ message: error });
      } else {
        if(dados > 0) {
          res.send({ message: `Turma de id ${req.params.id} deletada com sucesso!`});
        } else {
          res.send({ message: `Turma de id ${req.params.id} não encotranda!`});
        }
      }
    })
  }

}