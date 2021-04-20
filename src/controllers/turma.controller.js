const Turma = require('../model/turma');
const RelationTurmaProfessor = require('../model/relationTurmaProfessor')
const { nomeTurma } = require('../utils/nomeTurma');

module.exports = {
  async criar(req, res) {
    const novaTurma = {
      serie: req.body.serie,
      ano: req.body.ano,
      turma: req.body.turma.toUpperCase(),
      nome: nomeTurma(req.body.serie, req.body.turma),
    }
    const turma = await Turma.criar(novaTurma)
      .catch(error => {
      if(error.message.includes('SQLITE_CONSTRAINT: UNIQUE')) {
          console.log(error);
          res.status(500).send({ message: "Turma já criada" });
          return new Error(error);
        } else if (error.code == "ER_NO_REFERENCED_ROW_2") {
          console.log(error);
          res.status(500).send({ message: "Série não encontrada!" });
          return new Error(error);
        }
        else {
          console.log(error);
          res.status(500).send({ message: "Erro ao criar turma" });
          return new Error(error);
        }
      })
    if (turma instanceof Error) return;
    const relations = req.body.professores.map(async arrayProfessor => {
      const [nomeProfessor, idProfessor] = arrayProfessor[1].split(',');
      const disciplina = arrayProfessor[0];
      return await RelationTurmaProfessor.create({
        idTurma: turma,
        idProfessor,
        nomeProfessor,
        disciplina,
        nomeTurma: novaTurma.nome,
        serieTurma: novaTurma.serie,
        ano: novaTurma.ano,
        turma: novaTurma.turma
      })
    })
    const promiseAll =await Promise.all(relations)
      .catch(async error => {
        console.log(error);
        await Turma.remove(turma)
        return new Error(error);
      })
    if (promiseAll instanceof Error) return res.status(500).send({ message: "Erro ao criar turma!" });
    res.json({
      ...turma,
      ...relations
    });
  },


  async buscaTurmas(req, res) {
    if (req.params.nome) {
      const turmas = await Turma.getByName(req.params.nome)
        .catch(error => {
          console.log(error);
          return new Error(error);
        })
      if (turmas instanceof Error) return res.status(500).send({ message: "Erro ao buscar turma" });
      res.send(turmas);
    } else {
      const turmas = await Turma.getAll()
        .catch(error => {
          console.log(error);
          return new Error(error);
        })
      if (turmas instanceof Error) return res.status(500).send({ message: "Erro ao buscar turma" });

      res.send(turmas);
    }
  },

  async buscaTurma(req, res) {
    const turma = await Turma.getBySerie(req.params.serie)
      .catch(error => {
        console.log(error);
        return new Error(error);
      })
    if (turma instanceof Error) return res.status(500).send({ message: "Erro ao buscar turma" });
    res.send(turma);
  },

  async atualizar(req, res) {
    let turmaAtualizada = new Turma(req.body);
    const relationsDeletada = await RelationTurmaProfessor.removeByIdTurma(req.params.id)
      .catch(error => {
        console.log(error);
        return new Error(error);
      });
    if (relationsDeletada instanceof Error) return res.status(500).send({ message: "Erro ao atualizar turma" });
    const relations = await Promise.all(req.body.professores.map(async arrayProfessor => {
      const [nomeProfessor, idProfessor] = arrayProfessor[1].split(',');
      const disciplina = arrayProfessor[0];
      return await RelationTurmaProfessor.create({
        idTurma: req.params.id,
        idProfessor,
        nomeProfessor,
        disciplina,
        nomeTurma: turmaAtualizada.nome,
        turma: turmaAtualizada.turma,
        serieTurma: turmaAtualizada.serie,
        ano: turmaAtualizada.ano,
      })
    })).then(_ => true).catch(error => {
      console.log('aquiii')
      console.log(error)
      return false;
    });
    if (!relations) return res.status(500).send({ message: `Erro servidor!` });
    turmaAtualizada = await Turma.update(req.params.id, turmaAtualizada)
      .catch(error => {
        console.log(error);
        return new Error(error);
      })
    if (turmaAtualizada instanceof Error) return res.status(500).send({ message: "Erro ao atualizar turma" });
    if (turmaAtualizada > 0) {
      res.send({ message: `Turma de id ${req.params.turma} atualizada com sucesso!` });
    } else {
      res.send({ message: `Turma de id ${req.params.id} não encontrada!` });
    }
  },

  async deletar(req, res) {
    const relationsDeletada = await RelationTurmaProfessor.removeByIdTurma(req.params.id)
      .catch(error => {
        console.log(error);
        return new Error(error);
      });
    if (relationsDeletada instanceof Error) return res.status(500).send({ message: "Erro ao deletar turma" });

    const turmaDeletada = await Turma.remove(req.params.id)
      .catch(error => {
        console.log(error);
        return new Error(error);
      })
  
    if (turmaDeletada instanceof Error) return res.status(500).send({ message: "Erro ao deletar turma" });

    if (turmaDeletada > 0) {
      res.send({ message: `Turma de id ${req.params.id} deletada com sucesso!` });
    } else {
      res.send({ message: `Turma de id ${req.params.id} não encotranda!` });
    }

  }

}