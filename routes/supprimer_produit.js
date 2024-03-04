import { Router } from 'express';
const router = Router();
import { createConnection } from 'mysql2';
import db_connection from '../settings/db_connection.json' with { type: "json" };

// Création d'une connexion à la base de données
const connection = createConnection({
	host: db_connection.host,
	user: db_connection.user,
	password: db_connection.password,
	database: db_connection.database,
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

export default router;