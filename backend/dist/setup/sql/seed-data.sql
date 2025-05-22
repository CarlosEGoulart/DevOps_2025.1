-- Script SQL para inserir dados iniciais no banco de dados
-- Inserir artistas
INSERT INTO artist (name, bio, year, instagram) VALUES 
('Pablo Picasso', 'Artista espanhol, fundador do cubismo', 1881, '@picasso_legacy'),
('Frida Kahlo', 'Pintora mexicana conhecida por seus autorretratos', 1907, '@frida_kahlo_foundation'),
('Salvador Dalí', 'Mestre do surrealismo', 1904, '@dali_universe');

-- Inserir obras de arte
INSERT INTO art (title, description, year, url_image, artist_id) VALUES 
('Guernica', 'Obra-prima que retrata os horrores da Guerra Civil Espanhola', 1937, 'https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg', 1),
('As Duas Fridas', 'Autorretrato duplo de Frida Kahlo', 1939, 'https://upload.wikimedia.org/wikipedia/en/8/8f/The_Two_Fridas.jpg', 2),
('A Persistência da Memória', 'Famosa obra surrealista com relógios derretidos', 1931, 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg', 3);

-- Inserir exposições
INSERT INTO exhibition (name, description) VALUES 
('Modernismo Europeu', 'Exposição sobre o movimento modernista na Europa'),
('Arte Latino-Americana', 'Celebração da arte e cultura latino-americana'),
('Surrealismo e Além', 'Explorando o movimento surrealista e seu legado');

-- Relacionar obras e exposições
INSERT INTO exhibition_art (exhibition_id, art_id) VALUES 
(1, 1), -- Guernica na exposição Modernismo Europeu
(2, 2), -- As Duas Fridas na exposição Arte Latino-Americana
(3, 3); -- A Persistência da Memória na exposição Surrealismo e Além
