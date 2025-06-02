import { Router } from 'express';
import { authMiddleware, apenasProfessor, alunoNaoPermitido } from '../middlewares/auth';
import { Aluno } from '../models/Aluno';
import { Professor } from '../models/Professor'

const router = Router();

router.use(authMiddleware);

router.get('/dashboard', (req, res) => {
  res.json({
    message: `Bem-vindo, ${req.user?.nome}!`,
    userType: req.user?.tipo
  });
});

router.get('/listarProfessores', async (req, res) => {
  const professores = await Professor.findAll({
    attributes: ['id', 'nome', 'siape']
  });
  res.json(professores);
});

router.get('/listarAlunos', alunoNaoPermitido, async (req, res) => {
  const alunos = await Aluno.findAll({
    attributes: ['id', 'nome', 'matricula']
  });
  res.json(alunos);
});

export default router;