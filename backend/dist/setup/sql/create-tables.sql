-- Script SQL para criar as tabelas do banco de dados conforme o modelo lógico
-- Tabela de Artistas
CREATE TABLE IF NOT EXISTS artist (
  artist_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  year INT COMMENT 'Ano de nascimento',
  instagram VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Obras de Arte
CREATE TABLE IF NOT EXISTS art (
  art_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  year INT COMMENT 'Ano da obra',
  url_image VARCHAR(255),
  artist_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (artist_id) REFERENCES artist(artist_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Exposições
CREATE TABLE IF NOT EXISTS exhibition (
  exhibition_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de relação entre Obras e Exposições
CREATE TABLE IF NOT EXISTS exhibition_art (
  exhibition_art_id INT AUTO_INCREMENT PRIMARY KEY,
  art_id INT,
  exhibition_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (art_id) REFERENCES art(art_id) ON DELETE CASCADE,
  FOREIGN KEY (exhibition_id) REFERENCES exhibition(exhibition_id) ON DELETE CASCADE,
  UNIQUE KEY unique_exhibition_art (exhibition_id, art_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
