import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

// 🔹 Criamos a classe `Aluno`, que estende `Model`.
// Essa classe serve apenas para definir a estrutura dos dados que essa entidade terá no TypeScript.
// Ou seja, define a tipagem dos atributos, mas ainda não os conecta ao Sequelize.
export class Professor extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
  public siape!: string;
  public senha!: string;
}

// 🔹 Aqui é onde realmente informamos ao Sequelize como a tabela "alunos" deve ser criada no banco de dados.
// 1️⃣ O primeiro parametro define os atributos da tabela e suas regras (tipos, se são únicos, se podem ser nulos, etc.).
// 2️⃣ O segundo parametro configurações gerais da tabela, como nome e timestamps.
Professor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    siape: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize, // 🔹 Aqui passamos a instância do Sequelize, conectando essa model ao banco
    tableName: "professores", // Define o nome da tabela no banco de dados
    paranoid:true,
    timestamps: true, // Como não queremos colunas de "createdAt" e "updatedAt", desativamos timestamps
  }
);

export default Professor;