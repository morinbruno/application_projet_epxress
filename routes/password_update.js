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

router.post('/password-update', function (req, res) {
	let password = req.body.password;
	let password_repeat = req.body.password_repeat;
	let id_user = req.body.id_user;

	if (id_user && req.session.typeuser == "Admin") {
		if (password.includes(' ') || password.length == 0 || password_repeat.length == 0) {
			res.redirect(`/admin?password_invalid=true&id_user=${id_user}`)

		} else if (password.length < 3) {
			res.redirect(`/admin?password_short=true&id_user=${id_user}`)
		} else if (password.length > 20) {
			res.redirect(`/admin?password_long=true&id_user=${id_user}`)
		} else if (password != password_repeat) {
			res.redirect(`/admin?password_different=true&id_user=${id_user}`)
		} else {
			let sql = `UPDATE users SET password= ? WHERE id_user= ?`

			connection.query(sql, [password, id_user], function (erreur, resultat) {
				res.redirect(`/admin?password_update_success=true&id_user=${id_user}`)
			})
		}
	} else {
		if (password.includes(' ') || password.length == 0 || password_repeat.length == 0) {
			res.redirect('/profil?password_invalid=true')

		} else if (password.length < 3) {
			res.redirect('/profil?password_short=true')
		} else if (password.length > 20) {
			res.redirect('/profil?password_long=true')
		} else if (password != password_repeat) {
			res.redirect('/profil?password_different=true')
		} else {
			let sql = `UPDATE users SET password= ? WHERE id_user= ?`
			let id_user = req.session.id_user;

			connection.query(sql, [password, id_user], function (erreur, resultat) {
				res.redirect('/profil?password_update_success=true')
			})
		}
	}
});

export default router;