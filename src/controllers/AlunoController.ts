import { Request, Response } from "express";
import { Aluno } from "../models/Aluno";

export const listarAlunos = async (req: Request, res: Response ) : Promise<any> => {
    const alunos = await Aluno.findAll();
    return res.json(alunos);
};

export const cadastrarAluno = async (req: Request, res: Response) : Promise<any> => {
    const { nome, email, matricula } = req.body;

    let novoAluno = await Aluno.create ({ nome, email, matricula});

    res.status(201).json({
        message: "Aluno cadastrar com sucesso.",
        novoAluno
    });
};

export const atualizarAluno = async (req: Request, res: Response) : Promise<any> => {
    try {
        const { alunoId } = req.params;
        const dadosAtualizados = req.body;
        
        const aluno = await Aluno.findByPk(alunoId);
        if (!aluno) {
            return res.status(404).json({error: "Aluno não encontrado"});

        }

        await aluno.update(dadosAtualizados, {fields: Object.keys(dadosAtualizados) });

        return res.status(200).json({message:"Aluno atualizado com sucesso.", aluno});
    }catch (error) {
        res.status(500).json({message: "Erro ao atualizar aluno.", error });
    }
};

export const deletarAluno = async (req: Request, res: Response) : Promise<any> => {
    const { alunoId } = req.params;
    let aluno = await  Aluno.findByPk(alunoId);

    if (aluno){
    await aluno.destroy();
    return res.json({message: "Aluno deletado com sucesso." });
    }

    return res.status(404).json({error: "Aluno não econtrado." });
}




