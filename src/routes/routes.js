const { default: alunoController } = require("../controllers/alunoController");
const AlunoController = require("../controllers/alunoController");
const CoordenadorController = require("../controllers/coordenadorController");
const FuncionarioController = require("../controllers/funcionarioController");
const ProfessorController = require('../controllers/professor.controller')
const disciplina = require('../controllers/disciplina.controller');
const serie = require('../controllers/serie.controller');
const turma = require('../controllers/turma.controller');
const { authenticate } = require('../config/passport.config');
const { signin } = require('../controllers/auth.controller');

module.exports = app => {  
  app.route("/signin")
    .post(signin)
  
  app.route("/aluno")
  .all(authenticate())
  .post(AlunoController.create)
  .get(AlunoController.read)
  .put(AlunoController.update)
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
    .get(turma.buscaTurma)
    .put(turma.atualizar)
    .delete(turma.deletar)

}
