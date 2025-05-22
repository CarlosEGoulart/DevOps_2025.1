// Arquivo de configuração do banco de dados MySQL
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

class Database {
  private static instance: Database;
  private pool: mysql.Pool;

  private constructor() {
    this.pool = mysql.createPool({
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

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async query(sql: string, params: any[] = []): Promise<any> {
    try {
      const [results] = await this.pool.execute(sql, params);
      return results;
    } catch (error) {
      console.error('Erro na consulta SQL:', error);
      throw error;
    }
  }

  public async getConnection(): Promise<mysql.PoolConnection> {
    try {
      return await this.pool.getConnection();
    } catch (error) {
      console.error('Erro ao obter conexão:', error);
      throw error;
    }
  }

  public async testConnection(): Promise<boolean> {
    try {
      const connection = await this.pool.getConnection();
      connection.release();
      console.log('Conexão com o banco de dados MySQL estabelecida com sucesso.');
      return true;
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados MySQL:', error);
      return false;
    }
  }

  public async close(): Promise<void> {
    try {
      await this.pool.end();
      console.log('Conexão com o banco de dados MySQL fechada.');
    } catch (error) {
      console.error('Erro ao fechar conexão com o banco de dados:', error);
      throw error;
    }
  }
}

export async function initDatabase(): Promise<boolean> {
  const db = Database.getInstance();
  return await db.testConnection();
}

export default Database;
