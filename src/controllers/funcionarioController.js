const Funcionario = require("../model/funcionario");

module.exports = {
  async create(req, res) {
    const funcionario = new Funcionario(req.body);
    
    const response = await Funcionario.create(funcionario).catch((error) => {
      console.log(error);
      return new Error(error);
    });

    if (response instanceof Error)
      return res.status(500).send({ message: "Erro ao criar o funcionario" });

    res.send(response);
  },

  read(req, res) {
    if (req.query.nome) {
      Funcionario.getByName(req.query.nome, (error, dados) => {
        if (error) {
          res.status(500).send({ message: error });
        } else {
          res.send(dados);
        }
      });
    } else {
      Funcionario.read((error, dados) => {
        if (error) {
          res.status(500).send({ message: error });
        } else {
          res.send(dados);
        }
      });
    }
  },

  update(req, res) {
    const funcionario = new Funcionario(req.body);
    Funcionario.update(req.body.cpf, funcionario, (error, dados) => {
      if (error) {
        res.status(500).send({ message: error + "" });
      } else {
        if (dados > 0) {
          res.send({ cpf: dados, ...req.body });
        } else {
          res.send({
            message: `Funcionario de CPF ${req.params.cpf} não foi encontrado!`,
          });
        }
      }
    });
  },

  delete(req, res) {
    Funcionario.remove(req.body.cpf, (error, _) => {
      if (error) {
        res.status(500).send({ message: error + "" });
      } else {
        res.send({
          message: `Funcionario de CPF ${req.body.cpf} deletado com sucesso!`,
        });
      }
    });
  },
};
