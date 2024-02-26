const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const db_connect = require('../../settings/db_connection.json');
const nav = require('../../settings/nav_bar.json');

// Création d'une connexion à la base de données
const connection = mysql.createConnection({
	host: db_connect.host,
	user: db_connect.user,
	password: db_connect.password,
	database: db_connect.database,
	multipleStatements: true
});

// Fonctions
function date_local(date) {
	return date.toLocaleDateString();
}

function date_local_reverse(date) {
	return date.toLocaleDateString('JPN', { year: "numeric", month: '2-digit', day: '2-digit' }).replaceAll('/', '-')
}

function date_peremption_etat(date) {
	if (date_local_reverse(new Date()) === date_local_reverse(date)) {
		return "Dernier jour de consommation"
	} else if (date_local_reverse(new Date()) < date_local_reverse(date)) {
		return "Comestible"
	} else if (date_local_reverse(new Date()) > date_local_reverse(date)) {
		return "Non comestible"
	}
}


// Route
router.get('/dashboard', function (req, res, next) {
    let sql = `SELECT produits.nom_produit, produits_acheter.quantite, 
	magasins.nom_magasin, produits_acheter.date_achat, produits_acheter.date_expiration, produits.id_produit, 
	localite.nom_localite, categories.nom_categorie FROM users JOIN produits_acheter 
	ON users.id_user=produits_acheter.id_user JOIN produits 
	ON produits_Acheter.id_produit=produits.id_produit JOIN magasins_produits 
	ON produits.id_produit=magasins_produits.id_produit JOIN magasins 
	ON magasins_produits.id_magasin=magasins.id_magasin JOIN localite 
	ON magasins_produits.code_postal=localite.code_postal JOIN categories
	ON produits.code_categorie=categories.code_categorie
	WHERE produits_acheter.id_user = ? ORDER BY produits.nom_produit;

	SELECT * FROM categories ORDER BY nom_categorie;

	SELECT * FROM magasins ORDER BY nom_magasin;

	SELECT * FROM localite ORDER BY nom_localite;
	`;

    connection.query(sql, [req.session.id_user], function (erreur, resultat) {
        if (req.session.loggedin) {
            res.render('pages/dashboard', {
                title: "Dashboard",
                nav,
                resultat,
                date_local,
                date_local_reverse,
                date_peremption_etat,
                list_produit: resultat[0],
                list_categorie: resultat[1],
                list_magasin: resultat[2],
                list_localite: resultat[3],
                req
            });
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;