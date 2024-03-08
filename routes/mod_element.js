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

router.post('/modifier-element', function (req, res) {
    const mod_localite = req.body.mod_localite;
    const mod_code_postal = req.body.mod_code_postal;
    const mod_localite_id = req.body.mod_localite_id;

    const mod_categorie = req.body.mod_categorie;
    const mod_categorie_id = req.body.mod_categorie_id;

    const mod_magasin = req.body.mod_magasin;
    const mod_magasin_id = req.body.mod_magasin_id;

    if (mod_code_postal != undefined && mod_localite != undefined) {
        if(mod_code_postal.length >= 4 && mod_code_postal.length <= 5 && mod_localite.length > 0 && mod_localite.includes(' ') != true) {
            let sql = `UPDATE localite SET code_postal = ?, nom_localite = ? WHERE code_postal = ?;`;
    
            connection.query(sql, [mod_code_postal,mod_localite,mod_localite_id], function(erreur, resultat){
                if(erreur) {
                    console.log(erreur)
                    res.redirect('/admin?mod_localite=erreur#list_localites')
                } else {
                    res.redirect('/admin?mod_localite=success#list_localites')
                }
            })
        } else {
            res.redirect('/admin?mod_localite=erreur#list_localites')
        }
    } 

    if (mod_categorie != undefined) {
        if(mod_categorie.length > 0) {
            let sql = `UPDATE categories SET nom_categorie = ? WHERE code_categorie = ?;`;
    
            connection.query(sql, [mod_categorie,mod_categorie_id], function(erreur, resultat){
                if(erreur) {
                    res.redirect('/admin?mod_categorie=erreur#list_categories')
                } else {
                    res.redirect('/admin?mod_categorie=success#list_categories')
                }
            })
        } else {
            res.redirect('/admin?mod_categorie=erreur#list_categories')
        }
    }
    
    if (mod_magasin != undefined) {
        if(mod_magasin.length > 0) {
            let sql = `UPDATE magasins SET nom_magasin = ? WHERE id_magasin = ?;`;
    
            connection.query(sql, [mod_magasin,mod_magasin_id], function(erreur, resultat){
                if(erreur) {
                    res.redirect('/admin?mod_magasin=erreur#list_magasins')
                } else {
                    res.redirect('/admin?mod_magasin=success#list_magasins')
                } 
            })
        }
    }
});

module.exports = router;