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

router.post('/delete-user', function (req, res) {
	let id_user = req.body.id_user;
    let sql = `SELECT produits_acheter.id_produit FROM produits_acheter JOIN users ON produits_acheter.id_user=users.id_user WHERE produits_acheter.id_user= ?`

    connection.query(sql, [id_user, id_user], function(erreur, resultat) {
        let id_produit_user = [];
        let id_user = req.body.id_user;
        let sql = null;

        for (let i=0; i < resultat.length; i++) {
            id_produit_user.push(resultat[i]['id_produit']);
        }
        id_produit_user = id_produit_user.toString();

        if (id_produit_user.length == 0) {
            sql = `DELETE FROM users WHERE id_user= ?;`
        } else {
            sql = `DELETE FROM magasins_produits WHERE id_produit IN (${id_produit_user});
            DELETE FROM produits_acheter WHERE id_produit IN (${id_produit_user});
            DELETE FROM produits WHERE id_produit IN (${id_produit_user});
            DELETE FROM users WHERE id_user= ?;`
        }

        connection.query(sql, [id_user], function(erreur, resultat) {
            if(req.session.typeuser != 'Admin') {
                req.session.loggedin = false;
                res.redirect('/')
            } else {
                res.redirect('/admin')
            }
        })
    })
});

module.exports = router;