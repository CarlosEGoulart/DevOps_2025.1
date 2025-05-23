-- Script SQL para inserir dados iniciais no banco de dados
-- Inserir artistas
INSERT INTO artist (name, bio, year, instagram) VALUES 
('Ana Julia Costa Zvierzykovski', 'Estudante de arte na Unicentro.', 2005, '@jxliaazy'),
('Carlos', 'Namorado da Julia', 2004, '@carlllos.png');

-- Inserir obras de arte
INSERT INTO art (title, description, year, url_image, artist_id) VALUES 
('Ganso de Terno', 'Um ganso vestindo terno e usando um monoculo.', 2024, '', 1),
('Gato mafioso', 'Um gato que esconde a fonte de sua fortuna.', 2024, '', 1);

-- Inserir exposições
INSERT INTO exhibition (name, description) VALUES 
('Artes da Julia', 'Exposição sobre obras de arte da artista Julia Zy.');

-- Relacionar obras e exposições
INSERT INTO exhibition_art (exhibition_id, art_id) VALUES 
(1, 1), -- Artes da Julia recebendo Ganso de Terno
(1, 2); -- Artes da Julia recebendo Gato mafioso
