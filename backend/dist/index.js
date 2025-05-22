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
// Arquivo index.ts - Ponto de entrada da aplicação
const express_1 = __importDefault(require("express"));
const server_1 = require("./server");
const database_1 = require("./config/database");
const dotenv_1 = __importDefault(require("dotenv"));
// Carrega as variáveis de ambiente
dotenv_1.default.config();
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Inicializa o banco de dados
            const dbInitialized = yield (0, database_1.initDatabase)();
            if (!dbInitialized) {
                console.error('Falha ao inicializar o banco de dados MySQL. Verifique a configuração e tente novamente.');
                process.exit(1);
            }
            // Cria e configura o servidor Express
            const app = (0, express_1.default)();
            (0, server_1.setupServer)(app);
            // Define a porta do servidor
            const PORT = process.env.PORT || 3000;
            // Inicia o servidor
            app.listen(PORT, () => {
                console.log(`Servidor rodando em http://localhost:${PORT}`);
                console.log('Banco de dados MySQL conectado e inicializado');
            });
        }
        catch (error) {
            console.error('Erro ao iniciar o servidor:', error);
            process.exit(1);
        }
    });
}
// Inicia o servidor
startServer();
