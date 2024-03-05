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

router.post('/ajouter-element', function (req, res) {
    const ajout_localite = req.body.ajout_localite;
    const ajout_code_postal = req.body.ajout_code_postal;
    const ajout_categorie = req.body.ajout_categorie;
    const ajout_magasin = req.body.ajout_magasin;

    if(ajout_localite && ajout_code_postal) {
        let sql = `INSERT INTO localite VALUES(?,?);`;

        connection.query(sql, [ajout_code_postal,ajout_localite], function(erreur, resultat){
            if(erreur) {
                res.redirect('/admin?ajout_localite=erreur')
            } else {
                res.redirect('/admin?ajout_localite=success')
            }
        })
    }

    if(ajout_categorie) {
        let sql = `INSERT INTO categories VALUES(DEFAULT,?);`;

        connection.query(sql, ajout_categorie, function(erreur, resultat){
            if(erreur) {
                res.redirect('/admin?ajout_categorie=erreur')
            } else {
                res.redirect('/admin?ajout_categorie=success')
            }
        })
    }

    if(ajout_magasin) {
        let sql = `INSERT INTO categories VALUES(DEFAULT,?);`;

        connection.query(sql, ajout_categorie, function(erreur, resultat){
            if(erreur) {
                res.redirect('/admin?ajout_magasin=erreur')
            } else {
                res.redirect('/admin?ajout_magasin=success')
            }
        })
    }
});

module.exports = router;