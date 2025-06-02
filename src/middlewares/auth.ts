import { Request, Response, NextFunction, } from 'express';
import jwt from 'jsonwebtoken';
import { Professor } from '../models/Professor';
import { Aluno } from '../models/Aluno';

const JWT_SECRET = process.env.JWT_SECRET || 'senha_secreta_123'

declare module 'express' {
  interface Request {
    user?: {
      id: number;
      tipo: 'professor' | 'aluno';
      nome: string;
    };
  }
}

// Middleware principal de autenticação
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; tipo: string; nome: string };
    
    // Verifica se o usuário ainda existe no banco
    const UserModel = decoded.tipo === 'professor' ? Professor : Aluno;
    const user = await UserModel.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido.' });
  }
};

// Middleware para permitir apenas professores
export const apenasProfessor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.tipo !== 'professor') {
    return res.status(403).json({ error: 'Acesso restrito a professores.' });
  }
  next();
};

// Middleware para bloquear alunos
export const alunoNaoPermitido = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.tipo === 'aluno') {
    return res.status(403).json({ error: 'Alunos não têm permissão.' });
  }
  next();
};

  

  /*try {
    const decoded = jwt.verify(token, JWT_SECRET!) as Permissao;
    (req as Request & { user: Permissao }).user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido.' });
  }*/
