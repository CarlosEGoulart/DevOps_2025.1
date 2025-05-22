"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Script de configuração do banco de dados SQLite
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const dotenv_1 = __importDefault(require("dotenv"));
// Carrega as variáveis de ambiente
dotenv_1.default.config();
// Caminho do banco de dados
const dbPath = process.env.DB_PATH || './database.sqlite';
// Verifica se o arquivo do banco de dados já existe
const dbExists = fs_1.default.existsSync(dbPath);
// Cria o diretório se não existir
const dbDir = path_1.default.dirname(dbPath);
if (!fs_1.default.existsSync(dbDir)) {
    fs_1.default.mkdirSync(dbDir, { recursive: true });
}
// Conecta ao banco de dados
const db = new sqlite3_1.default.Database(dbPath);
// Script SQL para criar as tabelas
const createTablesSQL = `
-- Tabela de Artistas
CREATE TABLE IF NOT EXISTS artists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  bio TEXT,
  birth_year INTEGER,
  instagram TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Obras de Arte
CREATE TABLE IF NOT EXISTS arts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  year INTEGER,
  image_url TEXT,
  artist_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (artist_id) REFERENCES artists (id)
);

-- Tabela de Exposições
CREATE TABLE IF NOT EXISTS exhibitions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  date TEXT,
  location TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de relação entre Obras e Exposições
CREATE TABLE IF NOT EXISTS exhibition_arts (
  exhibition_id INTEGER,
  art_id INTEGER,
  PRIMARY KEY (exhibition_id, art_id),
  FOREIGN KEY (exhibition_id) REFERENCES exhibitions (id),
  FOREIGN KEY (art_id) REFERENCES arts (id)
);
`;
// Dados iniciais para popular o banco
const seedDataSQL = `
-- Inserir artistas
INSERT INTO artists (name, bio, birth_year, instagram) VALUES 
('Pablo Picasso', 'Artista espanhol, fundador do cubismo', 1881, '@picasso_legacy'),
('Frida Kahlo', 'Pintora mexicana conhecida por seus autorretratos', 1907, '@frida_kahlo_foundation'),
('Salvador Dalí', 'Mestre do surrealismo', 1904, '@dali_universe');

-- Inserir obras de arte
INSERT INTO arts (title, description, year, image_url, artist_id) VALUES 
('Guernica', 'Obra-prima que retrata os horrores da Guerra Civil Espanhola', 1937, 'https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg', 1),
('As Duas Fridas', 'Autorretrato duplo de Frida Kahlo', 1939, 'https://upload.wikimedia.org/wikipedia/en/8/8f/The_Two_Fridas.jpg', 2),
('A Persistência da Memória', 'Famosa obra surrealista com relógios derretidos', 1931, 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg', 3);

-- Inserir exposições
INSERT INTO exhibitions (name, date, location, description) VALUES 
('Modernismo Europeu', '2025-06-15', 'Museu de Arte Moderna', 'Exposição sobre o movimento modernista na Europa'),
('Arte Latino-Americana', '2025-07-20', 'Galeria Nacional', 'Celebração da arte e cultura latino-americana'),
('Surrealismo e Além', '2025-08-10', 'Centro Cultural', 'Explorando o movimento surrealista e seu legado');

-- Relacionar obras e exposições
INSERT INTO exhibition_arts (exhibition_id, art_id) VALUES 
(1, 1), -- Guernica na exposição Modernismo Europeu
(2, 2), -- As Duas Fridas na exposição Arte Latino-Americana
(3, 3); -- A Persistência da Memória na exposição Surrealismo e Além
`;
console.log('Configurando o banco de dados...');
// Executa o script para criar as tabelas
db.exec(createTablesSQL, (err) => {
    if (err) {
        console.error('Erro ao criar tabelas:', err.message);
        process.exit(1);
    }
    console.log('Tabelas criadas com sucesso!');
    // Se o banco de dados não existia antes, popula com dados iniciais
    if (!dbExists) {
        console.log('Populando o banco de dados com dados iniciais...');
        db.exec(seedDataSQL, (err) => {
            if (err) {
                console.error('Erro ao popular o banco de dados:', err.message);
                process.exit(1);
            }
            console.log('Dados iniciais inseridos com sucesso!');
            console.log('Configuração do banco de dados concluída.');
            // Fecha a conexão com o banco de dados
            db.close();
        });
    }
    else {
        console.log('Banco de dados já existente, pulando a inserção de dados iniciais.');
        console.log('Configuração do banco de dados concluída.');
        // Fecha a conexão com o banco de dados
        db.close();
    }
});
