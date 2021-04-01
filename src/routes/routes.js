const express = require("express");

const AlunoController = require("../controllers/alunoController");
const CoordenadorController = require("../controllers/coordenadorController");
const FuncionarioController = require("../controllers/funcionarioController");
const ProfessorController = require('../controllers/professor.controller')
const disciplina = require('../controllers/disciplina.controller');
const serie = require('../controllers/serie.controller');
const turma = require('../controllers/turma.controller');
const Aluno = require("../model/aluno");

const routes = express.Router();

routes.post("/aluno", AlunoController.create);
routes.get("/aluno", AlunoController.read);
routes.put("/aluno", AlunoController.update);
routes.delete("/aluno", AlunoController.delete);

routes.post("/coordenador", CoordenadorController.create);
routes.get("/coordenador", CoordenadorController.read);
routes.put("/coordenador", CoordenadorController.update);
routes.delete("/coordenador", CoordenadorController.delete);

routes.post("/funcionario", FuncionarioController.create);
routes.get("/funcionario", FuncionarioController.read);
routes.put("/funcionario", FuncionarioController.update);
routes.delete("/funcionario", FuncionarioController.delete);

routes.post("/professores", ProfessorController.create);
routes.get("/professores", ProfessorController.read);
routes.patch("/professores/:id", ProfessorController.update);
routes.delete("/professores/:id", ProfessorController.delete);

routes.post("/disciplinas", disciplina.criar);
routes.get("/disciplinas", disciplina.buscaDisciplinas);
routes.get("/disciplinas/:id", disciplina.buscaDisciplina);
routes.put("/disciplinas/:id", disciplina.atualizar);
routes.delete("/disciplinas/:id", disciplina.deletar);

routes.post("/series", serie.criar);
routes.get("/series", serie.buscaSeries);
routes.get("/series/:anoLetivo", serie.buscaSerie);
routes.put("/series/:anoLetivo", serie.atualizar);
routes.delete("/series/:anoLetivo", serie.deletar);

routes.post("/turmas", turma.criar);
routes.get("/turmas", turma.buscaTurmas);
routes.get("/turmas/:id", turma.buscaTurma);
routes.put("/turmas/:id", turma.atualizar);
routes.delete("/turmas/:id", turma.deletar);

routes.put('/trancar/alunos', AlunoController.trancar);

module.exports = routes;
