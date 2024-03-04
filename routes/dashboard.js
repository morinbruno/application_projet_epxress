import { Router } from 'express';
const router = Router();
import { createConnection } from 'mysql2';
import db_connection from '../settings/db_connection.json' with { type: "json" };
import nav from '../settings/nav_bar.json' with { type: "json" };

// Création d'une connexion à la base de données
const connection = createConnection({
	host: db_connection.host,
	user: db_connection.user,
	password: db_connection.password,
	database: db_connection.database,
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
    let sql = `SELECT * FROM users JOIN produits_acheter 
	ON users.id_user=produits_acheter.id_user JOIN produits 
	ON produits_Acheter.id_produit=produits.id_produit JOIN magasins_produits 
	ON produits.id_produit=magasins_produits.id_produit JOIN magasins 
	ON magasins_produits.id_magasin=magasins.id_magasin JOIN localite 
	ON magasins_produits.code_postal=localite.code_postal JOIN categories
	ON produits.code_categorie=categories.code_categorie
	WHERE produits_acheter.id_user = ? ORDER BY produits.nom_produit;

	SELECT * FROM users JOIN produits_acheter 
	ON users.id_user=produits_acheter.id_user JOIN produits 
	ON produits_Acheter.id_produit=produits.id_produit JOIN magasins_produits 
	ON produits.id_produit=magasins_produits.id_produit JOIN magasins 
	ON magasins_produits.id_magasin=magasins.id_magasin JOIN localite 
	ON magasins_produits.code_postal=localite.code_postal JOIN categories
	ON produits.code_categorie=categories.code_categorie
	WHERE produits_acheter.id_user = ${req.session.id_user};

	SELECT DISTINCT categories.code_categorie, categories.nom_categorie FROM users JOIN produits_acheter 
	ON users.id_user=produits_acheter.id_user JOIN produits 
	ON produits_Acheter.id_produit=produits.id_produit JOIN magasins_produits 
	ON produits.id_produit=magasins_produits.id_produit JOIN magasins 
	ON magasins_produits.id_magasin=magasins.id_magasin JOIN localite 
	ON magasins_produits.code_postal=localite.code_postal JOIN categories
	ON produits.code_categorie=categories.code_categorie
	WHERE produits_acheter.id_user = ${req.session.id_user};

	SELECT DISTINCT magasins.id_magasin, magasins.nom_magasin FROM users JOIN produits_acheter 
	ON users.id_user=produits_acheter.id_user JOIN produits 
	ON produits_Acheter.id_produit=produits.id_produit JOIN magasins_produits 
	ON produits.id_produit=magasins_produits.id_produit JOIN magasins 
	ON magasins_produits.id_magasin=magasins.id_magasin JOIN localite 
	ON magasins_produits.code_postal=localite.code_postal JOIN categories
	ON produits.code_categorie=categories.code_categorie
	WHERE produits_acheter.id_user = ${req.session.id_user};

	SELECT DISTINCT localite.code_postal, localite.nom_localite FROM users JOIN produits_acheter 
	ON users.id_user=produits_acheter.id_user JOIN produits 
	ON produits_Acheter.id_produit=produits.id_produit JOIN magasins_produits 
	ON produits.id_produit=magasins_produits.id_produit JOIN magasins 
	ON magasins_produits.id_magasin=magasins.id_magasin JOIN localite 
	ON magasins_produits.code_postal=localite.code_postal JOIN categories
	ON produits.code_categorie=categories.code_categorie
	WHERE produits_acheter.id_user = ${req.session.id_user};

	SELECT * FROM categories ORDER BY nom_categorie;

	SELECT * FROM magasins ORDER BY nom_magasin;

	SELECT * FROM localite ORDER BY nom_localite;
	`;

    connection.query(sql, [req.session.id_user], function (erreur, resultat) {
        if (req.session.loggedin) {
			let quantite_invalid = req.query.quantite_invalid;
			let produit_manquant = req.query.produit_manquant;

            res.render('pages/dashboard', {
                title: "Dashboard",
                nav,
                resultat,
                date_local,
                date_local_reverse,
                date_peremption_etat,
                list_produit: resultat[0],
				list_produit_user: resultat[1],
				list_categorie_user: resultat[2],
				list_magasin_user: resultat[3],
				list_localite_user: resultat[4],
                list_categorie: resultat[5],
                list_magasin: resultat[6],
                list_localite: resultat[7],
				produit_manquant,
				quantite_invalid,
				filtre_categorie: [],
				filtre_localite: [],
				filtre_magasin: [],
                req
            });
        } else {
            res.redirect('/');
        }
    });
});

router.post('/dashboard/filtre', function (req, res, next) {
        if (req.session.loggedin) {
			let sql_filtre_magasin = req.body.filtre_magasin ?? "''";
			let sql_filtre_localite = req.body.filtre_localite ?? "''";
			let sql_filtre_categorie = req.body.filtre_categorie ?? "''";

			let filtre_categorie = null;
			let filtre_magasin = null;
			let filtre_localite = null;

			if(typeof(req.body.filtre_categorie) != "object"){
				filtre_categorie = [];
				filtre_categorie.push(req.body.filtre_categorie);
			}
			if(typeof(req.body.filtre_magasin) != "object"){
				filtre_magasin = [];
				filtre_magasin.push(req.body.filtre_magasin);
			}
			if(typeof(req.body.filtre_localite) != "object"){
				filtre_localite = [];
				filtre_localite.push(req.body.filtre_localite);
			}
			filtre_categorie = req.body.filtre_categorie;
			filtre_magasin = req.body.filtre_magasin;
			filtre_localite = req.body.filtre_localite;
		

			if(typeof(req.body.filtre_magasin) != "object") {
				sql_filtre_magasin = `'${sql_filtre_magasin}'`
			} else {
				sql_filtre_magasin = "'"  + req.body.filtre_magasin.join("','") + "'";
			}

			if(typeof(req.body.filtre_localite) != "object") {
				sql_filtre_localite = `'${sql_filtre_localite}'`
			} else {
				sql_filtre_localite = "'"  + req.body.filtre_localite.join("','") + "'";
			}

			if(typeof(req.body.filtre_categorie) != "object") {
				sql_filtre_categorie = `'${sql_filtre_categorie}'`
			} else {
				sql_filtre_categorie = "'"  + req.body.filtre_categorie.join("','") + "'";
			}

			if (sql_filtre_categorie == "''''" && sql_filtre_localite == "''''" && sql_filtre_magasin == "''''") {
				res.redirect('/dashboard')
		    } else {
				let sql = `SELECT * FROM users JOIN produits_acheter 
				ON users.id_user=produits_acheter.id_user JOIN produits 
				ON produits_Acheter.id_produit=produits.id_produit JOIN magasins_produits 
				ON produits.id_produit=magasins_produits.id_produit JOIN magasins 
				ON magasins_produits.id_magasin=magasins.id_magasin JOIN localite 
				ON magasins_produits.code_postal=localite.code_postal JOIN categories
				ON produits.code_categorie=categories.code_categorie
				WHERE produits_acheter.id_user = ${req.session.id_user} 
				AND (magasins.nom_magasin IN (${sql_filtre_magasin})
				OR categories.nom_categorie IN (${sql_filtre_categorie})
				OR localite.nom_localite IN (${sql_filtre_localite}))
				ORDER BY produits.nom_produit;

				SELECT * FROM users JOIN produits_acheter 
				ON users.id_user=produits_acheter.id_user JOIN produits 
				ON produits_Acheter.id_produit=produits.id_produit JOIN magasins_produits 
				ON produits.id_produit=magasins_produits.id_produit JOIN magasins 
				ON magasins_produits.id_magasin=magasins.id_magasin JOIN localite 
				ON magasins_produits.code_postal=localite.code_postal JOIN categories
				ON produits.code_categorie=categories.code_categorie
				WHERE produits_acheter.id_user = ${req.session.id_user};

				SELECT DISTINCT categories.code_categorie, categories.nom_categorie FROM users JOIN produits_acheter 
				ON users.id_user=produits_acheter.id_user JOIN produits 
				ON produits_Acheter.id_produit=produits.id_produit JOIN magasins_produits 
				ON produits.id_produit=magasins_produits.id_produit JOIN magasins 
				ON magasins_produits.id_magasin=magasins.id_magasin JOIN localite 
				ON magasins_produits.code_postal=localite.code_postal JOIN categories
				ON produits.code_categorie=categories.code_categorie
				WHERE produits_acheter.id_user = ${req.session.id_user};

				SELECT DISTINCT magasins.id_magasin, magasins.nom_magasin FROM users JOIN produits_acheter 
				ON users.id_user=produits_acheter.id_user JOIN produits 
				ON produits_Acheter.id_produit=produits.id_produit JOIN magasins_produits 
				ON produits.id_produit=magasins_produits.id_produit JOIN magasins 
				ON magasins_produits.id_magasin=magasins.id_magasin JOIN localite 
				ON magasins_produits.code_postal=localite.code_postal JOIN categories
				ON produits.code_categorie=categories.code_categorie
				WHERE produits_acheter.id_user = ${req.session.id_user};

				SELECT DISTINCT localite.code_postal, localite.nom_localite FROM users JOIN produits_acheter 
				ON users.id_user=produits_acheter.id_user JOIN produits 
				ON produits_Acheter.id_produit=produits.id_produit JOIN magasins_produits 
				ON produits.id_produit=magasins_produits.id_produit JOIN magasins 
				ON magasins_produits.id_magasin=magasins.id_magasin JOIN localite 
				ON magasins_produits.code_postal=localite.code_postal JOIN categories
				ON produits.code_categorie=categories.code_categorie
				WHERE produits_acheter.id_user = ${req.session.id_user};

				SELECT * FROM categories ORDER BY nom_categorie;

				SELECT * FROM magasins ORDER BY nom_magasin;

				SELECT * FROM localite ORDER BY nom_localite;
				`;
				
				connection.query(sql, function(erreur, resultat) {
					let quantite_invalid = req.query.quantite_invalid;
					let produit_manquant = req.query.produit_manquant;

					res.render('pages/dashboard', {
						title: "Dashboard",
						nav,
						resultat,
						date_local,
						date_local_reverse,
						date_peremption_etat,
						list_produit: resultat[0],
						list_produit_user: resultat[1],
						list_categorie_user: resultat[2],
						list_magasin_user: resultat[3],
						list_localite_user: resultat[4],
						list_categorie: resultat[5],
						list_magasin: resultat[6],
						list_localite: resultat[7],
						produit_manquant,
						quantite_invalid,
						filtre_categorie: filtre_categorie ?? [],
						filtre_localite: filtre_localite ?? [],
						filtre_magasin: filtre_magasin ?? [],
						req
					});
				})
			}
        } else {
            res.redirect('/');
        }
});

export default router;