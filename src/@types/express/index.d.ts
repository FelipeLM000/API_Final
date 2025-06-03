// src/@types/express/index.d.ts
import { Professor, Aluno } from '../../models';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        tipo: 'professor' | 'aluno';
        nome: string;
      };
    }
  }
}