CREATE TABLE typeuser (
    id_typeUser INT AUTO_INCREMENT not null,
    name_typeUser VARCHAR(50) not null,
    PRIMARY KEY (id_typeUser)
);

CREATE TABLE users (
    id_user INT AUTO_INCREMENT not null,
    user VARCHAR(50) not null UNIQUE,
    email VARCHAR(80) not null,
    password VARCHAR(20) not null,
    typeAccount INT not null,
    PRIMARY KEY (id_user),
    FOREIGN KEY (typeAccount) REFERENCES typeuser(id_typeUser)
);

CREATE TABLE localite (
    code_postal INT not null,
    nom_localite VARCHAR(255) not null,
    PRIMARY KEY (code_postal)
);

CREATE TABLE magasins (
    id_magasin int AUTO_INCREMENT not null,
    nom_magasin VARCHAR(50) not null,
    PRIMARY KEY (id_magasin)
);

CREATE TABLE categories (
    code_categorie int AUTO_INCREMENT not null,
    nom_categorie VARCHAR(50) not null,
    PRIMARY KEY (code_categorie)
);

CREATE TABLE produits (
    id_produit int AUTO_INCREMENT,
    nom_produit VARCHAR(100) not null,
    code_categorie INT not null,
    PRIMARY KEY (id_produit),
    FOREIGN KEY (code_categorie) REFERENCES categories(code_categorie)
);

CREATE TABLE magasins_produits (
    id_produit INT not null,
    id_magasin INT not null,
    code_postal INT not null,
    FOREIGN KEY (id_produit) REFERENCES produits(id_produit),
    FOREIGN KEY (id_magasin) REFERENCES magasins(id_magasin),
    FOREIGN KEY (code_postal) REFERENCES localite(code_postal)
);

CREATE TABLE produits_acheter (
    id_produit INT not null,
    id_user INT not null,
    quantite int not null,
    date_achat DATE not null,
    date_expiration DATE not null,
    FOREIGN KEY (id_produit) REFERENCES produits(id_produit),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- Creation de l'utilisateur de la base de donnée

CREATE USER 'user_expressjs'@'localhost' IDENTIFIED BY 'Express123';
GRANT USAGE ON *.* TO `user_expressjs`@`localhost`;
GRANT SELECT, INSERT, UPDATE, DELETE ON `projet_expressjs`.* TO `user_expressjs`@`localhost`;
FLUSH PRIVILEGES;

