const express = require("express");
const { default: alunoController } = require("./controllers/alunoController");
const AlunoController = require("./controllers/alunoController");
const CoordenadorController = require("./controllers/coordenadorController");
const FuncionarioController = require("./controllers/funcionarioController");
const ProfessorController = require('./controllers/professorController')

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

routes.post("/professor", ProfessorController.create);
routes.get("/professor", ProfessorController.read);
routes.put("/professor", ProfessorController.update);
routes.delete("/professor", ProfessorController.delete);

module.exports = routes;
