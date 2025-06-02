import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Aluno from '../models/Aluno';
import Professor from '../models/Professor';
import { Model, ModelStatic } from 'sequelize';

type UserModel = typeof Aluno | typeof Professor;
type UserInstance = InstanceType<UserModel>;

interface LoginRequest {
    identificador: string;
    senha: string;
}

export const login = async (req: Request<{}, {}, LoginRequest>, res: Response) => {
    const { identificador, senha } = req.body;

    try {
        const isProfessor = identificador.startsWith('SP');
        const UserModel: ModelStatic<Model> = isProfessor ? Professor : Aluno;
        const campoIdentificador = isProfessor ? 'siape' : 'matricula';

        const user = await UserModel.findOne({
            where: {
                [campoIdentificador]: identificador
            }
        });

        if (!user) {
            res.status(401).json({ error: 'Credenciais inválidas.' });
            return
        }

        const userData = user.get({ plain: true }) as UserInstance;

        const senhaValida = await bcrypt.compare(senha, userData.senha);
        if (!senhaValida) {
            res.status(401).json({ error: 'Credenciais inválidas.' });
            return
        }

        const token = jwt.sign(
            {
                id: userData.id,
                tipo: isProfessor ? 'professor' : 'aluno',
                nome: userData.nome
            },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: userData.id,
                nome: userData.nome,
                tipo: isProfessor ? 'professor' : 'aluno',
                [campoIdentificador]: identificador
            }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro no servidor.' });
    }
};