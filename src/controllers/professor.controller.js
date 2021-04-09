const Professor = require('../model/professor');
const Disciplinas = require('../model/disciplina')

module.exports = {
  create(req, res) {

    if (req.body.disciplinas) {
      const disciplinasId = req.body.disciplinas
      delete req.body.disciplinas
    }

    const professor = new Professor(req.body);

    Professor.create(professor, (err, body) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        const { id } = body

        res.send(body);
      }
    })
  },

  read(req, res) {
    if (req.query.nome) {
      Professor.getByName(req.query.nome, (error, dados) => {
        if (error) {
          res.status(500).send({ message: error });
        } else {
          res.send(dados);
        }
      })
    } else {
      Professor.read((error, dados) => {
        if (error) {
          res.status(500).send({ message: error });
        } else {
          res.send(dados);
        }
      })
    }
  },

  update(req, res) {
    const professor = new Professor(req.body);
    Professor.update(req.params.id, professor, (error, dados) => {
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
    Professor.remove(req.params.id, (error, resultado) => {
      if (error) {
        res.status(500).send({ message: error });
      } else {
        res.send({ message: `Disciplina de id ${req.params.id} deletada com sucesso!` });
      }
    })
  },

}
