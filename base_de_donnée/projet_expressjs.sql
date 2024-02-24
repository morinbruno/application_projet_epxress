-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 23 fév. 2024 à 17:24
-- Version du serveur : 8.3.0
-- Version de PHP : 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet_expressjs`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `code_categorie` int NOT NULL,
  `nom_categorie` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`code_categorie`, `nom_categorie`) VALUES
(1, 'viande'),
(2, 'produit laitier');

-- --------------------------------------------------------

--
-- Structure de la table `localite`
--

CREATE TABLE `localite` (
  `code_postal` int NOT NULL,
  `nom_localite` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `localite`
--

INSERT INTO `localite` (`code_postal`, `nom_localite`) VALUES
(7500, 'Tournai'),
(7700, 'Mouscron');

-- --------------------------------------------------------

--
-- Structure de la table `magasins`
--

CREATE TABLE `magasins` (
  `id_magasin` int NOT NULL,
  `nom_magasin` varchar(50) NOT NULL,
  `code_postal` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `magasins`
--

INSERT INTO `magasins` (`id_magasin`, `nom_magasin`, `code_postal`) VALUES
(1, 'Carrefour Market', 7700),
(2, 'Intermarché', 7700),
(3, 'Carrefour', 7500);

-- --------------------------------------------------------

--
-- Structure de la table `magasins_produits`
--

CREATE TABLE `magasins_produits` (
  `id_produit` int NOT NULL,
  `id_magasin` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE `produits` (
  `id_produit` int NOT NULL,
  `nom_produit` varchar(100) NOT NULL,
  `code_categorie` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id_produit`, `nom_produit`, `code_categorie`) VALUES
(3, 'poulet', 1),
(4, 'bouteille de lait', 2),
(5, 'bouteille de lait', 2),
(6, 'hamburger', 1),
(7, 'couscous', 1);

-- --------------------------------------------------------

--
-- Structure de la table `produits_acheter`
--

CREATE TABLE `produits_acheter` (
  `id_produit` int NOT NULL,
  `id_user` int NOT NULL,
  `id_magasin` int NOT NULL,
  `quantite` int NOT NULL,
  `date_achat` date NOT NULL,
  `date_expiration` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `produits_acheter`
--

INSERT INTO `produits_acheter` (`id_produit`, `id_user`, `id_magasin`, `quantite`, `date_achat`, `date_expiration`) VALUES
(3, 1, 2, 1, '2024-02-23', '2024-02-27'),
(4, 2, 1, 12, '2024-02-24', '2024-03-27'),
(5, 1, 3, 36, '2017-02-01', '2017-04-14'),
(6, 13, 3, 56, '2024-02-23', '2024-02-29'),
(7, 2, 3, 128, '2024-02-18', '2024-02-21');

-- --------------------------------------------------------

--
-- Structure de la table `typeuser`
--

CREATE TABLE `typeuser` (
  `id_typeUser` int NOT NULL,
  `name_typeUser` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `typeuser`
--

INSERT INTO `typeuser` (`id_typeUser`, `name_typeUser`) VALUES
(1, 'Admin'),
(2, 'Utilisateur');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `user` varchar(50) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(20) NOT NULL,
  `typeAccount` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `user`, `email`, `password`, `typeAccount`) VALUES
(1, 'Bruno', 'morinbruno@hotmail.be', 'Test123', 1),
(2, 'Olivier', 'hollebekeolivier@gmail.com', 'Bite', 2),
(12, 'Test', 'test@gmail.com', 'Test123', 2),
(13, 'Adelovic', 'adelhared123@gmail.com', 'Azerty4321', 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`code_categorie`);

--
-- Index pour la table `localite`
--
ALTER TABLE `localite`
  ADD PRIMARY KEY (`code_postal`);

--
-- Index pour la table `magasins`
--
ALTER TABLE `magasins`
  ADD PRIMARY KEY (`id_magasin`),
  ADD KEY `code_postal` (`code_postal`);

--
-- Index pour la table `magasins_produits`
--
ALTER TABLE `magasins_produits`
  ADD KEY `id_produit` (`id_produit`),
  ADD KEY `id_magasin` (`id_magasin`);

--
-- Index pour la table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`id_produit`),
  ADD KEY `FK_code_produit` (`code_categorie`);

--
-- Index pour la table `produits_acheter`
--
ALTER TABLE `produits_acheter`
  ADD KEY `id_produit` (`id_produit`),
  ADD KEY `id_magasin` (`id_magasin`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `produits_categoriser`
--
ALTER TABLE `produits_categoriser`
  ADD KEY `id_produit` (`id_produit`),
  ADD KEY `code_categorie` (`code_categorie`);

--
-- Index pour la table `typeuser`
--
ALTER TABLE `typeuser`
  ADD PRIMARY KEY (`id_typeUser`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `user` (`user`),
  ADD KEY `typeAccount` (`typeAccount`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `code_categorie` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `magasins`
--
ALTER TABLE `magasins`
  MODIFY `id_magasin` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `id_produit` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `typeuser`
--
ALTER TABLE `typeuser`
  MODIFY `id_typeUser` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `magasins`
--
ALTER TABLE `magasins`
  ADD CONSTRAINT `magasins_ibfk_1` FOREIGN KEY (`code_postal`) REFERENCES `localite` (`code_postal`);

--
-- Contraintes pour la table `magasins_produits`
--
ALTER TABLE `magasins_produits`
  ADD CONSTRAINT `magasins_produits_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id_produit`),
  ADD CONSTRAINT `magasins_produits_ibfk_2` FOREIGN KEY (`id_magasin`) REFERENCES `magasins` (`id_magasin`);

--
-- Contraintes pour la table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `FK_code_produit` FOREIGN KEY (`code_categorie`) REFERENCES `categories` (`code_categorie`);

--
-- Contraintes pour la table `produits_acheter`
--
ALTER TABLE `produits_acheter`
  ADD CONSTRAINT `produits_acheter_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id_produit`),
  ADD CONSTRAINT `produits_acheter_ibfk_2` FOREIGN KEY (`id_magasin`) REFERENCES `magasins` (`id_magasin`),
  ADD CONSTRAINT `produits_acheter_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Contraintes pour la table `produits_categoriser`
--
ALTER TABLE `produits_categoriser`
  ADD CONSTRAINT `produits_categoriser_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id_produit`),
  ADD CONSTRAINT `produits_categoriser_ibfk_2` FOREIGN KEY (`code_categorie`) REFERENCES `categories` (`code_categorie`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`typeAccount`) REFERENCES `typeuser` (`id_typeUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
