import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'senha_secreta_123'

interface MeuPayLoad {
  id: number;
  tipo: 'aluno' | 'professor';
}

export const autenticarToken = async (
  req: Request & { user?: MeuPayLoad },
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Token não fornecido.' });
    return 
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as MeuPayLoad;
    (req as Request & { user: MeuPayLoad }).user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido.' });
  }
};