// Arquivo index.ts - Ponto de entrada da aplicação
import express from 'express';
import { setupServer } from './server';
import { initDatabase } from './config/database';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

async function startServer() {
  try {
    // Inicializa o banco de dados
    const dbInitialized = await initDatabase();
    
    if (!dbInitialized) {
      console.error('Falha ao inicializar o banco de dados. Verifique a configuração e tente novamente.');
      process.exit(1);
    }
    
    // Cria e configura o servidor Express
    const app = express();
    setupServer(app);
    
    // Define a porta do servidor
    const PORT = process.env.PORT || 3000;
    
    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log('Banco de dados conectado e inicializado');
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

// Inicia o servidor
startServer();
