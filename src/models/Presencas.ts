import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export class Presencas extends Model {
  public id!: number;
  public alunoId!: number | null;
  public disciplinaId!: number | null;
  public data!: Date | null;
  public presente!: number | null;  
}
 Presencas.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    alunoID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
    },
    disciplinaId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
    },
    data: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    presente: {
        type: DataTypes.TINYINT,
        allowNull: true,
    }
  },
  {
    sequelize,
    tableName: "presencas",
    timestamps: false,
  }
);