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

function find_name_localite(value,object) {
	let localite = object.find((item) => item.nom_localite === value)
	return localite ? localite : 0;
}

function find_name_magasin(value,object) {
	let magasin = object.find((item) => item.nom_magasin === value)
	return magasin ? magasin : 0;
}

function find_name_categorie(value,object) {
	let categorie = object.find((item) => item.nom_categorie === value)
	return categorie ? categorie : 0;
}

// GET
router.get('/admin', function (req, res) {
	if (req.session.typeuser === "Admin") {
		let password_update_success = req.query.password_update_success;
		let id_user = req.query.id_user;
		let password_different = req.query.password_different;
		let password_short = req.query.password_short;
		let password_long = req.query.password_long;
		let password_invalid = req.query.password_invalid;
		let ajout_localite = req.query.ajout_localite;

		let pseudo_exist = req.query.pseudo_exist;
		let email_exist = req.query.email_exist;
		let pseudo_invalid = req.query.pseudo_invalid;
		let mdp_invalid = req.query.mdp_invalid;
		let mdp_short = req.query.mdp_short;
		let mdp_long = req.query.mdp_long;
		let pseudo_short = req.query.pseudo_short;
		let pseudo_long = req.query.pseudo_long;

		req.session.lastRoute = req.path;

		let sql = `SELECT * FROM users JOIN typeuser 
		           ON users.typeAccount=typeuser.id_typeUser 
				   ORDER BY users.user;

				   SELECT * FROM categories ORDER BY nom_categorie;
				   SELECT * FROM magasins ORDER BY nom_magasin;
				   SELECT * FROM localite ORDER BY nom_localite;
				   SELECT nom_categorie,count(produits.code_categorie) as nbr_produits_categorie FROM produits JOIN categories ON produits.code_categorie=categories.code_categorie GROUP BY nom_categorie;
				   SELECT nom_magasin,count(magasins_produits.id_magasin) as nbr_produits_magasin FROM magasins JOIN magasins_produits ON magasins.id_magasin=magasins_produits.id_magasin GROUP BY nom_magasin;
				   SELECT nom_localite,count(magasins_produits.code_postal) as nbr_produits_localite FROM localite JOIN magasins_produits ON localite.code_postal=magasins_produits.code_postal GROUP BY nom_localite;`

		
		connection.query(sql, function (erreur, resultat) {
			let list_users = resultat[0];
			let list_categories = resultat[1];
			let list_magasins = resultat[2];
			let list_localite = resultat[3];
			let nbr_categorie_use = resultat[4];
			let nbr_magasin_use = resultat[5];
			let nbr_localite_use = resultat[6];

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
				req,
				find_name_localite,
				find_name_magasin,
				find_name_categorie,
				nbr_categorie_use,
				nbr_magasin_use,
				nbr_localite_use,
				ajout_localite
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
	let ajout_localite = req.query.ajout_localite;

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
	
	SELECT * FROM categories ORDER BY nom_categorie;
	SELECT * FROM magasins ORDER BY nom_magasin;
	SELECT * FROM localite ORDER BY nom_localite;
	SELECT nom_categorie,count(produits.code_categorie) as nbr_produits_categorie FROM produits JOIN categories ON produits.code_categorie=categories.code_categorie GROUP BY nom_categorie;
	SELECT nom_magasin,count(magasins_produits.id_magasin) as nbr_produits_magasin FROM magasins JOIN magasins_produits ON magasins.id_magasin=magasins_produits.id_magasin GROUP BY nom_magasin;
	SELECT nom_localite,count(magasins_produits.code_postal) as nbr_produits_localite FROM localite JOIN magasins_produits ON localite.code_postal=magasins_produits.code_postal GROUP BY nom_localite;`

	if(username_search) {
		connection.query(sql, function (erreur, resultat) {
			let list_users = resultat[0];
			let list_categories = resultat[1];
			let list_magasins = resultat[2];
			let list_localite = resultat[3];
			let nbr_categorie_use = resultat[4];
			let nbr_magasin_use = resultat[5];
			let nbr_localite_use = resultat[6];

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
				req,
				ajout_localite,
				find_name_localite,
				find_name_magasin,
				find_name_categorie,
				nbr_categorie_use,
				nbr_magasin_use,
				nbr_localite_use
			})
		})
	} else {
		res.redirect('/admin')
	}
	
})

module.exports = router;