CREATE DATABASE IF NOT EXISTS gallerydb;
USE gallerydb;

CREATE TABLE IF NOT EXISTS artists (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    bio TEXT,
    birth_year INT,
    instagram VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS arts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    year INT,
    image_url VARCHAR(255),
    artist_id INT,
    FOREIGN KEY (artist_id) REFERENCES artists(id)
);

CREATE TABLE IF NOT EXISTS exhibitions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS exhibition_artworks (
    exhibition_id INT,
    art_id INT,
    FOREIGN KEY (exhibition_id) REFERENCES exhibitions(id),
    FOREIGN KEY (art_id) REFERENCES arts(id),
    PRIMARY KEY (exhibition_id, art_id)
);
