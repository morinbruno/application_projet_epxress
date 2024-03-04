const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const db_connect = require('../settings/db_connection.json');

// Création d'une connexion à la base de données
const connection = mysql.createConnection({
	host: db_connect.host,
	user: db_connect.user,
	password: db_connect.password,
	database: db_connect.database,
	multipleStatements: true
});

router.post('/ajouter-produit', function (req, res) {
	const produit = req.body.produit;
	const quantite = req.body.quantite;
	const date_achat = req.body.date_achat;
	const date_expiration = req.body.date_expiration;
	const magasin = req.body.magasin;
	const categorie = req.body.categorie;
	const localite = req.body.localite;
	const id_user = req.session.id_user;

	let sql = `INSERT INTO produits VALUES(DEFAULT, ?, ?);
			   INSERT INTO produits_acheter VALUES((SELECT LAST_INSERT_ID()), ?, ?, ?, ?);
			   INSERT INTO magasins_produits VALUES((SELECT LAST_INSERT_ID()), ?, ?);`

	if (produit && !isNaN(quantite) && date_achat && date_achat && date_expiration && !isNaN(magasin) && !isNaN(categorie) && !isNaN(localite)) {
		connection.query(sql, [produit, categorie, id_user, quantite, date_achat ,date_expiration, magasin, localite], function (erreur, resultat) {
			if (erreur) {
				console.log(erreur);
			}
			res.redirect('/dashboard');
		});
	} else if (produit == undefined && quantite == undefined && date_achat == undefined && date_expiration == undefined && isNaN(magasin) && isNaN(categorie) && isNaN(localite)) {
		res.redirect('/dashboard?produit_manquant=true');
	} else if (isNaN(quantite)) {
		res.redirect('/dashboard?quantite_invalid=true');
	} else {
		res.redirect('/dashboard?produit_manquant=true');
	}
});

module.exports = router;