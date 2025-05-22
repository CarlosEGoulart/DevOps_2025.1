"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Script de configuração do banco de dados MySQL
const promise_1 = __importDefault(require("mysql2/promise"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// Carrega as variáveis de ambiente
dotenv_1.default.config();
function setupDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Iniciando configuração do banco de dados MySQL...');
        // Configurações de conexão
        const config = {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '3306'),
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            multipleStatements: true
        };
        try {
            // Conectar ao MySQL (sem selecionar um banco específico)
            const connection = yield promise_1.default.createConnection(config);
            // Nome do banco de dados
            const dbName = process.env.DB_NAME || 'galeria_arte';
            // Criar o banco de dados se não existir
            console.log(`Criando banco de dados ${dbName} se não existir...`);
            yield connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
            // Usar o banco de dados
            console.log(`Usando banco de dados ${dbName}...`);
            yield connection.query(`USE ${dbName}`);
            // Ler o arquivo SQL para criar as tabelas
            const createTablesSqlPath = path_1.default.join(__dirname, 'sql', 'create-tables.sql');
            const createTablesSql = fs_1.default.readFileSync(createTablesSqlPath, 'utf8');
            // Executar o script para criar as tabelas
            console.log('Criando tabelas...');
            yield connection.query(createTablesSql);
            // Verificar se já existem dados
            const [rows] = yield connection.query('SELECT COUNT(*) as count FROM artist');
            const count = rows[0].count;
            // Se não houver dados, inserir dados iniciais
            if (count === 0) {
                console.log('Inserindo dados iniciais...');
                const seedDataSqlPath = path_1.default.join(__dirname, 'sql', 'seed-data.sql');
                const seedDataSql = fs_1.default.readFileSync(seedDataSqlPath, 'utf8');
                yield connection.query(seedDataSql);
                console.log('Dados iniciais inseridos com sucesso!');
            }
            else {
                console.log('Banco de dados já possui dados, pulando a inserção de dados iniciais.');
            }
            // Fechar a conexão
            yield connection.end();
            console.log('Configuração do banco de dados MySQL concluída com sucesso!');
            return true;
        }
        catch (error) {
            console.error('Erro durante a configuração do banco de dados:', error);
            return false;
        }
    });
}
// Executar a configuração
setupDatabase()
    .then(success => {
    if (success) {
        console.log('Banco de dados configurado com sucesso!');
        process.exit(0);
    }
    else {
        console.error('Falha na configuração do banco de dados.');
        process.exit(1);
    }
})
    .catch(error => {
    console.error('Erro não tratado:', error);
    process.exit(1);
});
