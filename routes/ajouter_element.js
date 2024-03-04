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

router.post('/ajouter-element', function(req, res) {
    const ajout_localite = req.body.ajout_localite;
    const ajout_code_postal = req.body.ajout_code_postal;

    if(ajout_localite && ajout_code_postal) {
        let sql = `INSERT INTO localite VALUES(?,?);`

        connection.query(sql, [ajout_code_postal,ajout_localite], function(erreur, resultat){
            res.redirect('/admin?ajout_localite=success')
        })
    } else {
        res.redirect('/admin?ajout_localite=erreur')
    }
});

export default router;