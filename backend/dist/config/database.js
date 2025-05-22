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
exports.initDatabase = initDatabase;
// Arquivo de configuração do banco de dados SQLite
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const dotenv_1 = __importDefault(require("dotenv"));
// Carrega as variáveis de ambiente
dotenv_1.default.config();
// Caminho do banco de dados
const dbPath = process.env.DB_PATH || './database.sqlite';
class Database {
    constructor() {
        this.db = null;
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.db = yield (0, sqlite_1.open)({
                    filename: dbPath,
                    driver: sqlite3_1.default.Database
                });
                console.log('Conexão com o banco de dados estabelecida.');
                return true;
            }
            catch (error) {
                console.error('Erro ao conectar ao banco de dados:', error);
                return false;
            }
        });
    }
    query(sql_1) {
        return __awaiter(this, arguments, void 0, function* (sql, params = []) {
            try {
                return yield this.db.all(sql, params);
            }
            catch (error) {
                console.error('Erro na consulta SQL:', error);
                throw error;
            }
        });
    }
    get(sql_1) {
        return __awaiter(this, arguments, void 0, function* (sql, params = []) {
            try {
                return yield this.db.get(sql, params);
            }
            catch (error) {
                console.error('Erro na consulta SQL (get):', error);
                throw error;
            }
        });
    }
    run(sql_1) {
        return __awaiter(this, arguments, void 0, function* (sql, params = []) {
            try {
                return yield this.db.run(sql, params);
            }
            catch (error) {
                console.error('Erro na execução SQL:', error);
                throw error;
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db) {
                yield this.db.close();
                console.log('Conexão com o banco de dados fechada.');
            }
        });
    }
}
function initDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = Database.getInstance();
        return yield db.connect();
    });
}
exports.default = Database;
