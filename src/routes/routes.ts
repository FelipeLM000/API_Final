import { Router } from 'express';

import * as AlunoController from '../controllers/alunoController';
import * as DisciplinaController from '../controllers/disciplinaController'
import * as AlunoDisciplinaController from '../controllers/alunoDisciplinaController'
import * as ApiController from '../controllers/apiController'

import * as AuthController from '../controllers/authController';
//import { Aluno } from '../models/Aluno';
//import { Professor } from '../models/Professor';

const router = Router();

router.get("/saudacao", ApiController.apiSaudacao)

router.get('/listarTodosAlunos', AlunoController.listarAlunos);
router.post('/cadastrarAluno', AlunoController.cadastrarAluno);
router.get('/atualizarAluno/:alunoId', AlunoController.atualizarAluno);
router.delete('/deletarAluno/:alunoId', AlunoController.deletarAluno);
router.get('/buscarAlunoId/:alunoId', AlunoController.buscarAluno)

router.get('/listarTodasDisciplinas', DisciplinaController.listarDisciplinas);
router.post('/cadastrarDisciplina', DisciplinaController.cadastrarDisciplina);
router.get('/atualizarDisciplina/:disciplinaId', DisciplinaController.atualizarDisciplina);
router.post("/vincularAlunoADisciplina", AlunoDisciplinaController.vincularAlunoADisciplina);
router.get("/listarDisciplinasDoAluno/:alunoId", AlunoDisciplinaController.listarDisciplinasDoAluno);

router.post('/login', AuthController.login);

export default router;


