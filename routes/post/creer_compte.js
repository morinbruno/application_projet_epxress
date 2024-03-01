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

	if(req.session.id && req.session.typeuser == "Admin") {
		if (pseudo.length < 3 && password.length < 3) {
			res.redirect('/admin?pseudo_short=true&mdp_short=true')
		} else if (pseudo.length > 20 && password.length > 20) {
			res.redirect('/admin?pseudo_long=true&mdp_long=true')
		} else if (pseudo.length < 3) {
			if (password.length > 20) {
				res.redirect('/admin?pseudo_short=true&mdp_long=true')
			} else {
				res.redirect('/admin?pseudo_short=true')
			}
		} else if (password.length < 3) {
			if (pseudo.length > 20) {
				res.redirect('/admin?mdp_short=true&pseudo_long=true')
			} else {
				res.redirect('/admin?mdp_short=true')
			}
		} else if (pseudo.includes(' ') || pseudo.includes('@')) {
			res.redirect('/admin?pseudo_invalid=true')
		} else if (password.includes(' ')) {
			res.redirect('/admin?mdp_invalid=true')
		} else {
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
				
				if (resultat[0].length == 0 && resultat[1].length == 0) {
					let sql = "INSERT INTO users values(DEFAULT, ?, ?, ?, 2);";
	
					connection.query(sql, [pseudo, email, password], function (erreur, resultat) {
						let sql = 'SELECT * FROM users JOIN typeuser ON users.typeAccount=typeuser.id_typeUser WHERE user = ?';
						connection.query(sql, [pseudo], function (erreur, resultat) {
							res.redirect('/admin');
						})
					});
				} else if (user_statut) {
					if (email_statut) {
						res.redirect('/admin?pseudo_exist=true&email_exist=true')
					} else {
						res.redirect('/admin?pseudo_exist=true')
					}
				} else if (email_statut) {
					res.redirect('/admin?email_exist=true')
				} else if (result_user[0]['user'].toLowerCase() === pseudo.toLowerCase()) {
					res.redirect('/admin?pseudo_exist=true')
				} else if (result_email[0]['email'].toLowerCase() === email.toLowerCase()) {
					res.redirect('/admin?email_exist=true')
				}
			})
		}
	} else {
		if (pseudo.length < 3 && password.length < 3) {
			res.redirect('/creer-compte?pseudo_short=true&mdp_short=true')
		} else if (pseudo.length > 20 && password.length > 20) {
			res.redirect('/creer-compte?pseudo_long=true&mdp_long=true')
		} else if (pseudo.length < 3) {
			if (password.length > 20) {
				res.redirect('/creer-compte?pseudo_short=true&mdp_long=true')
			} else {
				res.redirect('/creer-compte?pseudo_short=true')
			}
		} else if (password.length < 3) {
			if (pseudo.length > 20) {
				res.redirect('/creer-compte?mdp_short=true&pseudo_long=true')
			} else {
				res.redirect('/creer-compte?mdp_short=true')
			}
		} else if (pseudo.includes(' ') || pseudo.includes('@')) {
			res.redirect('/creer-compte?pseudo_invalid=true')
		} else if (password.includes(' ')) {
			res.redirect('/creer-compte?mdp_invalid=true')
		} else {
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
				
				if (resultat[0].length == 0 && resultat[1].length == 0) {
					let sql = "INSERT INTO users values(DEFAULT, ?, ?, ?, 2);";
	
					connection.query(sql, [pseudo, email, password], function (erreur, resultat) {
						let sql = 'SELECT * FROM users JOIN typeuser ON users.typeAccount=typeuser.id_typeUser WHERE user = ?';
						connection.query(sql, [pseudo], function (erreur, resultat) {
							req.session.loggedin = true;
							req.session.username = resultat[0]['user'];
							req.session.typeuser = resultat[0]['name_typeUser'];
							req.session.id_user = resultat[0]['id_user'];
							req.session.user_info = resultat[0];
							res.redirect('/dashboard');
						})
					});
				} else if (user_statut) {
					if (email_statut) {
						res.redirect('/creer-compte?pseudo_exist=true&email_exist=true')
					} else {
						res.redirect('/creer-compte?pseudo_exist=true')
					}
				} else if (email_statut) {
					res.redirect('/creer-compte?email_exist=true')
				} else if (result_user[0]['user'].toLowerCase() === pseudo.toLowerCase()) {
					res.redirect('/creer-compte?pseudo_exist=true')
				} else if (result_email[0]['email'].toLowerCase() === email.toLowerCase()) {
					res.redirect('/creer-compte?email_exist=true')
				}
			})
		}
	}
})

module.exports = router;