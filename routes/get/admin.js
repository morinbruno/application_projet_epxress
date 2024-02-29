const express = require('express');
const router = express.Router();
const nav = require('../../settings/nav_bar.json');
const mysql = require('mysql2');
const db_connect = require('../../settings/db_connection.json');

// Création d'une connexion à la base de données
const connection = mysql.createConnection({
	host: db_connect.host,
	user: db_connect.user,
	password: db_connect.password,
	database: db_connect.database,
	multipleStatements: true
});

router.get('/admin', function (req, res) {
	if (req.session.typeuser === "Admin") {
		let sql = `SELECT * FROM users JOIN typeuser 
		           ON users.typeAccount=typeuser.id_typeUser 
				   WHERE typeuser.name_typeUser='Utilisateur'`

		connection.query(sql,function(erreur, resultat) {
			let list_users = resultat;

			res.render('pages/admin', {
				title: "Admin",
				nav,
				list_users,
				req
			})
		})
	} else {
		res.redirect('/')
	}
});

module.exports = router;