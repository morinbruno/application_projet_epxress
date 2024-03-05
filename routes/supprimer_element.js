const express = require('express');
const router = express.Router();
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

router.post('/supprimer-element', function (req, res) {
    const supp_localite = req.body.supp_localite;
    const supp_magasin = req.body.supp_magasin;
    const supp_categorie = req.body.supp_categorie;

    if(supp_localite) {
        let sql = `DELETE FROM localite WHERE code_postal = ?;`;

        connection.query(sql, supp_localite, function(erreur, resultat){
            res.redirect('/admin')
        })
    }

    if(supp_magasin) {
        let sql = `DELETE FROM magasins WHERE id_magasin = ?;`;

        connection.query(sql, supp_magasin, function(erreur, resultat){
            res.redirect('/admin')
        })
    }

    if(supp_categorie) {
        let sql = `DELETE FROM categories WHERE code_categorie = ?;`;

        connection.query(sql, supp_categorie, function(erreur, resultat){
            res.redirect('/admin')
        })
    }
});

module.exports = router;