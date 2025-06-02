import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export class Notas extends Model {
  public id!: number;
  public nota!: number | null;
  public data_avaliacao!: Date | null;
  public disciplininaId!: number | null;
  public alunoId!: number | null;
}

Notas.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    disciplinaId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: true,
    },
    alunoId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: true,
    },
    nota: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true,
    },
    data_avaliacao: {
        type: DataTypes.DATE,
        allowNull: true,
    }
  },
  {
    sequelize,
    tableName: "notas",
    timestamps: false,
  }
);