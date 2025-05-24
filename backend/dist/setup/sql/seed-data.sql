-- Limpar tabelas e resetar auto-incremento
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE exhibition_art;
TRUNCATE TABLE art;
TRUNCATE TABLE exhibition;
TRUNCATE TABLE artist;
SET FOREIGN_KEY_CHECKS = 1;

-- Script SQL para inserir dados iniciais no banco de dados
-- Inserir artistas
INSERT INTO artist (name, bio, year, instagram) VALUES 
('Ana Julia Costa Zvierzykovski', 'Estudante de arte na Unicentro.', 2005, '@jxliaazy'),
('Carlos', 'Namorado da Julia', 2004, '@carlllos.png');

-- Inserir obras de arte
INSERT INTO art (title, description, year, url_image, artist_id) VALUES 
('Gato mafioso', 'Um gato que esconde a fonte de sua fortuna', 2024, 'https://example.com/gato-mafioso.jpg', 1),
('Ganso de Terno', 'Um ganso vestindo terno e usando um monoculo', 2024, 'https://example.com/ganso-de-terno.jpg', 1);

-- Inserir exposições
INSERT INTO exhibition (name, description) VALUES 
('Exibição da Julia', 'Exposição sobre obras de arte da artista Julia Zy.'),
('Exibição do Carlos', 'Exposição sobre obras de arte do artista Carlos.');

-- Relacionar obras e exposições
INSERT INTO exhibition_art (exhibition_id, art_id) VALUES 
(1, 1), 
(1, 2);
