const Coordenador = require("../model/coordenador");

module.exports = {
  async create(req, res) {
    const coordenador = new Coordenador(req.body);
    
    const response = await Coordenador.create(coordenador).catch((error) => {
      console.log(error);
      return new Error(error);
    });

    if (response instanceof Error)
      return res.status(500).send({ message: "Erro ao criar o coordenador" });

    res.send(response);
  },

  read(req, res) {
    if (req.query.nome) {
      Coordenador.getByName(req.query.nome, (error, dados) => {
        if (error) {
          res.status(500).send({ message: error });
        } else {
          res.send(dados);
        }
      });
    } else {
      Coordenador.read((error, dados) => {
        if (error) {
          res.status(500).send({ message: error });
        } else {
          res.send(dados);
        }
      });
    }
  },

  update(req, res) {
    const coordenador = new Coordenador(req.body);
    Coordenador.update(req.body.cpf, coordenador, (error, dados) => {
      if (error) {
        res.status(500).send({ message: error + "" });
      } else {
        if (dados > 0) {
          res.send({ cpf: dados, ...req.body });
        } else {
          res.send({
            message: `Coordenador de CPF ${req.params.cpf} não foi encontrado!`,
          });
        }
      }
    });
  },

  delete(req, res) {
    Coordenador.remove(req.body.cpf, (error, _) => {
      if (error) {
        res.status(500).send({ message: error + "" });
      } else {
        res.send({
          message: `Coordenador de CPF ${req.body.cpf} deletado com sucesso!`,
        });
      }
    });
  },
};
