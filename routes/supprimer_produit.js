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

router.post('/supprimer-produit', function (req, res) {
	let id_produit = req.body.id;
	let id_user = req.session.id_user;

	let sql = `DELETE FROM produits_acheter WHERE id_user = ? AND id_produit = ?;
	DELETE FROM magasins_produits WHERE id_produit = ?;
	DELETE FROM produits WHERE id_produit = ?;`;

	connection.query(sql, [id_user, id_produit, id_produit, id_produit], function (erreur, resultat) {
		if (erreur) {
			console.log(erreur)
		}
		res.redirect('/dashboard');
	})
});

module.exports = router;