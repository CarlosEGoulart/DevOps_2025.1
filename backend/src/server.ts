// Arquivo principal do servidor
import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes';

// Carrega as variáveis de ambiente
dotenv.config();

// Configuração do servidor Express
export function setupServer(app: express.Application) {
  // Configuração de CORS para permitir requisições de diferentes origens
  app.use(cors());
  
  // Middleware para processar JSON no corpo das requisições
  app.use(express.json());
  
  // Rotas da API - prefixadas com /api
  app.use('/api', router);
  
  // Servir arquivos estáticos do frontend
  app.use(express.static(path.resolve(__dirname, '../../frontend')));
  
  // Middleware para tratamento de erros
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Ocorreu um erro ao processar sua requisição'
    });
  });
  
  // Rota para qualquer outra requisição - redireciona para o frontend
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/index.html'));
  });
  
  return app;
}
