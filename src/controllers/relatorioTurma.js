const Aluno = require('../model/aluno');
const RelationTurmaProfessor = require('../model/relationTurmaProfessor')

module.exports = {

  async buscaRelatorioTurma(req, res) {

    const relations = await RelationTurmaProfessor.findByIdTurma({
      serieTurma: req.query.serie,
      turma: req.query.turma,
      ano: req.query.ano
    })
      .catch(error => {
        console.log(error);
        return new Error(error);
      })
    if (relations instanceof Error) return res.status(500).send({ message: "Error ao encontrar disciplinas" });
    const disciplinas = relations.reduce((arrayProfessoresDisciplinas, relation) => {
      arrayProfessoresDisciplinas.push({
        nomeDisciplina: relation.disciplina,
        professor: relation.nomeProfessor
      })
      return arrayProfessoresDisciplinas;
    }, []);
    const alunos = await Aluno.alunosTurma({
      turma: req.query.turma,
      serie: req.query.serie,
      anoTurma: req.query.ano
    })
      .catch(error => {
        console.log(error);
        return new Error(error);
      })
    if (alunos instanceof Error) return res.status(500).send({ message: "Erro ao encontrar alunos" });

    res.json({
      disciplinas,
      alunos,
    })
  },


}