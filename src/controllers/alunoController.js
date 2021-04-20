const Aluno = require("../model/aluno");
const Turma = require("../model/turma");

const encontraTurmaAluno = async (serie, aluno) => {
  const todasTurmas = await Turma.getBySerie(serie)
      .catch(error => {
        console.log(error);
        return new Error("Erro ao buscar todas as turmas");
      })
  if (todasTurmas instanceof Error) return todasTurmas;
  const turmaAluno = todasTurmas.filter(turma => (turma.turma == aluno.turma.toUpperCase()) && (turma.ano == aluno.anoTurma))[0];
  if (!turmaAluno) return new Error("Turma não encontrada!");
  return turmaAluno;
}

const qtddAlunosTurma = async (aluno) => {
  const quantidadeAlunosTuma = await Aluno.getQtddAlunosTurma({
    serie: aluno.serie,
    turma: aluno.turma,
    anoTurma: aluno.anoTurma
  })
    .then(response => response[0].quantidadeAlunos)
    .catch(error => {
      console.log(error);
      return new Error("Error ao bucar quantidade de alunos pertencente a turma");
    })

  if (quantidadeAlunosTuma instanceof Error) return;

  if (quantidadeAlunosTuma >= 40) return new Error("Turma lotada!");
}

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
      anoTurma: aluno.anoTurma,
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

    Aluno.update(req.body.cpf, alunoAtualizado, (error, dados) => {
      if (error)
        return res.status(500).send({ message: "Errro ao atualizar o aluno!" });
      else
        res.send({ cpf: dados, ...req.body });
    });
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

  async trocarTurma (req, res) {
    const aluno = await Aluno.findByCPFAsync(req.body.cpf)
      .catch(error => {
        console.log(error);
        return new Error(error);
      })

    if (aluno instanceof Error) return res.status(500).send({ message: "Erro ao encontrar aluno!" });

    const turmaAluno = encontraTurmaAluno(req.body.serie, {turma: req.body.turma, anoTurma: req.body.ano});
    if(turmaAluno instanceof Error) {
      if (turmaAluno.message == "Erro ao buscar todas as turmas")
        return res.status(500).send({ message: turmaAluno.message });
      return res.status(400).send({ message: turmaAluno.message });
    }

    const quantidadeAluno = qtddAlunosTurma({
      serie: req.body.serie,
      turma: req.body.turma,
      anoTurma: req.body.anoTurma
    });

    if (quantidadeAluno instanceof Error) {
      if (quantidadeAluno.message == "Turma lotada!")
        return res.status(400).send({ message: quantidadeAluno.message });
      return res.status(500).send({ message: quantidadeAluno.message })
    }

    aluno.serie = req.body.serie;
    aluno.turma = req.body.turma;
    aluno.anoTurma = req.body.anoTurma;

    const response = await Aluno.updateAsync(aluno.cpf, aluno)
      .catch(error => {
        console.log(error);
        return new Error("Error a turma do aluno!");
      })

    if(response instanceof Error) return res.status(500).send({ message: response.message });
    res.send({ message: "Turma do aluno alterada com sucesso!" });
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
