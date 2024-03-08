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

router.post('/modifier-produit', function (req, res){
    const id_produit = req.body.id_produit;
    const produit = req.body.produit;
    const quantite = req.body.quantite;
    const code_categorie = req.body.categorie;
    const id_magasin = req.body.magasin;
    const code_postal = req.body.localite;
    const date_achat = req.body.date_achat;
    const date_expiration = req.body.date_expiration;

    let sql = `UPDATE produits_acheter JOIN produits
	ON produits_acheter.id_produit=produits.id_produit JOIN magasins_produits 
	ON produits.id_produit=magasins_produits.id_produit JOIN magasins 
	ON magasins_produits.id_magasin=magasins.id_magasin JOIN localite 
	ON magasins_produits.code_postal=localite.code_postal JOIN categories
	ON produits.code_categorie=categories.code_categorie
    SET nom_produit = ?, produits.code_categorie = ?, quantite = ?, date_achat = ?, date_expiration = ?, magasins_produits.id_magasin = ?, magasins_produits.code_postal = ?
	WHERE produits.id_produit = ?`

    connection.query(sql, [produit,code_categorie,quantite,date_achat,date_expiration,id_magasin,code_postal,id_produit], function(erreur, resultat){
        if(erreur) {
            console.log(erreur)
            res.redirect('/dashboard?mod_produit=erreur');
        } else {
            res.redirect('/dashboard?mod_produit=success');
        }
    })
});

module.exports = router;