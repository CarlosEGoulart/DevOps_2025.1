// Arquivo de configuração do banco de dados SQLite
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

// Caminho do banco de dados
const dbPath = process.env.DB_PATH || './database.sqlite';

class Database {
  private static instance: Database;
  private db: any = null;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect() {
    try {
      this.db = await open({
        filename: dbPath,
        driver: sqlite3.Database
      });
      
      console.log('Conexão com o banco de dados estabelecida.');
      return true;
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
      return false;
    }
  }

  public async query(sql: string, params: any[] = []) {
    try {
      return await this.db.all(sql, params);
    } catch (error) {
      console.error('Erro na consulta SQL:', error);
      throw error;
    }
  }

  public async get(sql: string, params: any[] = []) {
    try {
      return await this.db.get(sql, params);
    } catch (error) {
      console.error('Erro na consulta SQL (get):', error);
      throw error;
    }
  }

  public async run(sql: string, params: any[] = []) {
    try {
      return await this.db.run(sql, params);
    } catch (error) {
      console.error('Erro na execução SQL:', error);
      throw error;
    }
  }

  public async close() {
    if (this.db) {
      await this.db.close();
      console.log('Conexão com o banco de dados fechada.');
    }
  }
}

export async function initDatabase() {
  const db = Database.getInstance();
  return await db.connect();
}

export default Database;
