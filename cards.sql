CREATE DATABASE IF NOT EXISTS cards;
USE cards;

DROP TABLE IF EXISTS Cards;

CREATE TABLE Cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    image VARCHAR(255) NOT NULL,
    season INT DEFAULT 1,
    current TINYINT DEFAULT 0,
    publish VARCHAR(255)
);

INSERT INTO Cards (name, image, season, publish) VALUES (
    'Rent-a-Girlfriend',
    'https://img1.ak.crunchyroll.com/i/spire2/48745446a6a648a022818879ee8820d71594363087_full.jpg',
    2,
    'March 2023'
);

INSERT INTO Cards (name, image, season, publish) VALUES (
    'That Time I Got Reincarnated as a Slime',
    'https://m.media-amazon.com/images/M/MV5BM2M2NDIzOTItZDA1Yy00M2Q4LTk3ZjctZjZmZjUyZWMxM2YyXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_FMjpg_UX1000_.jpg',
    2,
    'Springs 2024'
);

INSERT INTO Cards (name, image, season, current) VALUES (
    'Demon Slayer',
    'https://fr.web.img6.acsta.net/pictures/19/09/18/13/46/0198270.jpg',
    3,
    1
);

INSERT INTO Cards (name, image) VALUES (
    'Takt op. Destiny',
    'https://img1.ak.crunchyroll.com/i/spire1/267dfb939e4c1dc9282d5fb8d2b4e6ee1633430413_full.jpg'
);

INSERT INTO Cards (name, image) VALUES (
    'I\'ve Been Killing Slimes for 300 Years and Maxed Out My Level',
    'https://img1.ak.crunchyroll.com/i/spire3/1f4453ef45efd68336de1e008366600b1618987477_full.jpg'
);

INSERT INTO Cards (name, image, current) VALUES (
    'Oshi no Ko',
    'https://fr.web.img4.acsta.net/pictures/23/03/27/09/50/3692966.jpg',
    1
);

INSERT INTO Cards (name, image, season) VALUE (
    'Fire Force',
    'https://img1.ak.crunchyroll.com/i/spire4/aab5d51e5e199851554d3910b2ecdff21594706748_full.jpg',
    2
);

SELECT * FROM Cards;
