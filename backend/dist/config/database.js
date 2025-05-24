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
exports.initDatabase = void 0;
// Arquivo de configuração do banco de dados MySQL
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
// Carrega as variáveis de ambiente
dotenv_1.default.config();
class Database {
    constructor() {
        this.pool = promise_1.default.createPool({
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '3306'),
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'galeria_arte',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    query(sql, params = []) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [results] = yield this.pool.execute(sql, params);
                return results;
            }
            catch (error) {
                console.error('Erro na consulta SQL:', error);
                throw error;
            }
        });
    }
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.pool.getConnection();
            }
            catch (error) {
                console.error('Erro ao obter conexão:', error);
                throw error;
            }
        });
    }
    testConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield this.pool.getConnection();
                connection.release();
                console.log('Conexão com o banco de dados MySQL estabelecida com sucesso.');
                return true;
            }
            catch (error) {
                console.error('Erro ao conectar ao banco de dados MySQL:', error);
                return false;
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.end();
                console.log('Conexão com o banco de dados MySQL fechada.');
            }
            catch (error) {
                console.error('Erro ao fechar conexão com o banco de dados:', error);
                throw error;
            }
        });
    }
}
function initDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = Database.getInstance();
        return yield db.testConnection();
    });
}
exports.initDatabase = initDatabase;
exports.default = Database;
