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

router.post('/creer-compte', function (req, res) {
	let pseudo = req.body.pseudo;
	let email = req.body.email;
	let password = req.body.password;
	let sql = `SELECT email FROM users WHERE email = ?;
					 SELECT user FROM users WHERE user = ?;`
	connection.query(sql, [email, pseudo], function (erreur, resultat) {
		let result_email = resultat[0];
		let result_user = resultat[1];

		let user_statut = result_user.find(user_find => {
			if (user_find.user == pseudo) {
				return true
			} else {
				return false
			}
		})

		let email_statut = result_email.find(email_find => {
			if (email_find.email == email) {
				return true
			} else {
				return false
			}
		})

		if (user_statut) {
			if (email_statut) {
				res.redirect('/creer-compte?pseudo_exist=true&email_exist=true')
			} else {
				res.redirect('/creer-compte?pseudo_exist=true')
			}
		} else if (email_statut) {
			res.redirect('/creer-compte?email_exist=true')
		} else {
			if (pseudo && password && email) {
				let sql = "INSERT INTO users values(DEFAULT, ?, ?, ?, 2);";

				connection.query(sql, [pseudo, email, password], function (erreur, resultat) {
					let sql = 'SELECT * FROM users JOIN typeuser ON users.typeAccount=typeuser.id_typeUser WHERE user = ?';
					connection.query(sql, [pseudo], function (erreur, resultat) {
						req.session.loggedin = true;
						req.session.username = resultat[0]['user'];
						req.session.typeuser = resultat[0]['name_typeUser'];
						req.session.id_user = resultat[0]['id_user'];
						req.session.userinfo = resultat;
						res.redirect('/dashboard');
					})
				});
			} else {
				res.redirect('/creer-compte');
			}
		}
	})
})

module.exports = router;