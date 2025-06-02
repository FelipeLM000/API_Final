import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";
import { AllowNull } from "sequelize-typescript";

export class Turmas extends Model {
  public id!: number;
  public nome!: string;
  public periodo!: string | null;
  public id_curso!: number | null
}

Turmas.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    periodo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    id_curso: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
    }
  },
  {
    sequelize,
    tableName: "turmas",
    timestamps: false,
  }
);