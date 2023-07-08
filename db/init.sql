CREATE DATABASE IF NOT EXISTS cards;
USE cards;

DROP TABLE IF EXISTS Cards;
DROP TABLE IF EXISTS CardsStatus;

CREATE TABLE CardsStatus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO CardsStatus (name) VALUES (
    'Current'
);


INSERT INTO CardsStatus (name) VALUES (
    'Upcoming'
);

INSERT INTO CardsStatus (name) VALUES (
    'Finished'
);

CREATE TABLE Cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    image VARCHAR(255) NOT NULL,
    season INT DEFAULT 1,
    publish VARCHAR(255),
    status_id INT DEFAULT 1
);

INSERT INTO Cards (name, image, season, publish, status_id) VALUES (
    'Rent-a-Girlfriend',
    'https://img1.ak.crunchyroll.com/i/spire2/48745446a6a648a022818879ee8820d71594363087_full.jpg',
    2,
    'March 2023',
    2
);

INSERT INTO Cards (name, image, season, publish, status_id) VALUES (
    'That Time I Got Reincarnated as a Slime',
    'https://m.media-amazon.com/images/M/MV5BM2M2NDIzOTItZDA1Yy00M2Q4LTk3ZjctZjZmZjUyZWMxM2YyXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_FMjpg_UX1000_.jpg',
    2,
    'Springs 2024',
    2
);

INSERT INTO Cards (name, image, season, status_id) VALUES (
    'Demon Slayer',
    'https://fr.web.img6.acsta.net/pictures/19/09/18/13/46/0198270.jpg',
    3,
    3
);

INSERT INTO Cards (name, image, status_id) VALUES (
    'Takt op. Destiny',
    'https://img1.ak.crunchyroll.com/i/spire1/267dfb939e4c1dc9282d5fb8d2b4e6ee1633430413_full.jpg',
    3
);

INSERT INTO Cards (name, image, status_id) VALUES (
    'I\'ve Been Killing Slimes for 300 Years and Maxed Out My Level',
    'https://img1.ak.crunchyroll.com/i/spire3/1f4453ef45efd68336de1e008366600b1618987477_full.jpg',
    3
);

INSERT INTO Cards (name, image) VALUES (
    'Oshi no Ko',
    'https://fr.web.img4.acsta.net/pictures/23/03/27/09/50/3692966.jpg'
);

INSERT INTO Cards (name, image, season, status_id) VALUE (
    'Fire Force',
    'https://img1.ak.crunchyroll.com/i/spire4/aab5d51e5e199851554d3910b2ecdff21594706748_full.jpg',
    2,
    3
);

SELECT * FROM Cards;
