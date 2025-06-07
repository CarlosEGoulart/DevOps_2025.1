-- SQL script to create tables for Goski Gallery CRUD application

-- Drop tables if they exist
DROP TABLE IF EXISTS exhibition_art;
DROP TABLE IF EXISTS exhibition;
DROP TABLE IF EXISTS art;
DROP TABLE IF EXISTS artist;

-- Create artist table
CREATE TABLE artist (
  artist_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  bio TEXT,
  year INT,
  instagram VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create art table
CREATE TABLE art (
  art_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  year INT,
  url_image VARCHAR(255),
  artist_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (artist_id) REFERENCES artist(artist_id) ON DELETE SET NULL
);

-- Create exhibition table
CREATE TABLE exhibition (
  exhibition_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create exhibition_art junction table
CREATE TABLE exhibition_art (
  exhibition_art_id INT AUTO_INCREMENT PRIMARY KEY,
  exhibition_id INT NOT NULL,
  art_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (exhibition_id) REFERENCES exhibition(exhibition_id) ON DELETE CASCADE,
  FOREIGN KEY (art_id) REFERENCES art(art_id) ON DELETE CASCADE,
  UNIQUE KEY (exhibition_id, art_id)
);

-- Insert sample data for artists
INSERT INTO artist (name, bio, year, instagram) VALUES 
('Vincent van Gogh', 'Dutch post-impressionist painter', 1853, '@vangogh'),
('Leonardo da Vinci', 'Italian Renaissance polymath', 1452, '@leonardo'),
('Salvador Dalí', 'Spanish surrealist painter', 1904, '@dali');

-- Insert sample data for art pieces
INSERT INTO art (title, description, year, url_image, artist_id) VALUES 
('Starry Night', 'A beautiful night sky painting', 1889, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg', 1),
('Mona Lisa', 'Famous portrait painting', 1503, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg', 2),
('The Persistence of Memory', 'Surrealist painting with melting clocks', 1931, 'https://uploads6.wikiart.org/images/salvador-dali/the-persistence-of-memory-1931.jpg', 3);

-- Insert sample data for exhibitions
INSERT INTO exhibition (name, description) VALUES 
('Modern Masterpieces', 'A collection of modern art masterpieces'),
('Renaissance Wonders', 'Exhibition featuring Renaissance art'),
('Surrealism Showcase', 'Exploring the world of surrealist art');

-- Link art pieces to exhibitions
INSERT INTO exhibition_art (exhibition_id, art_id) VALUES 
(1, 1), -- Starry Night in Modern Masterpieces
(2, 2), -- Mona Lisa in Renaissance Wonders
(3, 3), -- The Persistence of Memory in Surrealism Showcase
(1, 3); -- The Persistence of Memory also in Modern Masterpieces
