const Aluno = require("../model/aluno");
const Turma = require("../model/turma");

module.exports = {
  async create(req, res) {
    const aluno = new Aluno(req.body);
    const todasTurmas = await Turma.getBySerie(req.body.serie).catch(
      (error) => {
        console.log(error);
        res.status(500).send({ message: "Error ao encontrar turma da série" });

        return new Error(error);
      }
    );
    if (todasTurmas instanceof Error) return;

    const turmaAluno = todasTurmas.filter(
      (turma) =>
        turma.turma == aluno.turma.toUpperCase() && turma.ano == aluno.anoTurma
    )[0];

    if (!turmaAluno)
      return res.status(400).send({ message: "Error ao encontrar turma" });

    const quantidadeAlunosTuma = await Aluno.getQtddAlunosTurma({
      serie: aluno.serie,
      turma: aluno.turma,
      anoTurma: turmaAluno.ano,
    })
      .then((response) => response[0].quantidadeAlunos)
      .catch((error) => {
        console.log(error);
        return new Error(error);
      });

    if (quantidadeAlunosTuma instanceof Error)
      return res.status(500).send({ message: "Erro ao criar aluno!" });

    if (quantidadeAlunosTuma >= 40)
      return res.status(400).send({ message: "Turma cheia!" });

    const response = await Aluno.create(aluno).catch((error) => {
      console.log(error);
      return new Error(error);
    });

    if (response instanceof Error)
      return res.status(500).send({ message: "Erro ao criar o aluno" });

    res.send(response);
  },

  read(req, res) {
    if (req.query.nome) {
      Aluno.getByName(req.query.nome, (error, dados) => {
        if (error) {
          res.status(500).send({ message: error });
        } else {
          res.send(dados);
        }
      });
    } else {
      Aluno.read((error, dados) => {
        if (error) {
          res.status(500).send({ message: error });
        } else {
          res.send(dados);
        }
      });
    }
  },

  async find(req, res) {
    if (req.params.cpf) {
      Aluno.findByCPF(req.params.cpf, (error, dados) => {
        if (error) {
          res.status(500).send({ message: error + "" });
        } else {
          res.send(dados);
        }
      });
    } else {
      res.status(500).send({ message: "Campo CPF não encontrado" });
    }
  },

  async update(req, res) {
    const alunoAtualizado = new Aluno(req.body);
    const alunoAntigo = await Aluno.findByCPF(req.body.cpf).catch((error) => {
      console.log(error);
      return new Error(error);
    });

    //if (alunoAntigo instanceof Error) return res.status(500).send({ message: error.message });
    //if(alunoAntigo.anoTurma != alunoAtualizado.anoTurma || alunoAntigo.turma != alunoAtualizado.turma || alunoAntigo.serie != alunoAtualizado.serie)
    //  return res.status(400).send({ message: 'Para atualizar a serie/turma do aluno vá em controles!' })

    const response = await Aluno.update(req.body.cpf, alunoAtualizado);
    //.catch(error => {
    //  console.log(error);
    //  return new Error(error);
    //})
    if (response instanceof error)
      return res.status(500).send({ message: "Errro ao atualizar o aluno!" });

    if (response > 0) {
      res.send({ cpf: dados, ...req.body });
    } else {
      res.send({
        message: `Aluno de CPF ${req.params.cpf} não foi encontrado!`,
      });
    }
  },

  delete(req, res) {
    Aluno.remove(req.body.cpf, (error, dados) => {
      if (error) {
        console.log(error);
        res.status(500).send({ message: error });
      } else {
        if (dados > 0)
          res.send({
            message: `Aluno de CPF ${req.body.cpf} deletado com sucesso!`,
          });
        else
          res
            .status(400)
            .send({ message: `Aluno de CPF ${req.body.cpf} não encontrado!` });
      }
    });
  },

  trancar(req, res) {
    Aluno.getByName(req.body.cpf, (error, dados) => {
      if (error) {
        res.status(500).send({ message: error + "" });
      }
      aluno = new Aluno(dados);
    });

    Aluno.trancar(req.body.cpf, aluno, (error) => {
      if (error) {
        res.status(500).send({ message: error + "" });
      } else {
        res.send({
          message: `Matrícula do aluno de CPF ${req.body.cpf} trancada!`,
        });
      }
    });
  },
};
