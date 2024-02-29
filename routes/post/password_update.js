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

router.post('/password-update', function (req, res) {
	let password = req.body.password;
	let password_repeat = req.body.password_repeat;

	if(password.includes(' ') || password.length == 0 || password_repeat.length == 0) {
		res.redirect('/profil?password_invalid=true')

	} else if (password.length < 3) {
		res.redirect('/profil?password_short=true')
	} else if(password.length > 20) {
		res.redirect('/profil?password_long=true')
	} else if (password != password_repeat) {
		res.redirect('/profil?password_different=true')
	} else {
		let sql = `UPDATE users SET password= ? WHERE id_user= ?`
		let id_user = req.session.id_user;

		connection.query(sql, [password, id_user], function(erreur, resultat) {
			res.redirect('/profil?password_update_success=true')
		})
	}
});

module.exports = router;