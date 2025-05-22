// Script de configuração do banco de dados MySQL
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

async function setupDatabase() {
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
    const connection = await mysql.createConnection(config);
    
    // Nome do banco de dados
    const dbName = process.env.DB_NAME || 'galeria_arte';
    
    // Criar o banco de dados se não existir
    console.log(`Criando banco de dados ${dbName} se não existir...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    
    // Usar o banco de dados
    console.log(`Usando banco de dados ${dbName}...`);
    await connection.query(`USE ${dbName}`);
    
    // Ler o arquivo SQL para criar as tabelas
    const createTablesSqlPath = path.join(__dirname, 'sql', 'create-tables.sql');
    const createTablesSql = fs.readFileSync(createTablesSqlPath, 'utf8');
    
    // Executar o script para criar as tabelas
    console.log('Criando tabelas...');
    await connection.query(createTablesSql);
    
    // Verificar se já existem dados
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM artist');
    const count = (rows as any)[0].count;
    
    // Se não houver dados, inserir dados iniciais
    if (count === 0) {
      console.log('Inserindo dados iniciais...');
      const seedDataSqlPath = path.join(__dirname, 'sql', 'seed-data.sql');
      const seedDataSql = fs.readFileSync(seedDataSqlPath, 'utf8');
      await connection.query(seedDataSql);
      console.log('Dados iniciais inseridos com sucesso!');
    } else {
      console.log('Banco de dados já possui dados, pulando a inserção de dados iniciais.');
    }
    
    // Fechar a conexão
    await connection.end();
    
    console.log('Configuração do banco de dados MySQL concluída com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro durante a configuração do banco de dados:', error);
    return false;
  }
}

// Executar a configuração
setupDatabase()
  .then(success => {
    if (success) {
      console.log('Banco de dados configurado com sucesso!');
      process.exit(0);
    } else {
      console.error('Falha na configuração do banco de dados.');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Erro não tratado:', error);
    process.exit(1);
  });
