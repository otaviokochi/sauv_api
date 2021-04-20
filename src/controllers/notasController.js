const { update } = require("../model/aluno");
const Notas = require("../model/notas");

module.exports = {
  async create(req, res) {
    const notas = new Notas(req.body);

    const response = await Notas.create(notas).catch((error) => {
      return new Error(error);
    });

    if (response instanceof Error)
      return res.status(500).send({ message: "Erro ao criar as notas" });

    res.send(response);
  },

  async read(req, res) {
    Notas.getAll(
      req.params.turmaId,
      req.params.disciplinaId,
      (error, dados) => {
        if (error) {
          res.status(500).send({ message: error + "" });
        } else {
          res.send(dados);
        }
      }
    );
  },

  async update(req, res) {
    if (req.body.nota1b) {
      Notas.nota1(req.params.id, req.body.nota1b).catch((error) => {
        if (error)
          return res
            .status(500)
            .send({ message: "Erro ao atualizar a nota 1" });
      });
    }
    if (req.body.nota2b) {
      Notas.nota2(req.params.id, req.body.nota2b).catch((error) => {
        if (error)
          return res
            .status(500)
            .send({ message: "Erro ao atualizar a nota 2" });
      });
    }
    if (req.body.nota3b) {
      Notas.nota3(req.params.id, req.body.nota3b).catch((error) => {
        if (error)
          return res
            .status(500)
            .send({ message: "Erro ao atualizar a nota 3" });
      });
    }
    if (req.body.nota4b) {
      Notas.nota4(req.params.id, req.body.nota4b).catch((error) => {
        if (error)
          return res
            .status(500)
            .send({ message: "Erro ao atualizar a nota 4" });
      });
    }

    res.status(200).send({ message: "Notas atualizadas com sucesso" });
  },
};
