const Frequencias = require("../model/frequencia");

module.exports = {
  async create(req, res) {
    const frequencias = new Frequencias(req.body);

    const response = await Frequencias.create(frequencias).catch((error) => {
      return new Error(error);
    });

    if (response instanceof Error)
      return res.status(500).send({ message: "Erro ao criar a frequência" });

    res.send(response);
  },

  async readCPF(req, res) {
    Frequencias.getByCPF(req.body.cpf, (error, dados) => {
      if (error) res.status(500).send({ message: error + "" });
      else res.send(dados);
    });
  },

  async readId(req, res) {
    Frequencias.getById(req.params.id, (error, dados) => {
      if (error) res.status(500).send({ message: error + "" });
      else res.send(dados);
    });
  },

  async update(req, res) {
    Frequencias.update(req.params.id, req.body).catch((error) => {
      if (error)
        return res
          .status(500)
          .send({ message: "Erro ao atualizar a frequência" });
    });

    res.status(200).send({ message: "Frequências atualizadas com sucesso" });
  },
};
