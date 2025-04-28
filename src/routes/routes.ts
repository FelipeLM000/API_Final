import { Router } from 'express';

import * as ApiController from '../controllers/apiController';
import * as AlunoController from '../controllers/AlunoController';
import * as DisciplinaController from '../controllers/DisciplinaController'
import * as AlunoDisciplinaController from '../controllers/AlunoDisciplinaController'

const router = Router();

//router.get('/ping', ApiController.ping);

//router.get('/saudacao', ApiController.apiSaudacao);

router.get('/listarTodosAlunos', AlunoController.listarAlunos);
router.post('/cadastrarAluno', AlunoController.cadastrarAluno);
router.put('/atualizarAluno/:alunoId', AlunoController.atualizarAluno);
router.delete('/deletarAluno/:alunoId', AlunoController.deletarAluno);

router.get('/listarTodasDisciplinas', DisciplinaController.listarDisciplinas);
router.post('/cadastrarDisciplina', DisciplinaController.cadastrarDisciplina);
router.put('/atualizarDisciplina/:disciplinaId', DisciplinaController.atualizarDisciplina);


router.get('/listarTodasDisciplinas', AlunoDisciplinaController.vincularAlunoADisciplina);
router.post('/cadastrarDisciplina', AlunoDisciplinaController.listarDisciplinasDoAluno);

router.get("/listarDisciplinasDoAluno/:alunoId", AlunoDisciplinaController.listarDisciplinasDoAluno);
router.post("/vincularAlunoADisciplina", AlunoDisciplinaController.vincularAlunoADisciplina);


export default router;
