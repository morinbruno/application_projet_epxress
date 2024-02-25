// Importation des dépendances
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');

// Paramètres
const db_connect = require('./settings/db_connection.json');
const nav = require('./settings/nav_bar.json');

// Moteur de vue
app.set('view engine', 'ejs');



/**
 * 	Paramètres du serveur
 */

const port = 3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Création d'une connexion à la base de données
const connection = mysql.createConnection({
	host: db_connect.host,
	user: db_connect.user,
	password: db_connect.password,
	database: db_connect.database,
	multipleStatements: true
});



/**
 * 	Fonctions
 */

function date_local(date) {
	return date.toLocaleDateString()
}

function date_local_input(date) {
	return date.toLocaleDateString('JPN', { year: "numeric", month: '2-digit', day: '2-digit' }).replaceAll('/', '-')
}

function date_peremption_etat(date) {
	if (date_local(new Date) == date_local(date)) {
		return "Dernier jour de consommation"
	} else if (date_local(new Date) < date_local(date)) {
		return "Comestible"
	} else {
		return "Non comestible"
	}
}



/**
 * 	Page du dashboard de l'utilisateur
 */

app.get(`/dashboard`, function (req, res) {
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
				date_local_input,
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



/**
 *	Page de connexion et validation de la connexion
 */

app.get('/', function (req, res) {
	if (req.session.loggedin) {
		res.redirect('/dashboard');
	} else {
		let is_invalid = req.query.invalid;
		res.render('pages/connection/se-connecter', {
			title: "Se connecter",
			is_invalid,
			req
		});
	}

});

// Vérification de la connexion

app.post('/se-connecter', function (req, res) {
	let user_email = req.body.user_email;
	let password = req.body.password;

	if (user_email && password) {
		let sql_username = 'SELECT * FROM users JOIN typeuser ON users.typeAccount=typeuser.id_typeUser WHERE users.user = ? AND users.password = ?';
		let sql_email = 'SELECT * FROM users JOIN typeuser ON users.typeAccount=typeuser.id_typeUser WHERE users.email = ? AND users.password = ?';

		if (user_email.includes('@')) {
			sql = sql_email;
		} else {
			sql = sql_username;
		}
		connection.query(sql, [user_email, password], function (erreur, resultat) {
			if (resultat.length > 0) {
				req.session.loggedin = true;
				req.session.username = resultat[0]['user'];
				req.session.typeuser = resultat[0]['name_typeUser'];
				req.session.id_user = resultat[0]['id_user'];
				req.session.userinfo = resultat;
				res.redirect('/dashboard');
			} else {
				res.redirect('/?invalid=true');
			}
		});
	} else {
		res.redirect('/?invalid=true');
	}
});



/**
 *	Page de création d'un utilisateur
 */


app.get('/creer-compte', function (req, res) {
	let is_invalid = req.query.invalid;

	res.render('pages/connection/creer-compte', {
		title: "Créer un compte",
		is_invalid,
		req
	})
})

app.post('/creer-compte', function (req, res) {
	let pseudo = req.body.pseudo;
	let email = req.body.email;
	let password = req.body.password;

	if (pseudo && password && email) {
		let sql = "INSERT INTO users values(DEFAULT, ?, ?, ?, 2);";

		connection.query(sql, [pseudo, email, password], function (erreur, resultat) {
			let sql = 'SELECT * FROM users JOIN typeuser ON users.typeAccount=typeuser.id_typeUser WHERE user = ?';
			connection.query(sql, [pseudo], function (erreur, resultat) {
				req.session.loggedin = true;
				req.session.username = resultat[0]['user'];
				req.session.typeuser = resultat[0]['name_typeUser'];
				req.session.id_user = resultat[0]['id_user'];
				req.session.userinfo = resultat;
				res.redirect('/dashboard');
			})
		});
	} else {
		res.redirect('/creer-compte?invalid=true');
	}
})



/**
 *	Ajouter un produit à l'utilisateur
*/

app.post('/ajouter-produit', function (req, res) {
	const aliment = req.body.aliment;
	const quantite = req.body.quantite;
	const date_achat = (req.body.date_achat).toLocaleDateString();
	const date_expiration = (req.body.date_expiration).toLocaleDateString();
});

// Supprime un aliment de l'utilisateur
app.get('/supprimer-produit', function (req, res) {
	let id_produit = req.query.id;
	let id_user = req.session.id_user;

	let sql = `DELETE FROM produits_acheter WHERE id_user = ? AND id_produit = ?;
	DELETE FROM magasins_produits WHERE id_produit = ?;
	DELETE FROM produits WHERE id_produit = ?;`;

	connection.query(sql, [id_user, id_produit, id_produit, id_produit], function (erreur, resultat) {
		if (erreur) {
			console.log(erreur)
		}
		res.redirect('/dashboard');
	})
});

app.get('/profil', function (req, res) {
	if (req.session.loggedin) {
		res.render('pages/profil', {
			title: "Profil",
			nav,
			req
		});
	}
	else {
		res.redirect('/');
	}
});

app.get('/admin', function (req, res) {
	if (req.session.typeuser === "Admin") {
		res.render('pages/admin', {
			title: "Admin",
			nav,
			req
		})
	} else {
		res.redirect('/')
	}
});

app.get('/se-deconnecter', function (req, res) {
	req.session.loggedin = false;
	res.redirect('/');
});

app.get('/easter-egg', function (req, res) {
	res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUZbmV2ZXIgZ2l2ZSB1cCByaWNrIGFzdGxleQ%3D%3D');
});

// Retour d'une page erreur de type 404
app.use((req, res, next) => {
	if (req.session.loggedin) {
		res.status(404).render('erreurs/404', { title: 'Page non trouvé', nav })
	} else {
		res.redirect('/')
	}
	res.end();
});



// Lancement du serveur
app.listen(port, function () {
	console.log('Serveur en ligne !')
	console.log(`http://localhost:${port}`)
});