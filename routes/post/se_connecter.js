const express = require('express');
const router = express.Router();
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

router.post('/se-connecter', function (req, res) {
	let user_email = req.body.user_email;
	let password = req.body.password;

	if (user_email && password) {
		let sql_username = 'SELECT * FROM users JOIN typeuser ON users.typeAccount=typeuser.id_typeUser WHERE users.user = ?';
		let sql_email = 'SELECT * FROM users JOIN typeuser ON users.typeAccount=typeuser.id_typeUser WHERE users.email = ?';

		if (user_email.includes('@')) {
			sql = sql_email;
		} else {
			sql = sql_username;
		}

		connection.query(sql, [user_email, password], function (erreur, resultat) {
			if (resultat.length == 0) {
				res.redirect('/?invalid_user=true')
			} else if (password != resultat[0]['password']) {
				res.redirect('/?invalid_mdp=true')
			} else if (resultat[0]['email'] == user_email || resultat[0]['user'] == user_email && resultat[0]['password'] == password) {
				req.session.loggedin = true;
				req.session.username = resultat[0]['user'];
				req.session.typeuser = resultat[0]['name_typeUser'];
				req.session.id_user = resultat[0]['id_user'];
				req.session.userinfo = resultat;
				res.redirect('/dashboard');
			} else {
				res.redirect('/?invalid_user=true');
			}
		});
	} else {
		res.redirect('/?invalid_user=true');
	}
});

module.exports = router;