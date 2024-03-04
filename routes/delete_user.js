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

export default router;