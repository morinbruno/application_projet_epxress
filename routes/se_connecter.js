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

router.post('/se-connecter', function(req, res) {
	let user_email = req.body.user_email;
	let password = req.body.password;

	if (user_email && password) {
		let sql_username = 'SELECT * FROM users JOIN typeuser ON users.typeAccount=typeuser.id_typeUser WHERE users.user = ?';
		let sql_email = 'SELECT * FROM users JOIN typeuser ON users.typeAccount=typeuser.id_typeUser WHERE users.email = ?';
		let sql = null;

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
				req.session.user_info = resultat[0];
				res.redirect('/dashboard');
			} else {
				res.redirect('/?invalid_user=true');
			}
		});
	} else {
		res.redirect('/?invalid_user=true');
	}
});

export default router;