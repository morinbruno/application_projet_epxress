
-- Creation de la base de données `projet_expressjs`

CREATE DATABASE IF NOT EXISTS projet_expressjs;
USE projet_expressjs;


-- Creation des tables

CREATE TABLE IF NOT EXISTS typeuser (
    id_typeUser INT AUTO_INCREMENT not null,
    name_typeUser VARCHAR(50) not null,
    PRIMARY KEY (id_typeUser)
);

CREATE TABLE IF NOT EXISTS magasins (
    id_magasin int AUTO_INCREMENT not null,
    nom_magasin VARCHAR(50) not null,
    PRIMARY KEY (id_magasin)
);

CREATE TABLE IF NOT EXISTS localite (
    code_postal INT not null,
    nom_localite VARCHAR(255) not null,
    PRIMARY KEY (code_postal)
);

CREATE TABLE IF NOT EXISTS categories (
    code_categorie int AUTO_INCREMENT not null,
    nom_categorie VARCHAR(50) not null,
    PRIMARY KEY (code_categorie)
);

CREATE TABLE IF NOT EXISTS produits (
    id_produit int AUTO_INCREMENT,
    nom_produit VARCHAR(100) not null,
    code_categorie INT not null,
    PRIMARY KEY (id_produit),
    FOREIGN KEY (code_categorie) REFERENCES categories(code_categorie)
);

CREATE TABLE IF NOT EXISTS magasins_produits (
    id_produit INT not null,
    id_magasin INT not null,
    code_postal INT not null,
    FOREIGN KEY (id_produit) REFERENCES produits(id_produit),
    FOREIGN KEY (id_magasin) REFERENCES magasins(id_magasin),
    FOREIGN KEY (code_postal) REFERENCES localite(code_postal)
);

CREATE TABLE IF NOT EXISTS users (
    id_user INT AUTO_INCREMENT not null,
    user VARCHAR(50) not null UNIQUE,
    email VARCHAR(80) not null,
    password VARCHAR(20) not null,
    typeAccount INT not null,
    PRIMARY KEY (id_user),
    FOREIGN KEY (typeAccount) REFERENCES typeuser(id_typeUser)
);

CREATE TABLE IF NOT EXISTS produits_acheter (
    id_produit INT not null,
    id_user INT not null,
    quantite int not null,
    date_achat DATE not null,
    date_expiration DATE not null,
    FOREIGN KEY (id_produit) REFERENCES produits(id_produit),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- Insertion des valeurs dans la base de donnée

INSERT INTO typeuser VALUES
(1,'Admin'),
(2,'Utilisateur');

INSERT INTO categories VALUES
(1,'Viande'),
(2,'Produit laitier'),
(3,'Champignon'),
(4,'Fruit'),
(5,'Légume'),
(6,'Boisson');

INSERT INTO localite VALUES
(7500,'Tournai'),
(7700,'Mouscron');

INSERT INTO magasins VALUES
(1,'Carrefour Market'),
(2,'Intermarché'),
(3,'Carrefour');

INSERT INTO users VALUES
(1,'Admin','','Admin',1);

-- Creation de l'utilisateur de la base de donnée

CREATE USER IF NOT EXISTS 'user_expressjs'@'localhost' IDENTIFIED BY 'Express123';
GRANT USAGE ON *.* TO `user_expressjs`@`localhost`;
GRANT SELECT, INSERT, UPDATE, DELETE ON `projet_expressjs`.* TO `user_expressjs`@`localhost`;
FLUSH PRIVILEGES;

