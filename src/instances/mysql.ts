import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'mysql',  // Alterado para MySQL
  host: process.env.DB_HOST,     // Ex: 'localhost'
  port: parseInt(process.env.DB_PORT || '3306'),  // Porta padrão do MySQL
  username: process.env.DB_USER, // Ex: 'root'
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // Nome do banco criado no MySQL
});



/*
//CRIAÇÃO DA MINHA CONEXÃO COM O BANCO DE DADOS COM MYSQL
export const sequelize = new Sequelize(
    // process.env.MYSQL_HOST as string,
    process.env.MYSQL_DB as string,
    process.env.MYSQL_USER as string,
    process.env.MYSQL_PASSWORD as string,
    {
        dialect: 'mysql',
        port: parseInt(process.env.MYSQL_PORT as string),
        host: process.env.MYSQL_HOST
    }
);*/



// Função para testar a conexão
export const conectarBanco = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Conectado ao banco de dados com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco de dados:", error);
    }
};