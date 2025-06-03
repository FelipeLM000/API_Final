import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Professor } from '../models/Professor';
import { Aluno } from '../models/Aluno';
import { ModelStatic } from 'sequelize';

const JWT_SECRET = process.env.JWT_SECRET || 'senha_secreta_123';

// Tipagem para o payload do token
interface TokenPayload {
  id: number;
  tipo: 'professor' | 'aluno';
  nome: string;
}

// Middleware principal de autenticação
export const autenticar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    
    // Verifica se o usuário existe no banco
    const UserModel: ModelStatic<Professor | Aluno> = 
      decoded.tipo === 'professor' ? Professor : Aluno;
    const user = await UserModel.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    // Adiciona o usuário à requisição
    req.user = {
      id: decoded.id,
      tipo: decoded.tipo,
      nome: decoded.nome
    };
    
    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return res.status(401).json({ error: 'Token inválido.' });
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