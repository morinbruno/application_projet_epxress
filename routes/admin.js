const express = require('express');
const router = express.Router();
const nav = require('../settings/nav_bar.json');
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

// GET
router.get('/admin', function (req, res) {
	if (req.session.typeuser === "Admin") {
		let password_update_success = req.query.password_update_success;
		let id_user = req.query.id_user;
		let password_different = req.query.password_different;
		let password_short = req.query.password_short;
		let password_long = req.query.password_long;
		let password_invalid = req.query.password_invalid;

		let pseudo_exist = req.query.pseudo_exist;
		let email_exist = req.query.email_exist;
		let pseudo_invalid = req.query.pseudo_invalid;
		let mdp_invalid = req.query.mdp_invalid;
		let mdp_short = req.query.mdp_short;
		let mdp_long = req.query.mdp_long;
		let pseudo_short = req.query.pseudo_short;
		let pseudo_long = req.query.pseudo_long;

		let sql = `SELECT * FROM users JOIN typeuser 
		           ON users.typeAccount=typeuser.id_typeUser 
				   ORDER BY users.user;

				   SELECT * FROM categories;
				   SELECT * FROM magasins;
				   SELECT * FROM localite;`

		connection.query(sql, function (erreur, resultat) {
			let list_users = resultat[0];
			let list_categories = resultat[1];
			let list_magasins = resultat[2];
			let list_localite = resultat[3];

			res.render('pages/admin', {
				title: "Admin",
				nav,
				list_users,
				list_categories,
				list_magasins,
				list_localite,
				password_update_success,
				id_user,
				password_different,
				password_short,
				password_long,
				password_invalid,
				pseudo_exist,
				email_exist,
				pseudo_invalid,
				mdp_invalid,
				mdp_short,
				mdp_long,
				pseudo_short,
				pseudo_long,
				username_search: null,
				req
			})
		})
	} else {
		res.redirect('/')
	}
});

// POST
router.post('/admin', function (req, res) {
	let password_update_success = req.query.password_update_success;
	let id_user = req.query.id_user;
	let password_different = req.query.password_different;
	let password_short = req.query.password_short;
	let password_long = req.query.password_long;
	let password_invalid = req.query.password_invalid;

	let pseudo_exist = req.query.pseudo_exist;
	let email_exist = req.query.email_exist;
	let pseudo_invalid = req.query.pseudo_invalid;
	let mdp_invalid = req.query.mdp_invalid;
	let mdp_short = req.query.mdp_short;
	let mdp_long = req.query.mdp_long;
	let pseudo_short = req.query.pseudo_short;
	let pseudo_long = req.query.pseudo_long;

	let username_search = req.body.username_search;
	
	let sql = `SELECT * FROM users JOIN typeuser 
	ON users.typeAccount=typeuser.id_typeUser 
	WHERE users.user like '%${username_search}%' OR users.email like '%${username_search}%' OR typeuser.name_typeUser like '%${username_search}%'
	ORDER BY users.user;
	
	SELECT * FROM categories;
	SELECT * FROM magasins;
	SELECT * FROM localite;`

	if(username_search) {
		connection.query(sql, function (erreur, resultat) {
			let list_users = resultat[0];
			let list_categories = resultat[1];
			let list_magasins = resultat[2];
			let list_localite = resultat[3];
			res.render('pages/admin', {
				title: "Admin",
				nav,
				list_users,
				list_categories,
				list_magasins,
				list_localite,
				password_update_success,
				id_user,
				password_different,
				password_short,
				password_long,
				password_invalid,
				pseudo_exist,
				email_exist,
				pseudo_invalid,
				mdp_invalid,
				mdp_short,
				mdp_long,
				pseudo_short,
				pseudo_long,
				username_search,
				req
			})
		})
	} else {
		res.redirect('/admin')
	}
	
})

module.exports = router;