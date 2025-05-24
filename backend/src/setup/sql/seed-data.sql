-- Script SQL para inserir dados iniciais no banco de dados
-- Inserir artistas
INSERT INTO artist (name, bio, year, instagram) VALUES 
('Ana Julia Costa Zvierzykovski', 'Estudante de arte na Unicentro.', 2005, '@jxliaazy'),
('Carlos', 'Namorado da Julia', 2004, '@carlllos.png');

-- Inserir obras de arte
INSERT INTO art (title, description, year, url_image, artist_id) VALUES 
('Gato mafioso', 'Um gato vestindo terno que esconde o segredo da origem de sua fortuna', 2024, 'a', 1),
('Ganso de Terno', 'Um ganso de classe', 2024, 'a', 1);

-- Inserir exposições
INSERT INTO exhibition (name, description) VALUES 
('Exibição de obras da Julia', 'Exposição sobre as obras da Julia');

-- Relacionar obras e exposições
INSERT INTO exhibition_art (exhibition_id, art_id) VALUES 
(1, 1), 
(1, 2);
