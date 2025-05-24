"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupServer = void 0;
// Arquivo principal do servidor
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
// Carrega as variáveis de ambiente
dotenv_1.default.config();
// Configuração do servidor Express
function setupServer(app) {
    // Configuração de CORS para permitir requisições de diferentes origens
    app.use((0, cors_1.default)());
    // Middleware para processar JSON no corpo das requisições
    app.use(express_1.default.json());
    // Rotas da API - prefixadas com /api
    app.use('/api', routes_1.router);
    // Servir arquivos estáticos do frontend
    app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../frontend')));
    // Middleware para tratamento de erros
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({
            error: 'Erro interno do servidor',
            message: process.env.NODE_ENV === 'development' ? err.message : 'Ocorreu um erro ao processar sua requisição'
        });
    });
    // Rota para qualquer outra requisição - redireciona para o frontend
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, '../../frontend/index.html'));
    });
    return app;
}
exports.setupServer = setupServer;
