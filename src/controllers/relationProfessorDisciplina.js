const RelationProfessorDisciplina = require('../model/relationProfessorDisciplina')

module.exports = {
  create(req, res) {
    const relation = new RelationProfessorDisciplina(req.body);

    RelationProfessorDisciplina.create(relation, (err, body) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.send(body);
      }
    })
  },

  read(req, res) {
    RelationProfessorDisciplina.read((error, dados) => {
      if (error) {
        res.status(500).send({ message: error });
      } else {
        res.send(dados);
      }
    })
  },

  update(req, res) {
    const relation = new RelationProfessorDisciplina(req.body);
    RelationProfessorDisciplina.update(req.params.id, relation, (error, dados) => {
      if (error) {
        res.status(500).send({ message: error });
      } else {
        if (dados > 0) {
          res.send({ id: dados, ...req.body });
        } else {
          res.send({ message: `Professor de id ${req.params.id} não encontrada!` });
        }
      }
    })
  },

  delete(req, res) {
    RelationProfessorDisciplina.remove(req.params.id, (error, resultado) => {
      if (error) {
        res.status(500).send({ message: error });
      } else {
        res.send({ message: `Disciplina de id ${req.params.id} deletada com sucesso!` });
      }
    })
  },

}
