import { Aluno } from "./Aluno";
import { Disciplina } from "./Disciplina";
import { AlunoDisciplina } from "./AlunoDisciplina";
import { Professor } from "./Professor";
import { Turmas } from "./Turmas";
import { Cursos } from "./Cursos";
import { Presencas } from "./Presencas";
import { Notas } from "./Notas";

// 🔹 Criando a relação muitos-para-muitos entre Aluno e Disciplina
// Um aluno pode estar matriculado em várias disciplinas
// E uma disciplina pode ter vários alunos

Aluno.belongsToMany(Disciplina, { 
    through: AlunoDisciplina, // Tabela intermediária (tabela de junção)
    foreignKey: "alunoId" // Chave estrangeira que referencia a tabela alunos
});

Disciplina.belongsToMany(Aluno, { 
    through: AlunoDisciplina, // Tabela intermediária (tabela de junção)
    foreignKey: "disciplinaId" // Chave estrangeira que referencia a tabela disciplinas
});

Cursos.hasMany(Turmas ,{foreignKey: "id_curso"});
Turmas.belongsTo(Cursos , { foreignKey: "id_curso"});

Turmas.hasMany(Aluno, { foreignKey: "id_turma"});
Aluno.belongsTo(Turmas, { foreignKey: "id_turma"});

Aluno.hasMany(Presencas, { foreignKey: "alunoId"});
Presencas.belongsTo(Aluno, { foreignKey: "alunoId"});

Aluno.hasMany(Notas, { foreignKey: "alunoId"});
Notas.belongsTo(Aluno, { foreignKey: "alunoId"});

Professor.hasMany(Disciplina, { foreignKey: "id_professor"});
Disciplina.belongsTo(Professor, { foreignKey: "id_professor"});

Disciplina.hasMany(Presencas, { foreignKey: "disciplinaId"});
Disciplina.hasMany(Notas, { foreignKey: "disciplinaId"});


console.log("✅ Relações entre models configuradas!");

