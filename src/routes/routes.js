const AlunoController = require("../controllers/alunoController");
const CoordenadorController = require("../controllers/coordenadorController");
const FuncionarioController = require("../controllers/funcionarioController");
const ProfessorController = require('../controllers/professor.controller')
const disciplina = require('../controllers/disciplina.controller');
const serie = require('../controllers/serie.controller');
const turma = require('../controllers/turma.controller');
const user = require('../controllers/user.controller');
const { authenticate } = require('../config/passport.config');
const { signin } = require('../controllers/auth.controller');
const { buscaRelatorioTurma } = require('../controllers/relatorioTurma');

module.exports = app => {
  app.route("/signin")
    .post(signin)

  app.route("/aluno")
    .all(authenticate())
    .post(AlunoController.create)
    .get(AlunoController.read)

  app.route("/aluno/:id")
    .all(authenticate())
    .patch(AlunoController.update)
    .delete(AlunoController.delete)

  app.route("/coordenador")
    .all(authenticate())
    .post(CoordenadorController.create)
    .get(CoordenadorController.read)
    .put(CoordenadorController.update)
    .delete(CoordenadorController.delete)

  app.route("/funcionario")
    .all(authenticate())
    .post(FuncionarioController.create)
    .get(FuncionarioController.read)
    .put(FuncionarioController.update)
    .delete(FuncionarioController.delete)

  app.route("/professores")
    .all(authenticate())
    .post(ProfessorController.create)
    .get(ProfessorController.read)

  app.route("/professores/:id")
    .all(authenticate())
    .patch(ProfessorController.update)
    .delete(ProfessorController.delete)

  app.route("/disciplinas")
    .all(authenticate())
    .post(disciplina.criar)
    .get(disciplina.buscaDisciplinas)

  app.route("/disciplinas/:id")
    .all(authenticate())
    .get(disciplina.buscaDisciplina)
    .put(disciplina.atualizar)
    .delete(disciplina.deletar)

  app.route("/trancar")
    .all(authenticate())
    .patch(AlunoController.trancar)

  app.route("/series")
    .all(authenticate())
    .post(serie.criar)
    .get(serie.buscaSeries)

  app.route("/series/:id")
    .all(authenticate())
    .put(serie.atualizar)
    .delete(serie.deletar)

  app.route("/series/:anoLetivo")
    .all(authenticate())
    .get(serie.buscaSerie);

  app.route("/turmas")
    .all(authenticate())
    .post(turma.criar)
    .get(turma.buscaTurmas)

  app.route("/turmas/:id")
    .all(authenticate())
    .put(turma.atualizar)
    .delete(turma.deletar)

  app.route("/turmas/:serie")
    .all(authenticate())
    .get(turma.buscaTurma)

  app.route("/users")
    // .all(authenticate())
    .post(user.criar)

  app.route("/users/:username")
    // .all(authenticate())
    .get(user.busca)
    .put(user.atualizar)
    .delete(user.deletar)


  app.route("/relatorio-turma")
    // .all(authenticate())
    .get(buscaRelatorioTurma)

}
